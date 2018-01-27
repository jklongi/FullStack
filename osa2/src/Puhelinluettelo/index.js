import React from 'react';

import Filter from './Components/Filter'
import NewPerson from './Components/NewPerson'
import Numbers from './Components/Numbers'
import Notification from './Components/Notification'

import personService from './services/person'
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhoneNumber: '',
      filter: '',
      message: null
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.removePerson = this.removePerson.bind(this)
  }

  componentWillMount(){
    personService.getAll().then(persons => {
      this.setState({ persons })
    })
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault()
    const exists = this.state.persons.find(person => person.name === this.state.newName)
    if(exists && this.state.newPhoneNumber){
      this.updatePerson(exists)
    } else if(!this.state.newName || !this.state.newPhoneNumber){
      alert('Nimi tai numero ei voi olla tyhjä')
    } else {
      this.addPerson({ name: this.state.newName, number: this.state.newPhoneNumber })
    }
  }

  updatePerson(exists){
    if (window.confirm(exists.name + " on jo listassa, korvataanko vanha numero uudella?")) {
      personService.update(exists.id, {...exists, number: this.state.newPhoneNumber}).then(_person => {
        this.setState({
          persons: this.state.persons.map(person => {
            return person.id === _person.id ? _person : person
          }),
          newName: '',
          newPhoneNumber: '',
          message: 'Korvattiin käyttäjän ' + _person.name + ' numero'
        })
        this.clearMessage()
      }).catch(error => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== exists.id),
          newName: '',
          newPhoneNumber: '',
          message: 'Käyttäjä ' + exists.name + ' on jo poistettu'
        })
        this.clearMessage()
      })
    }
  }

  addPerson(person){
    personService.create(person).then(person => {
      this.setState({
        persons: [ ...this.state.persons, person ],
        newName: '',
        newPhoneNumber: '',
        message: 'Lisättiin käyttäjä ' + person.name
      })
      this.clearMessage()
    }).catch(error => {
      this.setState({
        persons: this.state.persons.filter(p => p.id !== person.id),
        newName: '',
        newPhoneNumber: '',
        message: 'Lisäys ei onnistunut'
      })
      this.clearMessage()
    })
  }

  clearMessage(){
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  removePerson(_person){
    if (window.confirm("Poistetaanko " + _person.name + "?")) {
      personService.remove(_person.id).then(() => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== _person.id),
          message: 'Poistettiin käyttäjä ' + _person.name
        })
        this.clearMessage()
      }).catch(error => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== _person.id),
          newName: '',
          newPhoneNumber: '',
          message: 'Käyttäjä ' + _person.name + ' on jo poistettu'
        })
        this.clearMessage()
      })
    }
  }


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message} />
        <Filter onChange={this.onChange} filter={this.state.filter} />
        <NewPerson newName={this.state.newName} newPhoneNumber={this.state.newPhoneNumber} onSubmit={this.onSubmit} onChange={this.onChange} />
        <Numbers filter={this.state.filter} persons={this.state.persons} removePerson={this.removePerson}/>
      </div>
    )
  }
}

export default App
