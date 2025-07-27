// src/ui/sales/store/useSaleGenerateStore.ts
import { defineStore } from 'pinia'
import type { SaleGenerate } from '@/domain/model/sales/generate/model/SaleGenerate'
import type { ProductSale } from '@/domain/model/sales/generate/model/product/ProductSale'
import { EPayTypeSale, EEstateSale } from '@/domain/model/constants/Constants'

export const useSaleGenerateStore = defineStore('saleGenerate', {
  state: (): { currentSale: SaleGenerate } => ({
    currentSale: {
      doc_client: '',
      nam_client: '',
      sur_client: '',
      cod_invoice: '',
      sale_type: EPayTypeSale.CONTADO, // o el valor por defecto que tengas
      pay_type: '',
      pay_date: new Date(),
      box: '',
      sales: [],
      subtotal: 0,
      discount: 0,
      taxes: 0,
      total: 0,
      state: EEstateSale.APROBADO, // o el valor por defecto que uses
      created_at: new Date(),
      updated_at: new Date(),
    },
  }),

  actions: {
    addProduct(product: ProductSale) {
      this.currentSale.sales.push(product)
      this.calculateTotals()
    },

    updateProduct(index: number, updatedProduct: ProductSale) {
      if (this.currentSale.sales[index]) {
        this.currentSale.sales[index] = updatedProduct
        this.calculateTotals()
      }
    },

    removeProduct(index: number) {
      this.currentSale.sales.splice(index, 1)
      this.calculateTotals()
    },

    setClientData(doc: string, name: string, surname: string) {
      this.currentSale.doc_client = doc
      this.currentSale.nam_client = name
      this.currentSale.sur_client = surname
    },

    clearSale() {
      this.$reset()
    },

    calculateTotals() {
      const subtotal = this.currentSale.sales.reduce((sum, p) => sum + (p.unit_price * p.quantity), 0)
      const discount = this.currentSale.discount || 0
      const taxes = subtotal * 0.19 // Ejemplo: IVA 19%
      const total = subtotal - discount + taxes

      this.currentSale.subtotal = subtotal
      this.currentSale.taxes = taxes
      this.currentSale.total = total
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'sale-generate',
        storage: localStorage,
        paths: ['currentSale'],
      },
    ],
  } as any,
})
