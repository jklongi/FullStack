import React from 'react';
import axios from 'axios'

import CountryList from './Components/CountryList'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  componentWillMount(){
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      this.setState({ countries: res.data })
    })
  }

  onSearch(search){
    this.setState({ search })
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        Find countries: <input name="search" onChange={this.onChange} value={this.state.search} />
        {
          this.state.search && <CountryList onSearch={this.onSearch} countries={this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.search.toLowerCase()))}/>
        }
      </div>
    )
  }
}

export default App
