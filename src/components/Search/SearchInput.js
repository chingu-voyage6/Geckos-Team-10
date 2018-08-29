import React, { Component } from 'react'
import Input from './Search.styles'

class SearchInput extends Component {
  setSearchRef = node => {
    this.searchRef = node
  }

  render() {
    const { togglePopOver } = this.props
    console.log(this.props)
    return (
      <div ref={this.setSearchRef} style={{ height: '100%', display: 'block' }}>
        <Input
          type="search"
          {...this.props}
          hover={this.props.tertiary}
          background={this.props.secondary}
          onClick={() => togglePopOver(this.searchRef.getBoundingClientRect())}
        />
      </div>
    )
  }
}

export default SearchInput
