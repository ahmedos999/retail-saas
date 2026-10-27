import { z } from 'zod'

const requiredText = (name: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${name} is required`)
    .max(max, `Max ${max} characters`)

// numeric inputs are kept as strings in the form and converted on submit
export const settingsFormSchema = z
  .object({
    name: requiredText('Store name', 255),
    email: requiredText('Email', 255).pipe(
      z.email('Enter a valid email address'),
    ),
    phone: requiredText('Phone number', 50),
    address: requiredText('Address', 255),
    city: requiredText('City', 100),
    country: requiredText('Country', 100),
    zipCode: z.string().trim().max(20, 'Max 20 characters'),
    currency: z.string().min(1, 'Currency is required'),
    taxEnabled: z.boolean(),
    taxPercentage: z.string(),
    priceIncludesTax: z.boolean(),
    defaultPaymentMethod: z.string().min(1, 'Payment method is required'),
    lowStockWarning: z
      .string()
      .min(1, 'Low stock warning is required')
      .refine(
        (value) => Number.isInteger(Number(value)) && Number(value) >= 0,
        'Must be a whole number of 0 or more',
      ),
    allowNegativeStock: z.boolean(),
    skuRequired: z.boolean(),
    barcodeEnabled: z.boolean(),
    receiptFooterMessage: z.string(),
  })
  .superRefine((values, ctx) => {
    if (!values.taxEnabled) return
    const rate = Number(values.taxPercentage)
    if (
      values.taxPercentage === '' ||
      Number.isNaN(rate) ||
      rate < 0 ||
      rate > 100
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['taxPercentage'],
        message: 'Must be between 0 and 100',
      })
    }
  })

export type SettingsFormValues = z.infer<typeof settingsFormSchema>
