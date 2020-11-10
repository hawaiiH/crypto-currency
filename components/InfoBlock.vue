<template>
  <div class="crypto-info">
    <div>
      <h3>Volume (24h)</h3>
      <p>{{ coinsList[selectedCoin].totalVolume }}</p>
    </div>
    <div>
      <h3>Market Cap</h3>
      <p>{{ coinsList[selectedCoin].marketCap }}</p>
    </div>
    <div>
      <h3>Circulating Supply</h3>
      <p>{{ coinsList[selectedCoin].supply }}</p>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'InfoBlock',
    computed: mapState(['coinsList', 'selectedCoin']),
}
</script>


<style lang="scss">
  .crypto-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 4px solid black;
    font-size: 1.5em;
    text-align: center;
    background-color: #FFC72A;
  }
  
</style>