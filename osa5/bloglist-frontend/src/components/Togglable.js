import React from 'react'

class Togglable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
  }
  toggleVisiblity = () => {
    this.setState({ visible: !this.state.visible })
  }
  render(){
    return this.state.visible ? (
      <div>
        {this.props.children}
        <button onClick={this.toggleVisiblity}>Cancel</button>
      </div>
    ) : (
      <div>
        <button onClick={this.toggleVisiblity}>{this.props.buttonLabel}</button>
      </div>
    )
  }
}

export default Togglable
