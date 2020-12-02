import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
var NumberFormat = require('react-number-format');
const options = [
  {
    label: "USD",
    value: "USD",
  },
  {
    label: "EUR",
    value: "EUR",
  },
  {
    label: "CZK",
    value: "CZK",
  }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      currency: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    App.currency = "USD";
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP&tsyms=USD,EUR,CZK')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({ cryptos: cryptos });

      })
  }


  handleChange(e) {
    this.setState({ currency: e.target.value });
    // console.log(e.target.value)
    App.currency = e.target.value
    console.log(App.currency)
  }




  render() {
    return (
      <div className="App">
        <div id="currency-container">
          <span className="right">
            <select value={App.currency} onChange={this.handleChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </span>
        </div>


        {Object.keys(this.state.cryptos).map((key) => (

          <div id="crypto-container">
            <span className="left">{"1 " + key}</span>
            <span className="right"><NumberFormat value={this.state.cryptos[key][App.currency]} displayType={'text'} decimalPrecision={2} thousandSeparator={true} suffix={" "+ App.currency} /></span>
          </div>

        ))}
      </div>
    );
  }
}


export default App;
