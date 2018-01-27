import React from 'react'

const NewPerson = props => (
  <div>
    <h2>Lisää uusi / Muuta olemassa olevaa numeroa</h2>
    <form onSubmit={props.onSubmit}>
      <div>
        nimi: <input  name="newName" value={props.newName} onChange={props.onChange} />
      </div>
      <div>
        numero: <input  name="newPhoneNumber" value={props.newPhoneNumber} onChange={props.onChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </div>
)

export default NewPerson
