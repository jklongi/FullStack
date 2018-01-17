import React from 'react'
import Statistic from './Statistic'

const statisticsList = [
  {
    name: 'Hyvä',
    fn: feedbacks => feedbacks.filter(feedback => feedback.value === 1).length
  },
  {
    name: 'Neutraali',
    fn: feedbacks => feedbacks.filter(feedback => feedback.value === 0).length
  },
  {
    name: 'Hyvä',
    fn: feedbacks => feedbacks.filter(feedback => feedback.value === -1).length
  },
  {
    name: 'Keskiarvo',
    fn: feedbacks => (feedbacks.reduce((a,b) => (a + b.value), 0) / feedbacks.length).toFixed(2)
  },
  {
    name: 'Positiivisia',
    fn: feedbacks => (feedbacks.filter(feedback => feedback.value === 1).length / feedbacks.length).toFixed(2) + '%'
  },
]

const Statistics = props => {
  if(props.feedbacks.length){
    return (
      <table>
        <tbody>
          {
            statisticsList.map((statistic, i) => {
              return <Statistic key={i} statistic={statistic} feedbacks={props.feedbacks} />
            })
          }
        </tbody>
      </table>
    )
  } else {
    return <div>Yhtään palautetta ei ole annettu</div>
  }
}

export default Statistics
