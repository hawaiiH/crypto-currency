export const state = () => {
    return {
        coinsList: null,
        selectedCoin: 0,
        selectedCoinName: 'BTC',
        coinInfo: null,
        coinChartInfo: null
    }
}
export const mutations = {
    setCoinsList (state, coinsList) {
        state.coinsList = coinsList;
    },
    setSelectedCoin (state, selectedCoin) {
        state.selectedCoin = selectedCoin;
        state.selectedCoinName = state.coinsList[selectedCoin].name;
    },
    setCoinChartInfo (state, coinChartInfo) {
        state.coinChartInfo = coinChartInfo;
    },
    setCoinInfo (state, coinInfo) {
        state.coinInfo = coinInfo;
    }
}