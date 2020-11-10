<script>
import { Line } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
  extends: Line,
  name: 'Chart',
  computed: mapState(['coinChartInfo']),
  methods: {
    setChartData() {
      return {
          chartdata: {
            datasets: [
              {
                label: `${this.coinChartInfo.name} to USD`,
                borderColor: '#FFC72A',
                data: this.coinChartInfo.data,
                fill: false
              }
            ]
          },
          options: {
            animation: {
              duration: 0
            },
            scales:{
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                      'minute': 'H:mm',
                      'day': 'DD.MMM',
                      'month': "MMM 'YY",
                    },
                  unit: this.coinChartInfo.display
                },
                ticks: {
                  maxTicksLimit: 15
                },
              }]
            },
            responsive: true,
            maintainAspectRatio: false
          }
      }
    }
  },
  mounted () {
    const {chartdata, options} = this.setChartData()
    this.renderChart(chartdata, options);
  },
  watch: {
    coinChartInfo(newCoin, oldCoin) {
      if (newCoin !== oldCoin) {
        const {chartdata, options} = this.setChartData()
        this.renderChart(chartdata, options);
      }
    }
  }
}
</script>