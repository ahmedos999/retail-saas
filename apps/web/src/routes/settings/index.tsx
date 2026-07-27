import { createFileRoute } from '@tanstack/react-router'
import { Save, Upload } from 'lucide-react'
import { Button, FormField, StoreInfoCard, ReceiptPreview } from '@retail/ui'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">
            Manage your Store preference and configuration
          </p>
        </div>
        <Button variant="primary">
          <div className="flex items-center">
            <Save className="mr-2" /> <div>Save Settings</div>
          </div>
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-4">
        <div className="col-span-3 grid gap-4">
          <div className="box-shadow p-4 w-full rounded-md">
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
            <div className="box-shadow p-4 w-full rounded-md"></div>
            <div className="box-shadow p-4 w-full rounded-md"></div>
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
