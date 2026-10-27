import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Upload, UserPlus } from 'lucide-react'
import {
  Button,
  FormField,
  StoreInfoCard,
  ReceiptPreview,
  DropDown,
  AddUserModal,
  Toggle,
} from '@retail/ui'
import { useActionState, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { settingsQueryOptions } from '#/feature/settings/settings.queries'
import { useUpdateSettings } from '#/feature/settings/settings.mutation'
import { settingsFormSchema } from '#/feature/settings/settings.schema'
import type { SettingsFormValues } from '#/feature/settings/settings.schema'
import { toFormValues, toPayload } from '#/feature/settings/settings.mapper'

export const Route = createFileRoute('/_app/settings/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      settingsQueryOptions(context.user.storeId),
    )
  },
  component: RouteComponent,
})

const CURRENCY_OPTIONS = [
  { label: 'USD — US Dollar', value: 'USD' },
  { label: 'EUR — Euro', value: 'EUR' },
  { label: 'GBP — British Pound', value: 'GBP' },
  { label: 'CAD — Canadian Dollar', value: 'CAD' },
  { label: 'AED — UAE Dirham', value: 'AED' },
]

const PAYMENT_METHOD_OPTIONS = [
  'Cash',
  'Credit Card',
  'PayPal',
  'Bank Transfer',
]

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const { data } = useSuspenseQuery(settingsQueryOptions(user.storeId))
  const { store } = data

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: toFormValues(data),
  })

  const values = watch()

  const { mutateAsync: updateSettings, isPending: isSaving } =
    useUpdateSettings()

  const [addUserError, addUserAction, isAddingUser] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        const res = await fetch('http://127.0.0.1:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            role: formData.get('role'),
            password: formData.get('password'),
            storeId: user.storeId,
            isActive: true,
          }),
        })
        const json = await res.json()
        if (!res.ok) return json.message ?? 'Failed to add user'
        setShowAddUser(false)
        return null
      } catch (e) {
        console.log(e)
        return 'Something went wrong'
      }
    },
    null,
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const onSubmit = async (formValues: SettingsFormValues) => {
    try {
      const saved = await updateSettings({
        storeId: user.storeId,
        payload: toPayload(formValues, store.logoUrl),
      })
      // re-baseline the form on what the server stored
      reset(toFormValues(saved))
      toast.success('Settings saved successfully')
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      toast.error(`Failed to save settings: ${message}`)
    }
  }

  return (
    <div className="p-6">
      <ToastContainer />
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onSubmit={addUserAction}
          isPending={isAddingUser}
          error={addUserError}
        />
      )}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, () =>
          toast.error('Please fix the highlighted fields'),
        )}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-500">
              Manage your Store preference and configuration
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddUser(true)}
            >
              <div className="flex items-center">
                <UserPlus className="mr-2" size={16} /> <div>Add User</div>
              </div>
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              <div className="flex items-center">
                <Save className="mr-2" />{' '}
                <div>{isSaving ? 'Saving...' : 'Save Settings'}</div>
              </div>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-4">
          <div className="col-span-3 grid gap-4">
            <div className="box-shadow p-4 w-full rounded-md h-fit">
              <h2 className="font-bold ">Business Information</h2>
              <p className="text-gray-500 text-sm">
                Update your store details and contact here.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4 ">
                <div className="flex flex-col gap-1.5 shrink-0 row-span-2 w-full">
                  <label className="text-sm font-medium text-gray-700">
                    Store Logo
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="storeLogo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-32 w-32 mx-auto rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors flex flex-col justify-center items-center gap-1 overflow-hidden"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Store logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <Upload size={18} className="text-gray-400" />
                        <span className="text-[10px] text-gray-400 leading-tight text-center px-1">
                          Upload
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <FormField
                  id="storeName"
                  label="Store Name"
                  placeholder="e.g. My Retail Store"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <FormField
                  id="storeEmail"
                  label="Business Email"
                  type="email"
                  placeholder="store@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <FormField
                  id="storePhone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <div className="col-span-2">
                  <FormField
                    id="storeAddress"
                    label="Business Address"
                    placeholder="123 Main Street"
                    error={errors.address?.message}
                    {...register('address')}
                  />
                </div>
                <FormField
                  id="storeCity"
                  label="City"
                  placeholder="New York"
                  error={errors.city?.message}
                  {...register('city')}
                />
                <FormField
                  id="storeCountry"
                  label="Country"
                  placeholder="United States"
                  error={errors.country?.message}
                  {...register('country')}
                />
                <FormField
                  id="storeZip"
                  label="ZIP Code"
                  placeholder="10001"
                  error={errors.zipCode?.message}
                  {...register('zipCode')}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="box-shadow p-4 w-full rounded-md">
                <h2 className="font-bold">Sales Settings</h2>
                <p className="text-gray-500 text-sm">
                  Configure currency, tax rules and default payment method.
                </p>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="currency"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Currency
                    </label>
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <DropDown
                          id="currency"
                          options={CURRENCY_OPTIONS}
                          placeholder="Currency"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="taxEnabled"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        label="Tax Enabled"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  {/* readOnly, not disabled: RHF drops disabled inputs from the submitted values */}
                  <FormField
                    id="taxRate"
                    label="Tax Percentage (%)"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g. 8"
                    readOnly={!values.taxEnabled}
                    tabIndex={values.taxEnabled ? undefined : -1}
                    className={
                      !values.taxEnabled ? 'opacity-40 cursor-not-allowed' : ''
                    }
                    error={errors.taxPercentage?.message}
                    {...register('taxPercentage')}
                  />

                  <Controller
                    name="priceIncludesTax"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        label="Price Includes Tax"
                        checked={field.value}
                        disabled={!values.taxEnabled}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <div>
                    <label
                      htmlFor="defaultPaymentMethod"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Default Payment Method
                    </label>
                    <Controller
                      name="defaultPaymentMethod"
                      control={control}
                      render={({ field }) => (
                        <DropDown
                          id="defaultPaymentMethod"
                          options={PAYMENT_METHOD_OPTIONS}
                          placeholder="Default Payment Method"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      id="receiptFooterMessage"
                      label="Receipt Footer Message"
                      placeholder="e.g. Please come again"
                      {...register('receiptFooterMessage')}
                    />
                  </div>
                </div>
              </div>
              <div className="box-shadow p-4 w-full rounded-md">
                <h2 className="font-bold">Inventory Settings</h2>
                <p className="text-gray-500 text-sm">
                  Configure stock tracking, SKU and barcode requirements.
                </p>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  <FormField
                    id="lowStockWarning"
                    label="Low Stock Warning"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 10"
                    error={errors.lowStockWarning?.message}
                    {...register('lowStockWarning')}
                  />

                  <Controller
                    name="allowNegativeStock"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        label="Allow Negative Stock"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="skuRequired"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        label="SKU Required"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="barcodeEnabled"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        label="Barcode"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 h-fit">
            <StoreInfoCard
              logo={preview ?? undefined}
              name={values.name || store.name}
              type={store.type}
              location={`${values.city}, ${values.country}`}
              createdAt={new Date(store.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              plan={store.plan}
              version={store.version}
            />
            <ReceiptPreview
              storeName={values.name}
              storeAddress={values.address}
              storeCity={`${values.city}, ${values.country}`}
              taxRate={
                values.taxEnabled ? Number(values.taxPercentage) || 0 : 0
              }
              currency={values.currency}
              paymentMethod={values.defaultPaymentMethod}
              footerMessage={values.receiptFooterMessage}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
