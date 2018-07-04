import React from 'react'

const BorderContext = React.createContext()

export default class BoardProvider extends React.Component {
  static Consumer = BorderContext.Consumer

  state = {
    showModal: false,
    onShowModal: () => {
      this.setState({ showModal: true })
    },
    onHideModal: () => {
      this.setState({ showModal: false })
    }
  }

  render() {
    return (
      <BorderContext.Provider
        value={{ ...this.state }}
        {...this.props}
      />
    )
  }
}
