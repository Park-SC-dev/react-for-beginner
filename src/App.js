import { useState,useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [money, setMoney] = useState(0)
  const [changedCoin, setChangedCoin] = useState(0)
  const [divideValue, setDivideValue] = useState(0)
  const [selectedCoin, setSelectedCoin] = useState(null);
  useEffect(()=> {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then(json => {
        setCoins(json)
        setLoading(false)
        if (json.length >0) {
          setSelectedCoin(json[0]);
          setDivideValue(json[0].quotes.USD.price)
        }
      })
  },[])
  function onChangeOption(event) {
    setMoney(0)
    setChangedCoin(0)
    const selected = event.target.value;
    const selectedCoin = coins.find(coin => coin.name === selected);
    if (selectedCoin) {
      setSelectedCoin(selectedCoin)
      setDivideValue(selectedCoin.quotes.USD.price)
    }
  }
  function onChange(event) {
    setMoney(event.target.value)
  }
  function onSubmit(event) {
    event.preventDefault()
    setChangedCoin(money/divideValue)
  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong>: null}
      <select onChange = {onChangeOption} value={selectedCoin ? selectedCoin.name : ""}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.name}>
             {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
          </option> ))}
      </select>
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange} 
          value={money} 
          type="number" 
          placeholder="USD 얼마 있음?"
        />
        <button> Change </button>
      </form>
      <h1>{changedCoin} {selectedCoin ? selectedCoin.symbol : ""}</h1>
    </div>
  );
}

export default App;
