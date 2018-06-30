import React from 'react'

const BorderContext = React.createContext()

export default class BoardProvider extends React.Component {
  static Consumer = BorderContext.Consumer

  state = {}

  render() {
    return (
      <BorderContext.Provider
        value={{ ...this.state }}
        {...this.props}
      />
    )
  }
}
