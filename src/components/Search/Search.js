import React, { Component, Fragment } from 'react'
import { PopOver, SearchInput } from '../Components'

class Search extends Component {
  state = {}
  render() {
    const SearchMenuPopOver = PopOver(undefined, SearchInput)
    return (
      <Fragment>
        <SearchMenuPopOver {...this.props} />
      </Fragment>
    )
  }
}

export default Search
