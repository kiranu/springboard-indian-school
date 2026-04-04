import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import api from '../lib/api'

const enquirySchema = z.object({
  type: z.enum(['admission', 'callback', 'contact', 'visit']),
  parent_name: z.string().min(2, 'Parent name must be at least 2 characters'),
  child_name: z.string().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().optional(),
  grade_applying: z.string().optional(),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
})

export type EnquiryFormInputs = z.infer<typeof enquirySchema>

export function useEnquiryForm() {
  const form = useForm<EnquiryFormInputs>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      type: 'admission',
      parent_name: '',
      child_name: '',
      phone: '',
      email: '',
      grade_applying: '',
      message: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: EnquiryFormInputs) => {
      const response = await api.post('/enquiries/', data)
      return response.data
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data)
      form.reset()
    } catch {
      // handled via mutation.error
    }
  })

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}
