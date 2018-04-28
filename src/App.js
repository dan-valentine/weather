import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './reset.css';
import ForecastDisplay from './ForecastDisplay';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentSearches: [],
      city: '',
      selectedState: '',
      forecast: [],
      states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }
  }

  componentDidMount() {
    axios.get('/api/places').then(({ data }) => {
      this.setState({
        recentSearches: data
      })
    })
  }

  changeState = (event) => {
    const { value } = event.target;
    this.setState({ selectedState: value })

  }

  changeCity = (event) => {
    const { value } = event.target;
    this.setState({ city: value })

  }

  getWeather = () => {
    const { selectedState, city } = this.state
    axios.post('/api/places', { selectedState, city }).then(({ data }) => {
      this.setState({
        recentSearches: data
      })
    });

    axios.get(`http://api.wunderground.com/api/${process.env.REACT_APP_API_KEY}/forecast10day/q/${selectedState}/${city}.json`).then(({ data }) => {
      this.setState({ forecast: data.forecast.simpleforecast.forecastday.slice(0, 5) })
    })

  }

  loadRecent = ({ selectedState, city }) => {
    axios.get(`http://api.wunderground.com/api/${process.env.REACT_APP_API_KEY}/forecast10day/q/${selectedState}/${city}.json`).then(({ data }) => {
      this.setState({ forecast: data.forecast.simpleforecast.forecastday.slice(0, 5) })
    })
  }

  render() {
    const { states, recentSearches, city, selectedState, forecast } = this.state;
    const stateOptions = states.map((s, i) => <option key={i} value={s}>{s}</option>)

    const forecastDisplay = forecast.map((forecast, index) => <ForecastDisplay key={index} forecast={forecast} />)
    const recentDisplay = recentSearches.map((place, index) =>
      <li className='App-recent-list-item' key={index} onClick={_ => this.loadRecent(place)}>{place.city}</li>
    );
    return (
      <div className="App">
        <h1 className="App-title">{'<DevWeather />'}</h1>
        <div className="App-form">
          <input value={city} placeholder='City' onChange={this.changeCity} />
          <select value={selectedState} onChange={this.changeState}>
            <option value=''>Select State</option>
            {stateOptions}
          </select>
          <button onClick={this.getWeather}>Get Weather</button>
        </div>
        <div className='App-forcast'>
          {
            forecastDisplay.length ?
              <Fragment>
                <p className='display'>5 Day Forecast</p>
                <div className='App-forcast-display-containter'>
                  {forecastDisplay}
                </div>
              </Fragment>
              :
              <p className='display'>Enter City</p>
          }
        </div>
        <div>
          <h3>Recent</h3>
          <ul className='App-recent-list'>{recentDisplay}</ul>
        </div>
        <footer>Powered by www.wunderground.com</footer>
      </div>
    );
  }
}

export default App;
