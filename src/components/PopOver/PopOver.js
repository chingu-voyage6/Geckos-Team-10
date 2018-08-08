import React from 'react'
import Wrapper from './PopOver.styles'

function PopOver(WrappedComponent, ButtonComponent) {
  return class extends React.Component {
    state = {
      popOverIsActive: false,
      positioned: false,
      styles: {}
    }

    componentDidMount = () => {
      document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount = () => {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }

    setPopOverRef = node => {
      this.popOverRef = node
    }

    handleClickOutside = event => {
      if (this.popOverRef && !this.popOverRef.contains(event.target)) {
        this.togglePopOver(false)
      }
    }

    togglePopOver = nextState => {
      if (typeof nextState === 'object') {
        this.setState({
          popOverIsActive: nextState,
          positioned: true,
          styles: nextState
        })
      } else if (typeof nextState !== 'undefined') {
        this.setState({ popOverIsActive: nextState })
      } else {
        this.setState({ popOverIsActive: !this.state.popOverIsActive })
      }
    }


    render() {
      const { positioned, styles } = this.state
      return (
        <div ref={this.setPopOverRef}>
          <ButtonComponent {...this.props} togglePopOver={this.togglePopOver} />
          {this.state.popOverIsActive &&
            <Wrapper top_right={!positioned} style={styles}>
              {
                WrappedComponent ? <WrappedComponent {...this.props} /> :
                <div>You can pass a component in here!</div>
              }
            </Wrapper>
          }
        </div>
      )
    }
  }
}

export default PopOver
