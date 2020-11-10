<template>
  <div class="cryptos">
    <table class="crypto-table">
      <thead class="crypto-table__head">
        <tr>
          <th>Symbol</th>
          <th>Coin</th>
          <th>Price</th>
          <th>Changes % 24h</th>
        </tr>
      </thead>
      <tbody
        class="crypto-table__list">
        <tr
          v-for="(crypto, i) in coinsList"
          :key="i"
          @click="selectCoin(i)"
          class="crypto-table__list__item"
          :class="[crypto.name === coinsList[selectedCoin].name ? activeClass : '']">
          <td class="crypto-table__list__item__sybmol">
            {{ crypto.crSymbol }}
          </td>
          <td class="crypto-table__list__item__name">
            {{ crypto.fullName }}
          </td>
          <td>
            {{ crypto.price }}$
          </td>
          <td 
            class="changes" 
            :class="crypto.change24hour >= 0 ? positiveClass: negativeClass">
            {{ crypto.change24hour }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'ListCrypto',
  data() {
    return {
      activeClass: 'active',
      positiveClass: 'positive',
      negativeClass: 'negative'
    }
  },
  computed: mapState(['coinsList', 'selectedCoin']),
  methods: {
    selectCoin(coin) {
      this.$store.commit('setSelectedCoin', coin);
    }
  }
}
</script>

<style lang="scss">
.cryptos {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
.crypto-table {
  border: 4px solid black;
  border-collapse: collapse;
  margin: 20px 10px 0 20px;
  grid-column-start: 1;
  &__head {
    background-color: #FFC72A;
  }
  &__list {
    &__item{
      transition: 0.4s;
      background-color: #444444;
      color: #fff;
      padding: auto 0;
      height: 2.5em;
      border: 4px solid black;
      &:hover,
      &:focus{
        box-shadow: inset 4em 0 0 0 #000;
        color: #FFC72A;
      }
      &__sybmol{
        width: 4em;
        text-align: center;
        margin-top: 0.5em;
      }
      &__name{
        font-size: 1.2em;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.info-block {
  grid-column-start: 2;
    margin: 20px;
    & table {
      width: 60vw;
      height: 3em;
    }
  }
.active {
  box-shadow: inset 4em 0 0 0 #000;
  color: #FFC72A;
}
.changes {
  text-align: center;
}
.positive {
  color: #11bf31;
}
.negative {
  color: #ff0000;
}

</style>