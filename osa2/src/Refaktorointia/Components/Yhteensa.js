import React from 'react'

const Yhteensa = (props) => (
  <p>yhteensä {props.osat.reduce((a,b) => (a + b.tehtavia), 0)} tehtävää</p>
)

export default Yhteensa
