import SelectionVariant from "sap/fe/navigation/SelectionVariant";
import MultiInput from "sap/m/MultiInput";
import Event from "sap/ui/base/Event";
import SmartFilterBar from "sap/ui/comp/smartfilterbar/SmartFilterBar";
import DateFormat from "sap/ui/core/format/DateFormat";
import View from "sap/ui/core/mvc/View";

export default {

    onBeforeRendering(oEvent: Event) {
       
    },



    onCustomParams(sCustomParams) {
        
        if (sCustomParams === "ThisMonthHRKPI") {
            return this.paramThisMonthHRKPI.bind(this);
        } else if (sCustomParams === "LastMonthHRKPI") {
            return this.paramLastMonthHRKPI.bind(this);
        } else if (sCustomParams === "ThisMonthAVGKPI") {
            return this.paramThisMonthAVGKPI.bind(this);
        } else if (sCustomParams === "LastMonthAVGKPI") {
            return this.paramLastMonthAVGKPI.bind(this);
        } else if (sCustomParams === "DateRangeHrKPI") {
            return this.paramDateRangeHrKPI.bind(this);
        } else if (sCustomParams === "DateRangeAvgKPI") {
            return this.paramDateRangeAvgKPI.bind(this);
        }
    },

    getBasicParams(oNavigateParams, oSelectionVariantParams: SelectionVariant): object[] {

        const basicParams = ['Werks', 'Auart', 'Ingpr']
        const params = []

        basicParams.forEach(b => {
            const selParam = oSelectionVariantParams.getSelectOption(b)

            if (oNavigateParams[b]) {
                params.push({
                    path: b,
                    operator: 'EQ',
                    value1: oNavigateParams[b],
                    value2: '',
                    sign: 'I'
                })

            } else {
                if (selParam) {
                    selParam.forEach(p => {
                        params.push({
                            path: b,
                            operator: p.Option,
                            value1: p.Low,
                            value2: '',
                            sign: p.Sign
                        })
                    })
                } else {
                    params.push({
                        path: b,
                        operator: 'EQ',
                        value1: '',
                        value2: '',
                        sign: 'I'
                    })
                }
            }
        })



        return params
    },

    getBasicParams2(oNavigateParams, oSelectionVariantParams: SelectionVariant): object[] {

        const basicParams = ['Werks', 'Auart', 'Ingpr']
        const params = []

        basicParams.forEach(b => {
            const selParam = oSelectionVariantParams.getSelectOption(b)
            

            if (oNavigateParams[b]) {
                params.push({
                    path: b,
                    operator: 'EQ',
                    value1: oNavigateParams[b],
                    value2: '',
                    sign: 'I'
                })

            } else {
                if (selParam) {
                    selParam.forEach(p => {
                        params.push({
                            path: b,
                            operator: p.Option,
                            value1: p.Low,
                            value2: p.High,
                            sign: p.Sign
                        })
                    })
                } else {
                    params.push({
                        path: b,
                        operator: 'EQ',
                        value1: '',
                        value2: '',
                        sign: 'I'
                    })
                }
            }
        })

        return params
    },

     paramThisMonthHRKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {
debugger
        const params  = this.getBasicParams2(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))

        const DateFr = new Date(yearfr, monthfr, dayfr)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto, dayto)
        const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })
        params.push({
             path: 'DateFr',
             operator: 'EQ',
             value1: formatter.format(DateFr),
             value2: '',
             sign: 'I'
          })

          params.push({
              path: 'DateTo',
              operator: 'EQ',
              value1: formatter.format(DateTo),
              value2: '',
              sign: 'I'
          })

         return params
     },

     paramLastMonthHRKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

         const params = this.getBasicParams2(oNavigateParams, oSelectionVariantParams)
         const SelDate = oSelectionVariantParams.getParameter('OrderCrtrd')

         const year = parseInt(SelDate.substring(0, 4))
         const month = parseInt(SelDate.substring(5, 7))
         const day = parseInt(SelDate.substring(8, 10))
 
         const DateFr = new Date(year, month, day)
         const DateTo = new Date(year, month, day)
         const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })
 
         params.push({
             path: 'DateFr',
             operator: 'EQ',
             value1: formatter.format(DateFr),
             value2: '',
             sign: 'I'
         })
 
         params.push({
             path: 'DateTo',
             operator: 'EQ',
             value1: formatter.format(DateTo),
             value2: '',
             sign: 'I'
         })
 
         return params
     },

     paramThisMonthAVGKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

         const params = this.getBasicParams2(oNavigateParams, oSelectionVariantParams)
         const SelDate = oSelectionVariantParams.getParameter('OrderCrtrd')

         const year = parseInt(SelDate.substring(0, 4))
         const month = parseInt(SelDate.substring(5, 7))
         const day = parseInt(SelDate.substring(8, 10))
 
         const DateFr = new Date(year, month, day)
         const DateTo = new Date(year, month, day)
         const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })
 
         params.push({
             path: 'DateFr',
             operator: 'EQ',
             value1: formatter.format(DateFr),
             value2: '',
             sign: 'I'
         })
 
         params.push({
             path: 'DateTo',
             operator: 'EQ',
             value1: formatter.format(DateTo),
             value2: '',
             sign: 'I'
         })
 
         return params
     },
     paramLastMonthAVGKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

         const params = this.getBasicParams2(oNavigateParams, oSelectionVariantParams)
         const SelDate = oSelectionVariantParams.getParameter('OrderCrtrd')

         const year = parseInt(SelDate.substring(0, 4))
         const month = parseInt(SelDate.substring(5, 7))
         const day = parseInt(SelDate.substring(8, 10))
 
         const DateFr = new Date(year, month, day)
         const DateTo = new Date(year, month, day)
         const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })
 
         params.push({
             path: 'DateFr',
             operator: 'EQ',
             value1: formatter.format(DateFr),
             value2: '',
             sign: 'I'
         })
 
         params.push({
             path: 'DateTo',
             operator: 'EQ',
             value1: formatter.format(DateTo),
             value2: '',
             sign: 'I'
         })
 
         return params
     },
     paramDateRangeAvgKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

        const params = this.getBasicParams2(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getParameter('OrderCrtrd')

        const year = parseInt(SelDate.substring(0, 4))
        const month = parseInt(SelDate.substring(5, 7))
        const day = parseInt(SelDate.substring(8, 10))

        const DateFr = new Date(year, month, day)
        const DateTo = new Date(year, month, day)
        const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })

        params.push({
            path: 'DateFr',
            operator: 'EQ',
            value1: formatter.format(DateFr),
            value2: '',
            sign: 'I'
        })

        params.push({
            path: 'DateTo',
            operator: 'EQ',
            value1: formatter.format(DateTo),
            value2: '',
            sign: 'I'
        })

        return params
    },
    paramDateRangeHrKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {
        
        const params = this.getBasicParams2(oNavigateParams, oSelectionVariantParams)
        const SelDate = params.path["OrderCrtrd.value1"]
        debugger
        const year = parseInt(SelDate.substring(0, 4))
        const month = parseInt(SelDate.substring(5, 7))
        const day = parseInt(SelDate.substring(8, 10))

        const DateFr = new Date(year, month, day)
        const DateTo = new Date(year, month, day)
        const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })

        params.push({
            path: 'DateFr',
            operator: 'EQ',
            value1: formatter.format(DateFr),
            value2: '',
            sign: 'I'
        })

        params.push({
            path: 'DateTo',
            operator: 'EQ',
            value1: formatter.format(DateTo),
            value2: '',
            sign: 'I'
        })

        return params
    },
}