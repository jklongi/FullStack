import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const notification = this.props.notifications
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
})

export default connect(mapStateToProps)(Notification)
