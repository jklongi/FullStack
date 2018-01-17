import React from 'react'

const Statistic = props => (
  <tr>
    <td>{props.statistic.name}</td>
    <td>{props.statistic.fn(props.feedbacks)}</td>
  </tr>
)

export default Statistic
