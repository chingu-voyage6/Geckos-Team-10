import React from 'react'

const BorderContext = React.createContext()

export default class BoardProvider extends React.Component {
  static Consumer = BorderContext.Consumer

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

  render() {
    return (
      <BorderContext.Provider
        value={{ ...this.state }}
        {...this.props}
      />
    )
  }
}
