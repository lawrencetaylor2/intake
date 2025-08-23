'use server'

import z from 'zod'
import db from '@/drizzle.server'
import { organization, roles } from '@/db/schema'
import { DrizzleQueryError } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

// TODO: Move Zod Schema so that it can be imported in both the action and the page
const CreateOrganizationSchema = z.object({
  companyName: z.string().min(2, {
    message: 'Company Name must be at least 2 characters.',
  }),
  companyAddress: z.string().min(2, {
    message: 'Company Address must be at least 2 characters.',
  }),
})

export async function addOrganization(
  data: z.infer<typeof CreateOrganizationSchema>
) {
  const user = await auth()
  if (!user?.user || !user.user.id) {
    redirect('/login')
  }
  // Validate with Zod
  const validationResult = CreateOrganizationSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation failed',
      error: z.treeifyError(validationResult.error).errors,
    }
  }
  // Create the organization
  try {
    const org = await db
      .insert(organization)
      .values({ name: data.companyName, owner_user_id: user.user.id })
      .returning()
    // Update the user's roles to include the new organization
    await db.insert(roles).values({
      orgId: org[0].id,
      userId: user.user.id,
      role: 'ADMIN',
    })
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      const cause = error.cause
      // Check cause for specific database error codes (e.g., '23505' for unique constraint in Postgres)
      if (
        cause &&
        typeof cause === 'object' &&
        'code' in cause &&
        cause.code === '23505'
      ) {
        console.error('Unique constraint violation:', error.message)
      } else {
        console.error('Database query error:', error)
      }
    }
    console.error('Error creating organization:', error)
  }
  /*It's common to revalidate a path before redirecting the user to ensure they 
     see the most up-to-date data on the destination page. 
     This process involves calling revalidatePath and then redirect.*/
  revalidatePath('/')
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
