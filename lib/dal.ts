import db from '@/drizzle.server'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { eq, and } from 'drizzle-orm'
import { DrizzleQueryError } from 'drizzle-orm'
import { organization, user_column_configs } from '@/db/schema'
import { Column, ServiceRequestRecord } from '@/components/tableConfig'
export const getuserColumnConfig = async () => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }
  try {
    const userColumnConfig = await db.query.user_column_configs.findMany({
      where: eq(user_column_configs.userId, session.user.id),
    })
    return userColumnConfig
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
    console.error('Error querying userColumnConfig:', error)
    throw new Error(
      'Unable to perform query at this time.  Please try again later'
    )
  }
}

export const getOneUserColumnConfig = async (tableID: string) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }
  try {
    const userColumnConfig = await db.query.user_column_configs.findFirst({
      where: and(
        eq(user_column_configs.userId, session.user.id),
        eq(user_column_configs.tableId, tableID)
      ),
    })
    return userColumnConfig
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
    console.error('Error querying userColumnConfig:', error)
    throw new Error(
      'Unable to perform query at this time.  Please try again later'
    )
  }
}

export const getOrganization = async () => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }
  try {
    const userColumnConfig = await db.query.organization.findFirst({
      where: eq(organization.id, session.user.roles[0].orgId),
    })
    return userColumnConfig
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
    console.error('Error querying userColumnConfig:', error)
    throw new Error(
      'Unable to perform query at this time.  Please try again later'
    )
  }
}
export const saveTableConfiguration = async (
  tableId: string,
  tableConfiguration: ServiceRequestRecord[]
) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  try {
    await db.insert(user_column_configs).values({
      userId: session.user.id,
      tableId: tableId,
      config: tableConfiguration,
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
    console.error('Error Saving table configuration', error)
    throw new Error(
      'Unable to perform query at this time.  Please try again later'
    )
  }
}
