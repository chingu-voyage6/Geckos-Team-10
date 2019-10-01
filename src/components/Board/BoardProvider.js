import React from 'react'

const BorderContext = React.createContext()

export default class BoardProvider extends React.Component {
  state = {
    showModal: false,
    cardSelected: '',
    onShowModal: id => {
      this.setState({ showModal: true, cardSelected: id })
    },
    onHideModal: () => {
      this.setState({ showModal: false, cardSelected: '' })
    }
  }

  static Consumer = BorderContext.Consumer

  render() {
    return (
      <BorderContext.Provider
        value={{ ...this.state }}
        {...this.props}
      />
    )
  }
}
