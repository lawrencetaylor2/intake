'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { signOut } from 'next-auth/react'

import { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { addOrganization } from '../actions/organization'

export default function AddCompanyPage() {
  const baseSchema = z.object({
    companyName: z.string().min(2, {
      message: 'Company Name must be at least 2 characters.',
    }),
    companyAddress: z.string().min(2, {
      message: 'Company Address must be at least 2 characters.',
    }),
    //  companyAddress: z.string().optional(),
  })

  const totalSteps = 2
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string[] | null>(null)

  // Types
  type FormValues = z.infer<typeof baseSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      companyName: '',
      companyAddress: '',
    },
    mode: 'onSubmit',
  })

  const handleNext = async (event: FormEvent) => {
    console.log('Current Step:', step)
    //  console.log(event)
    event.preventDefault()
    let valid = false
    if (step === 1) {
      valid = await form.trigger('companyName') // validate only these fields
    } else {
      valid = await form.trigger() // validate all fields
    }
    if (step < 2) {
      // Move to the next step
      if (valid) setStep(step + 1)
    }
  }

  /*If not using react-hook-form, update formFata object by doing the following:
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
    */
  const onSubmit = async (data: z.output<typeof baseSchema>) => {
    debugger
    setIsSubmitting(true)

    const result = await addOrganization(data)
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      // setSuccess(result.success)
      // Handle success (e.g., redirect to dashboard)
    }
    setIsSubmitting(false)
    console.log(data)
  }
  const handleFormKeyPress = (e: React.KeyboardEvent) => {
    const targetElement = e.target as HTMLElement
    if (e.key === 'Enter' && targetElement.tagName !== 'TEXTAREA') {
      // Exclude textareas if needed
      e.preventDefault() // Prevent form submission
      handleNext(e) // Call your next step function
    }
  }
  //  const onSubmit = handleSubmit((data) => console.log(data))

  /*
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Submitted:', formData)
    // Here you’d call fetch("/api/endpoint", { method:"POST", body: JSON.stringify(formData) })
  }*/
  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-0">
        <Image
          src="/Intake_Ehr_logo-400px.png"
          alt="Intake EHR"
          width={200}
          height={133}
        ></Image>

        <h1 className="text-4xl font-bold mb-4">Set up organization</h1>
        <p className="text-lg text-center">
          It looks like you don&apos;t have a company associated with your
          account yet. Please add your company to get started.
        </p>
        <div className="flex gap-2 mt-4">
          <div className="flex items-center space-x-1">
            {/* TODO: Step indicators */}
            <div className="h-1 w-6 rounded bg-gray-400"></div>
            <div className="h-1 w-6 rounded bg-gray-200"></div>
            <div className="h-1 w-6 rounded bg-gray-200"></div>
            <div className="h-1 w-6 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="flex w-full justify-center mt-6">
          <Card className="border border-gray-100 bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-4 w-full max-w-sm md:max-w-lg">
            <CardHeader>
              <CardTitle>Add Company</CardTitle>
              <CardDescription>
                Please enter your company details below to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                {/* Form component magic here, This is a 
                    FormProvider object that is passing in all the props from the form object */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  {step >= 1 && (
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input
                                onKeyDown={handleFormKeyPress} // Add the event handler
                                placeholder="Your Company Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {step >= 2 && (
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="companyAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Address</FormLabel>
                            <FormControl>
                              <Input
                                onKeyDown={handleFormKeyPress} // Add the event handler
                                placeholder="1234 Main St, City, State, ZIP"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {step < 2 ? (
                    <Button
                      type="button"
                      onClick={(event) => handleNext(event)}
                      className="bg-indigo-200 mt-6"
                    >
                      Next({step}/2)
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-indigo-200 mt-6">
                      {isSubmitting ? 'Submitting...' : 'Get set up'}
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <a
          className="mt-6 text-gray-400 font-bold hover:underline"
          onClick={() => signOut()}
        >
          Logout
        </a>
      </div>
    </>
  )
}
