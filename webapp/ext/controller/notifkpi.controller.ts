import SelectionVariant from "sap/fe/navigation/SelectionVariant";
import MultiInput from "sap/m/MultiInput";
import Event from "sap/ui/base/Event";
import SmartFilterBar from "sap/ui/comp/smartfilterbar/SmartFilterBar";
import DateFormat from "sap/ui/core/format/DateFormat";
import View from "sap/ui/core/mvc/View";

export default {

    onBeforeRendering(oEvent: Event) {
        // const filterBar = (oEvent.getSource() as View).byId('ovpGlobalFilter') as SmartFilterBar
        // filterBar.attachInitialized((e) => {
        //     filterBar.setFilterData({
        //         'OrderCrtrd': new Date(),
        //         // 'Plant': { items: [{ key: '2120' }] },
        //         // 'MaintenanceOrderType': { items: [{ key: 'BM01' }] },
        //     }, true)
        // })
        // this.modifyStartupExtension()
    },

//     modifyStartupExtension: function(oCustomSelectionVariant) {
// debugger
// 		var iYear = new Date().getFullYear(),
// 		iMonth = new Date().getMonth() + 1,
// 		iDate = new Date().getDate();
// 		oCustomSelectionVariant.addSelectOption("OrderCrtrd", "I", "LE", iYear + "-" + iMonth + "-" + 1, iYear + "-" + iMonth + "-" + iDate);
// 	debugger
//     },
// modifyStartupExtension: function(oStartupObject) {
    // debugger
	//var oSelectionVariant = oStartupObject.sCustomParams;
	//if (oSelectionVariant) {
	//	oSelectionVariant.removeSelectOption("OrderCrtrd");
		// var iYear = new Date().getFullYear(),
		// iMonth = new Date().getMonth() + 1,
		// iDate = new Date().getDate();
		//oSelectionVariant.addSelectOption("OrderCrtrd", "I", "BT", iYear + "-" + iMonth + "-" + 1, iYear + "-" + iMonth + "-" + iDate);
	//}
// },
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

    getbasicparams(oNavigateParams, oSelectionVariantParams: SelectionVariant): object[] {

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

        const params  = this.getbasicparams(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))
        debugger
        const DateFr = new Date(yearfr, monthfr - 1, dayfr)
        //const tzOffsetNumber = DateFrPre.getTimezoneOffset();
       // const DateFr = new Date(yearfr, monthfr - 1, dayfr,)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto - 1, dayto)
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

        const params  = this.getbasicparams(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))

        const DateFr = new Date(yearfr, monthfr -1, dayfr)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto - 1, dayto)
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

        const params  = this.getbasicparams(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))

        const DateFr = new Date(yearfr, monthfr - 1, dayfr)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto - 1, dayto)
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

        const params  = this.getbasicparams(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))

        const DateFr = new Date(yearfr, monthfr - 1, dayfr)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto - 1, dayto)
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
        const params  = this.getbasicparams(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))

        const DateFr = new Date(yearfr, monthfr - 1, dayfr)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto - 1, dayto)
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
        
        const params  = this.getbasicparams(oNavigateParams, oSelectionVariantParams)
        const SelDate = oSelectionVariantParams.getSelectOption("OrderCrtrd")
        var SelDate1 = SelDate[0].Low;

        const yearfr    = parseInt(SelDate1.substring(0, 4))
        const monthfr   = parseInt(SelDate1.substring(4, 6))
        const dayfr     = parseInt(SelDate1.substring(6, 8))

        const DateFr = new Date(yearfr, monthfr - 1, dayfr)

        var SelDate2 = SelDate[0].High;

        const yearto    = parseInt(SelDate2.substring(0, 4))
        const monthto   = parseInt(SelDate2.substring(4, 6))
        const dayto     = parseInt(SelDate2.substring(6, 8))

        const DateTo = new Date(yearto, monthto - 1, dayto)
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
    }
}