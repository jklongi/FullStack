import React from 'react'

const Numbers = props => (
  <div>
    <h2>Numerot</h2>
    <ul>
      {
        props.persons.filter(
          person => person.name.toLowerCase().includes(props.filter.toLowerCase())
        ).map(
          person => <li key={person.name}>{person.name} {person.number} <button onClick={e => props.removePerson(person)}>poista</button></li>
        )
      }
    </ul>
  </div>
)

export default Numbers
