<template>
  <div class="chart">
    <button
      v-for="(btn, index) in periodButtons"
      @click="selectPeriod(index)"
      :key="index">{{ btn.value }}
    </button>
    <Chart v-if="loaded"/>
    <div v-else>LOADING</div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
  name: 'ChartBlock',
  data() {
    return {
      periodButtons: [
        { value: '1d', display: 'minute', period: 'minute', limit: '1440'},
        { value: '7d', display: 'day', period: 'hour', limit: '168'},
        { value: '1m', display: 'day', period: 'day', limit: '30'},
        { value: '3m', display: 'day', period: 'day', limit: '90'},
        { value: '1y', display: 'month', period: 'day', limit: '365'}
      ],
      crntPeriod: 0,
      loaded: false
    }
  },
  computed: mapState(['selectedCoinName']),
  methods: {
    async getChartData(name, display, value, period, limit) {
      const computedData = {
            name,
            display,
            value,
            data: []
        }
      await this.$http.$get(`https://min-api.cryptocompare.com/data/v2/histo${period}?fsym=${name}&tsym=USD&limit=${limit}`)
        .then(res => {
          res.Data.Data.forEach(info => {
            const time = info.time;
            const cost = info.high;
            computedData.data.push({x: time*1000, y: cost});
          })
        })
      this.$store.commit('setCoinChartInfo', computedData) 
    },
    selectPeriod(index) {
      this.crntPeriod = index;
    },
    async updateData() { 
      await this.getChartData(this.selectedCoinName,
                      this.periodButtons[this.crntPeriod].display,
                      this.periodButtons[this.crntPeriod].value,
                      this.periodButtons[this.crntPeriod].period,
                      this.periodButtons[this.crntPeriod].limit)
      setTimeout(() => this.updateData(), 30000)
    }
  },
  async mounted() {
    this.loaded = false;
    await this.updateData();
    this.loaded = true;
  },
  watch: {
    selectedCoinName(newCoin, oldCoin) {
      if (newCoin !== oldCoin) {
        this.getChartData(newCoin,
                          this.periodButtons[this.crntPeriod].display,
                          this.periodButtons[this.crntPeriod].value,
                          this.periodButtons[this.crntPeriod].period,
                          this.periodButtons[this.crntPeriod].limit)
      }
    },
    crntPeriod(newBtn, oldBtn) {
      if(newBtn !== oldBtn) {
        this.getChartData(this.selectedCoinName,
                  this.periodButtons[newBtn].display,
                  this.periodButtons[newBtn].value,
                  this.periodButtons[newBtn].period,
                  this.periodButtons[newBtn].limit);
      }
    }
  }
}
</script>

<style lang="scss">
.chart button {
  width: 3em;
  height: 2em;
  margin-right: 2px;
  background-color: black;
  color: white;
  border: 3px #FFC72A solid;
  border-radius: 3px;
  transition: 0.25s;
  &:hover,
  &:focus {
    box-shadow: inset 0 0 0 2em #FFC72A;
    border-color: black;
    color: black;
  } 
}
</style>