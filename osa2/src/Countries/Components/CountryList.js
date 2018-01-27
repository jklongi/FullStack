import React from 'react';
import Country from './Country'

const CountryList = props => {

  if(props.countries.length > 10){
    return <div>too many matches, specify another filter</div>
  } else if(props.countries.length === 1){
    return <Country country={props.countries[0]} />
  } else {
    const countries = props.countries.map(country => {
      return <li key={country.numericCode} onClick={e => props.onSearch(country.name)}>{country.name}</li>
    })
    return <ul>{countries}</ul>
  }

}

export default CountryList
