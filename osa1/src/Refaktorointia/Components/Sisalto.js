import React from 'react'
import Osa from './Osa'

const Sisalto = (props) => (
  props.osat.map(osa => {
    return <Osa key={osa.nimi}  osa={osa} />
  })
)

export default Sisalto
