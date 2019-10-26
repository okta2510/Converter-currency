<template>
  <div class="container">
    <h1 class="text-center text-light py-3">
      Converter {{$store.getters['converter/getTitle']}}
    </h1>
    <div class="wrap-app py-4">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card border-0">
            <div class="card-header mb-2 border">
              <small class="d-block">
                USD - United States Dollars
              </small>
              <div class="row align-items-center">
                <div class="col-md-5 mb-20 mb-md-0 font-weight-bold">
                  USD
                </div>
                <div class="col-md-7 mb-20 mb-md-0">
                  <input type="number" @keyup="setValue()"  class="text-right form-control form-control-sm w-100" lang="en" :value="BaseValue.ammount" name="" id="baseAmmount" autocomplete="off">
                </div>
              </div>
            </div>
            <div class="card-body border mb-2 rounded" v-for="(data, index) in ActiveCurrencies" :key="index">
              <div class="row align-items-center">
                <div class="col-md-3">
                  {{data.name}}
                </div>
                <div class="col-md-7 text-md-right">
                  {{calculateRate(data.rate)}}
                </div>
                <div class="col-md-2 text-center text-md-right">
                  <button class="btn btn-danger btn-sm" @click="removeConverter(data)">
                    <div class="fa fa-trash"></div>
                  </button>
                </div>
              </div>
              <small class="d-block text-muted font-weight-bold">
                {{data.name}} - {{translate(data.name)}}
              </small>
              <small class="d-block text-muted">
                1 USD = {{data.name}} {{thousandFormatter(data.rate)}}
              </small>
            </div>
          </div>
          <button v-if="OnEdit === false" class="btn btn-primary w-100 mt-3" @click="toggleEdit()">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
            Add More
          </button>

          <div v-else>
            <div class="input-group mb-3">
              <select id="listOfCurrencies" v-model="selectedCurrency" class="form-control">
                <option value="">Please select one</option>
                <option v-for="(value, index) in AllCurrencies" v-if="!initialCurrencies.includes(value.name)" :key="index">{{value.name}}</option>
              </select>
              <div class="input-group-append">
                <button class="btn btn-primary" @click="addNew()">Add</button>
              </div>
            </div>
            <a href="javascript:void(0)" @click="toggleEdit()" class="d-block text-center">Cancel</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import Vuency from 'vuency'
import ConverterMixin from '@/mixins/converter'

Vue.use(Vuency)
Vue.use(Vuex)
export default {
  components: {
  },
  mounted() {
  },
  mixins: [ConverterMixin],
  methods: {
    addNew: function (e) {
      let self = this
      this.initialCurrencies.push(self.selectedCurrency)
      this.toggleEdit()
    },
    setValue: function (e) {
      let value = $('#baseAmmount').val()
      value = parseFloat(value).toFixed(4)
      this.BaseValue.ammount = value
    },
    toggleEdit: function () {
      this.OnEdit = !this.OnEdit
      this.selectedCurrency = ''
    },
    removeConverter: function (obj) {
      let arr = []
      this.initialCurrencies.forEach((element, index) => {
        if(element !== obj.name) {
          arr.push(element)
        }
      })
      this.initialCurrencies = arr
    }
  }
}
</script>

<style lang="scss">
  .wrap-app {
    background-color: #fff;
  }
  body {
    background-color: #1B1C5E;
  }
  .logo {
    width: 50px!important;
    height: auto!important;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
</style>
