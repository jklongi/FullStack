import React from 'react'
import { Button } from 'reactstrap'
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
        <div className="d-inline-block align-bottom px-3">{this.props.children}</div>
        <Button color="danger" onClick={this.toggleVisiblity}>Cancel</Button>
      </div>
    ) : (
      <div className="align-bottom px-3">
        <Button color="primary" onClick={this.toggleVisiblity}>{this.props.buttonLabel}</Button>
      </div>
    )
  }
}

export default Togglable
