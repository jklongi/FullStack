import React from 'react';

const Country = props => (
  <div>
    <h1>{props.country.name}</h1>
    <div>Capital: {props.country.capital}</div>
    <div>Population: {props.country.population}</div>
    <img style={{width: '800px'}} src={props.country.flag} alt="flag" />
  </div>
)

export default Country
