import React from 'react'
import Button from './Button'

const Feedback = props => (
  <div>
    {
      props.options.map(option => {
        return <Button key={option.value} onClick={props.onFeedback(option)} name={option.name} />
      })
    }
  </div>
)

export default Feedback
