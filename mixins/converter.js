import Vue from 'vue'
import Vuency from 'vuency'
import axios from '~/plugins/axios'
import conf from '~/nuxt.config'
import * as translate from '~/utils/translate'
Vue.use(Vuency)

const ConverterMixin = {
  data() {
    return {
      BaseValue: {
        ammount: parseFloat(10.100).toFixed(4),
        rate: 'USD'
      },
      initialCurrencies: ['IDR', 'EUR', 'GBP', 'SGD'],
      AllCurrencies: [],
      OnEdit: true,
      selectedCurrency: ''
    }
  },
  mounted() {
    this.getCurrencies.run()
  },
  computed: {
    ActiveCurrencies: function () {
      if(this.AllCurrencies.length > 0) {
        let self = this
        let arr = []
        this.AllCurrencies.forEach((all, index) => {
          self.initialCurrencies.forEach((init, index2) => {
            if(all.name === init) {
              arr.push(all)
            }
          })
        })
        return arr
      } else {
        return [] 
      }
    }
  },
  methods: {
    calculateRate: function (num) {
      let result = 0
      if (this.BaseValue.ammount) {
        result = parseFloat(this.BaseValue.ammount).toFixed(2) * parseFloat(num)
      } 
      return this.thousandFormatter(result)
    },
    thousandFormatter: function (num) {
      num = parseFloat(num).toFixed(2)
      var str = num.toString().split('.');
      if (str[0].length >= 4) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      return str.join('.');
    },
    translate: function (val) {
      let text = ''
      translate.kurs.forEach((element, index) => {
        if (Object.keys(element)[0] === val) {
          text = Object.values(element)[0]
          return 
        }
      })
      return text
    },
    afterGetResponse: function (res) {
      let self = this
      this.BaseValue.date =  res.data.date
      for (let [key, value] of Object.entries(res.data.rates)) {
        self.AllCurrencies.push({
          name: key,
          rate: value
        })
      }
    }
  },
  tasks (t, { timeout }) {
    return {
      getCurrencies: t(function * () {
        let self = this
        const config = {
          headers: {
            Accept: "application/json"
          }
        }
        try {
          const res = yield axios.get(`https://api.exchangeratesapi.io/latest?base=USD`, config)

          self.afterGetResponse(res)
        } catch (err) {
          console.log(err);
        }
      })
      // Don't allow repeat calls to fire (one flip at a time!).
      .flow('drop'),
    }
  }
}

export default ConverterMixin