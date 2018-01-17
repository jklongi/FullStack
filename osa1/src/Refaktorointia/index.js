import React from 'react'
import ReactDOM from 'react-dom'

import Otsikko from './Components/Otsikko'
import Sisalto from './Components/Sisalto'
import Yhteensa from './Components/Yhteensa'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'

  const osat = [
    { nimi: 'Reactin perusteet', tehtavia: 10 },
    { nimi: 'Tiedonvälitys propseilla', tehtavia: 7 },
    { nimi: 'Komponenttien tila', tehtavia: 14 }
  ]

  return (
    <div>
      <Otsikko otsikko={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
