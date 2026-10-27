import type { SettingsFormValues } from './settings.schema'
import type { SettingsResponse, UpdateSettingsPayload } from './settings.types'

export function toFormValues({
  store,
  settings,
}: SettingsResponse): SettingsFormValues {
  return {
    name: store.name,
    email: store.email,
    phone: store.phone,
    address: store.address,
    city: store.city,
    country: store.country,
    zipCode: store.zipCode ?? '',
    currency: settings.currency,
    taxEnabled: settings.taxEnabled,
    taxPercentage: settings.taxPercentage,
    priceIncludesTax: settings.priceIncludesTax,
    defaultPaymentMethod: settings.defaultPaymentMethod,
    lowStockWarning: String(settings.lowStockWarning),
    allowNegativeStock: settings.allowNegativeStock,
    skuRequired: settings.skuRequired,
    barcodeEnabled: settings.barcodeEnabled,
    receiptFooterMessage: settings.receiptFooterMessage ?? '',
  }
}

export function toPayload(
  values: SettingsFormValues,
  logoUrl: string | null,
): UpdateSettingsPayload {
  return {
    store: {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      country: values.country,
      zipCode: values.zipCode || null,
      // logo upload isn't implemented yet, keep the stored value
      logoUrl,
    },
    settings: {
      currency: values.currency,
      taxEnabled: values.taxEnabled,
      taxPercentage: Number(values.taxPercentage || 0).toFixed(2),
      priceIncludesTax: values.priceIncludesTax,
      defaultPaymentMethod: values.defaultPaymentMethod,
      lowStockWarning: Number(values.lowStockWarning),
      allowNegativeStock: values.allowNegativeStock,
      skuRequired: values.skuRequired,
      barcodeEnabled: values.barcodeEnabled,
      receiptFooterMessage: values.receiptFooterMessage || null,
    },
  }
}
