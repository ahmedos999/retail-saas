export type Store = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  zipCode: string | null
  logoUrl: string | null
  type: string
  plan: string
  version: string
  createdAt: string
  updatedAt: string
}

export type StoreSettings = {
  currency: string
  taxEnabled: boolean
  // decimal column, returned as a string e.g. "12.50"
  taxPercentage: string
  priceIncludesTax: boolean
  defaultPaymentMethod: string
  lowStockWarning: number
  allowNegativeStock: boolean
  skuRequired: boolean
  barcodeEnabled: boolean
  receiptFooterMessage: string | null
  updatedAt: string
}

export type SettingsResponse = {
  store: Store
  settings: StoreSettings
}

export type UpdateSettingsPayload = {
  store: Pick<
    Store,
    'name' | 'email' | 'phone' | 'address' | 'city' | 'country'
  > &
    Partial<Pick<Store, 'zipCode' | 'logoUrl'>>
  settings: Omit<StoreSettings, 'updatedAt'>
}
