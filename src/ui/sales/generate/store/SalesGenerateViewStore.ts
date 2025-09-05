import { defineStore } from 'pinia'
import type { SaleGenerate } from '@/domain/model/sales/generate/model/SaleGenerate'
import { ProductSale } from '@/domain/model/sales/generate/model/product/ProductSale'
import { EPayTypeSale, EEstateSale } from '@/domain/model/constants/Constants'

export const useSaleGenerateStore = defineStore('saleGenerate', {
  state: (): { currentSale: SaleGenerate } => ({
    currentSale: {
      doc_client: '',
      nam_client: '',
      sur_client: '',
      cod_invoice: '',
      sale_type: EPayTypeSale.CONTADO,
      pay_type: '',
      pay_date: new Date(),
      box: '',
      sales: [] as ProductSale[],
      subtotal: 0,
      discount: 0,
      taxes: 0,
      total: 0,
      state: EEstateSale.APROBADO,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }),
  actions: {
    addProduct(product: ProductSale) {
      if (!product.bar_code || product.bar_code === '') {
        this.currentSale.sales.push(product);
      } else {
        const existingProductIndex = this.currentSale.sales.findIndex(p => 
          p.bar_code === product.bar_code
        );
        
        if (existingProductIndex !== -1) {
          this.currentSale.sales[existingProductIndex].amount++;
          this.currentSale.sales[existingProductIndex].subtotal = 
            this.currentSale.sales[existingProductIndex].amount * 
            this.currentSale.sales[existingProductIndex].sale_price;
        } else {
          this.currentSale.sales.push(product);
        }
      }
    },

    changeAmountProduct(identifier: string, newAmount: number) {
      const productIndex = this.currentSale.sales.findIndex(p => 
        p.bar_code === identifier || p.name === identifier
      );
      
      if (productIndex !== -1) {
        this.currentSale.sales[productIndex].amount = newAmount;
        this.currentSale.sales[productIndex].subtotal = 
          this.currentSale.sales[productIndex].amount * 
          this.currentSale.sales[productIndex].sale_price;
      }
    },

    updateProduct(index: number, updatedProduct: ProductSale) {
      if (this.currentSale.sales[index]) {
        this.currentSale.sales[index] = updatedProduct
      }
    },

    removeProduct(index: number) {
      if (index >= 0 && index < this.currentSale.sales.length) {
        this.currentSale.sales.splice(index, 1)
      }
    },

    setClientData(doc: string, name: string, surname: string) {
      this.currentSale.doc_client = doc
      this.currentSale.nam_client = name
      this.currentSale.sur_client = surname
    },

    clearSale() {
      this.$reset()
    },

  },
  getters: {
    totalPrice: (state) => {
      return state.currentSale.sales.reduce((acc, p) => acc + p.subtotal, 0)
    },
    salesProducts: (state) => {
      return state.currentSale.sales
    }
  }
  /*
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'sale-generate',
        storage: localStorage,
        paths: ['currentSale'],
      },
    ],
  } as any,*/
})
