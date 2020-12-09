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
      value: "",
      cryptos: [],
      currency: "",

    };


    App.currency = "USD";
    this.handleChange = this.handleChange.bind(this);


    App.value = "1";
    this.handleChangeNum = this.handleChangeNum.bind(this);


  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP&tsyms=USD,EUR,CZK')
      .then(res => {
        const cryptos = res.data;
        //console.log(cryptos);
        this.setState({ cryptos: cryptos });

      })
  }


  componentDidUpdate() {

    setInterval(() => {
      this.componentDidMount();
    }, 15000);

  }


  handleChange(e) {
    this.setState({ currency: e.target.value });
    // console.log(e.target.value)
    App.currency = e.target.value
    console.log(App.currency)

  }

  handleChangeNum(event) {
    this.setState({ value: event.target.value });
    //console.log(event.target.value);
    App.value = event.target.value;
  }


  render() {
    return (

      <div class="App">
        <div id="currency-container">
          <span class="right">
            <select class="form-control" value={App.currency} onChange={this.handleChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>

          </span>
        </div>


        {Object.keys(this.state.cryptos).map((key) => (

          <div id="crypto-container">
            <span class="left">
              <form>
                <div class="row">
                  <div class="col-sm-0">
                    <input class="form-control form-control-sizing" type="text" value={App.value} onChange={this.handleChangeNum} />
                  </div>
                  <div class="col-sm-3">
                    {"x " + key}
                  </div>
                  <div class="col-sm-7">
                    <span class="right text-prop"><NumberFormat value={this.state.cryptos[key][App.currency] * App.value} displayType={'text'} decimalPrecision={2} thousandSeparator={true} suffix={" " + App.currency} /></span>
                  </div>
                </div>
              </form>
            </span>
          </div>
        ))}
      </div>
    );
  }
}



export default App;
