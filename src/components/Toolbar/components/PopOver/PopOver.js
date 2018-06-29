import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Wrapper, Pill, Header } from './PopOver.styles'

class PopOver extends Component {
  constructor(props) {
    super(props)
    this.state = { popOverIsActive: false }
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
    if (typeof nextState !== 'undefined') {
      this.setState({ popOverIsActive: nextState })
    } else {
      this.setState({ popOverIsActive: !this.state.popOverIsActive })
    }
  }

  render() {
    return (
      <div ref={this.setPopOverRef}>
        <Button avatar onClick={() => this.togglePopOver()}>
          <Avatar alt="" src={localStorage.getItem('picture')} />
        </Button>
        {this.state.popOverIsActive &&
          <Wrapper>
            <Header>
              {localStorage.getItem('nickname')}
            </Header>
            <Pill>
              <Link to="/profile">Profile</Link>
            </Pill>
            <Pill>
              <Link to="/home">Home</Link>
            </Pill>
            <Pill>
              <Link to="/board">Board</Link>
            </Pill>
            <Pill>
              <button onClick={this.props.logout}>Logout</button>
            </Pill>
          </Wrapper>
        }
      </div>
    )
  }
}

export default PopOver
