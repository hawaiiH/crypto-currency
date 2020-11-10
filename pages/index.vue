<template>
  <div class="app">
    <div class="list-crypto">
      <ListCrypto/>
    </div>
    <div class="info-block">
      <InfoBlock/>
    </div>
    <div class="chart-block">
      <ChartBlock/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  async asyncData({ store, $http }) {
    const coinData = [];
    await $http.$get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
            .then( res => {
                res.Data.forEach( coin => {
                    const fullName = coin.CoinInfo.FullName;
                    const name = coin.CoinInfo.Name;
                    const crSymbol = coin.DISPLAY.USD.FROMSYMBOL;
                    const price = coin.RAW.USD.PRICE.toFixed(2);
                    const priceNotFixed = coin.RAW.USD.PRICE;
                    const change24hour = ((coin.RAW.USD.CHANGE24HOUR*100)/priceNotFixed).toFixed(2);
                    const totalVolume = coin.DISPLAY.USD.TOTALVOLUME24HTO;
                    const marketCap = coin.DISPLAY.USD.MKTCAP;
                    const supply = coin.DISPLAY.USD.SUPPLY;
                    const coinInfo = {
                        fullName,
                        name,
                        crSymbol,
                        price,
                        change24hour,
                        totalVolume,
                        marketCap,
                        supply
                    }
                    coinData.push(coinInfo)
                });
            });
    store.commit('setCoinsList', coinData)
  },
  methods: {
    async getData() {
      const coinData = [];
      await this.$http.$get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
              .then( res => {
                  res.Data.forEach( coin => {
                      const fullName = coin.CoinInfo.FullName;
                      const name = coin.CoinInfo.Name;
                      const crSymbol = coin.DISPLAY.USD.FROMSYMBOL;
                      const price = coin.RAW.USD.PRICE.toFixed(2);
                      const priceNotFixed = coin.RAW.USD.PRICE;
                      const change24hour = ((coin.RAW.USD.CHANGE24HOUR*100)/priceNotFixed).toFixed(2);
                      const totalVolume = coin.DISPLAY.USD.TOTALVOLUME24HTO;
                      const marketCap = coin.DISPLAY.USD.MKTCAP;
                      const supply = coin.DISPLAY.USD.SUPPLY;
                      const coinInfo = {
                          fullName,
                          name,
                          crSymbol,
                          price,
                          change24hour,
                          totalVolume,
                          marketCap,
                          supply
                      }
                      coinData.push(coinInfo)
                  });
              });
      this.$store.commit('setCoinsList', coinData)
    },
    updateData(){
      this.getData()
      setTimeout(this.updateData, 30000)
    }
  },
  mounted() {
    this.updateData()
  }
}
</script>

<style lang="scss">
@import "../assets/reset.css";
body {
  background-color: #b2b2b2;
}
.app {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 4fr ;
}
.list-crypto {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
}
.info-block {
  grid-column: 2;
  grid-row: 1;
}
.chart-block{
  grid-column: 2;
  grid-row: 2;
}
</style>
