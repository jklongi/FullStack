import React from 'react'

import Feedback from './Feedback'
import Statistics from './Statistics'

const options = [
  { value: 1, name: 'Hyvä' },
  { value: 0, name: 'Neutraali' },
  { value: -1, name: 'Huono' }
]

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      feedbacks: []
    }
  }
  onFeedback = value => {
    return () => {
      this.setState({ feedbacks: [...this.state.feedbacks, value ] })
    }
  }
  render(){
    console.log(this.state.feedbacks)
    return (
      <div>
        <Feedback options={options} onFeedback={this.onFeedback} />
        <Statistics feedbacks={this.state.feedbacks} />
      </div>
    )
  }
}
