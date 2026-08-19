import { createFileRoute } from '@tanstack/react-router'
import { Save, Upload, UserPlus } from 'lucide-react'
import {
  Button,
  FormField,
  StoreInfoCard,
  ReceiptPreview,
  DropDown,
  AddUserModal,
} from '@retail/ui'
import { useRef, useState } from 'react'
import { useActionState } from 'react'
import type { userData } from '#/util/session'

export const Route = createFileRoute('/_app/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext() as { user: userData }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [taxEnabled, setTaxEnabled] = useState(false)
  const [priceIncludesTax, setPriceIncludesTax] = useState(false)
  const [allowNegativeStock, setAllowNegativeStock] = useState(false)
  const [skuRequired, setSkuRequired] = useState(true)
  const [barcodeEnabled, setBarcodeEnabled] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)

  const [addUserError, addUserAction, isAddingUser] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            role: formData.get('role'),
            password: formData.get('password'),
            storeId: user.storeId ?? '',
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

  return (
    <div className="p-6">
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onSubmit={addUserAction}
          isPending={isAddingUser}
          error={addUserError}
        />
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">
            Manage your Store preference and configuration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowAddUser(true)}>
            <div className="flex items-center">
              <UserPlus className="mr-2" size={16} /> <div>Add User</div>
            </div>
          </Button>
          <Button variant="primary">
            <div className="flex items-center">
              <Save className="mr-2" /> <div>Save Settings</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-4">
        <div className="col-span-3 grid gap-4">
          <div className="box-shadow p-4 w-full rounded-md h-fit">
            <h2 className="font-bold ">Bussiness Information</h2>
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
              />
              <FormField
                id="storeEmail"
                label="Business Email"
                type="email"
                placeholder="store@example.com"
              />
              <FormField
                id="storePhone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
              />

              <FormField
                id="storeAddress"
                label="Business Address"
                placeholder="123 Main Street"
              />
              <div className="col-span-3">
                <FormField
                  id="storeAddress"
                  label="Business Address"
                  placeholder="123 Main Street"
                />
              </div>
              <FormField id="storeCity" label="City" placeholder="New York" />
              <FormField
                id="storeCountry"
                label="Country"
                placeholder="United States"
              />
              <FormField id="storeZip" label="ZIP Code" placeholder="10001" />
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
                  <DropDown
                    id="currency"
                    options={[
                      'USD — US Dollar',
                      'EUR — Euro',
                      'GBP — British Pound',
                      'CAD — Canadian Dollar',
                      'AED — UAE Dirham',
                    ]}
                    placeholder="Currency"
                  />
                </div>

                {/* Tax Enabled */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-gray-700">
                    Tax Enabled
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={taxEnabled}
                    onClick={() => setTaxEnabled((v) => !v)}
                    className={`mt-1 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      taxEnabled ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        taxEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Tax Percentage */}
                <FormField
                  id="taxRate"
                  label="Tax Percentage (%)"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 8"
                  disabled={!taxEnabled}
                  className={!taxEnabled ? 'opacity-40 cursor-not-allowed' : ''}
                />

                {/* Price Includes Tax */}
                <div className="flex flex-col gap-1.5">
                  <span
                    className={`text-sm font-medium ${!taxEnabled ? 'text-gray-400' : 'text-gray-700'}`}
                  >
                    Price Includes Tax
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={priceIncludesTax}
                    disabled={!taxEnabled}
                    onClick={() => setPriceIncludesTax((v) => !v)}
                    className={`mt-1 relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      !taxEnabled
                        ? 'bg-gray-100 cursor-not-allowed opacity-40'
                        : priceIncludesTax
                          ? 'bg-red-600 cursor-pointer'
                          : 'bg-gray-200 cursor-pointer'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        priceIncludesTax ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Default Payment Method */}
                <div>
                  <label
                    htmlFor="defaultPaymentMethod"
                    className="text-sm font-medium text-gray-700 block mb-2"
                  >
                    Default Pay ment Method
                  </label>
                  <DropDown
                    id="defaultPaymentMethod"
                    options={['Cash', 'Credit Card', 'PayPal', 'Bank Transfer']}
                    placeholder="Default Payment Method"
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
                  placeholder="e.g. 10"
                />

                {(
                  [
                    {
                      label: 'Allow Negative Stock',
                      value: allowNegativeStock,
                      setter: setAllowNegativeStock,
                    },
                    {
                      label: 'SKU Required',
                      value: skuRequired,
                      setter: setSkuRequired,
                    },
                    {
                      label: 'Barcode',
                      value: barcodeEnabled,
                      setter: setBarcodeEnabled,
                    },
                  ] as const
                ).map(({ label, value, setter }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-gray-700">
                      {label}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={value}
                      onClick={() => setter((v) => !v)}
                      className={`mt-1 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                        value ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <StoreInfoCard
            logo={preview ?? undefined}
            name="My Retail Store"
            type="Retail"
            location="New York, United States"
            createdAt="Jul 24, 2026"
            plan="Free"
            version="v1.0.0"
          />
          <ReceiptPreview
            storeName="My Retail Store"
            storeAddress="123 Main Street"
            storeCity="New York, USA"
          />
        </div>
      </div>
    </div>
  )
}
