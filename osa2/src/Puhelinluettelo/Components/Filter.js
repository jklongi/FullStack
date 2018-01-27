import React from 'react'

const Filter = props => (
  <div>
    rajaa näytettäviä: <input name="filter" value={props.filter} onChange={props.onChange} />
  </div>
)

export default Filter
