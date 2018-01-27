import React from 'react'

import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = props => (
  <div>
    <Otsikko otsikko={props.kurssi.nimi} />
    <Sisalto osat={props.kurssi.osat} />
    <Yhteensa osat={props.kurssi.osat} />
  </div>
)

export default Kurssi
