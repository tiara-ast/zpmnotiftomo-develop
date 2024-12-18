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
        debugger
        if (sCustomParams === "ThisMonthHRKPI") {
            return this.paramthismonthhrkpi.bind(this);
        } else if (sCustomParams === "LastMonthHRKPI") {
            return this.paramlastmonthhrkpi.bind(this);
        } else if (sCustomParams === "ThisMonthAVGKPI") {
            return this.paramthismonthavgkpi.bind(this);
        } else if (sCustomParams === "LastMonthAVGKPI") {
            return this.paramlastmonthavgkpi.bind(this);
        }
    },

    getBasicParams(oNavigateParams, oSelectionVariantParams: SelectionVariant): object[] {

        const basicParams = ['Werks', 'Auart', 'Ingpr','OrderCrtrd']
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
    }


    // paramThisMonthHRKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

    //     const params = this.getBasicParams(oNavigateParams, oSelectionVariantParams)

    //     const baseDateStr = oSelectionVariantParams.getParameter('Ordercrtrd')
    //    //const lastMonthPeriod = this.getLastMonthPeriod(baseDateStr)

    //     const firstDate = lastMonthPeriod[0]
    //     const lastDate = lastMonthPeriod[1]

    //     const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })

    //     params.push({
    //         path: 'From',
    //         operator: 'EQ',
    //         value1: formatter.format(firstDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     params.push({
    //         path: 'To',
    //         operator: 'EQ',
    //         value1: formatter.format(lastDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     return params
    // },

    // paramLastMonthHRKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

    //     const params = this.getBasicParams(oNavigateParams, oSelectionVariantParams)

    //     const baseDateStr = oSelectionVariantParams.getParameter('OrderCrtrd')
    //    // const thisMonthPeriod = this.getThisMonthPeriod(baseDateStr)

    //    // const firstDate = thisMonthPeriod[0]
    //    // const lastDate = thisMonthPeriod[1]

    //     const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })

    //     params.push({
    //         path: 'From',
    //         operator: 'EQ',
    //         value1: formatter.format(firstDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     params.push({
    //         path: 'To',
    //         operator: 'EQ',
    //         value1: formatter.format(lastDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     return params
    // },

    // paramThisMonthAVGKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

    //     const params = this.getBasicParams(oNavigateParams, oSelectionVariantParams)

    //     const baseDateStr = oSelectionVariantParams.getParameter('OrderCrtrd')
    //     const lastMonthPeriod = this.getLastMonthPeriod(baseDateStr)

    //     const firstDate = lastMonthPeriod[0]
    //     const lastDate = lastMonthPeriod[1]

    //     const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })

    //     params.push({
    //         path: 'From',
    //         operator: 'EQ',
    //         value1: formatter.format(firstDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     params.push({
    //         path: 'To',
    //         operator: 'EQ',
    //         value1: formatter.format(lastDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     return params
    // },
    // paramLastMonthAVGKPI(oNavigateParams, oSelectionVariantParams: SelectionVariant) {

    //     const params = this.getBasicParams(oNavigateParams, oSelectionVariantParams)

    //     const baseDateStr = oSelectionVariantParams.getParameter('OrderCrtrd')
    //     const lastMonthPeriod = this.getLastMonthPeriod(baseDateStr)

    //     const firstDate = lastMonthPeriod[0]
    //     const lastDate = lastMonthPeriod[1]

    //     const formatter = DateFormat.getDateInstance({ pattern: 'dd.MM.yyyy' })

    //     params.push({
    //         path: 'From',
    //         operator: 'EQ',
    //         value1: formatter.format(firstDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     params.push({
    //         path: 'To',
    //         operator: 'EQ',
    //         value1: formatter.format(lastDate),
    //         value2: '',
    //         sign: 'I'
    //     })

    //     return params
    // },
}