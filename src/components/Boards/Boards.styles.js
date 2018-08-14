import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  left: 0;
  display: block;
  width: 280px;
  z-index: 99;
  overflow-y: auto;
  
  background: white;

  ${props => props.notAlwaysOpen && css`
    top: 44px;
    position: absolute;
    border-radius: 0 3px 3px 0;
    box-shadow: 0 3px 6px rgba(0,0,0,.4);
  `}

  ${props => props.alwaysOpen && css`
    top: 0;
    position: fixed;
    box-shadow: 0 0 6px rgba(0,0,0,.4);
    height: 100%;
  `}
  
`
const Input = styled.input`
  transition: background 85ms ease-in, border-color 85ms ease-in;
  width: 95%;
  border: 1px: solid grey;
  border-radius: 3px;
  padding: 6px;
  border: none;
  height: 29px;
  margin: 6px;

  background: #E2E4E6;
  
  &:focus {
    background: white;
  }
`

const MenuHeader = styled.div`
  background: #E2E4E6;
  padding: 11px 13px;
  height: 18px;
`

const Icon = styled.span`
  font-size: 20px;
  height: 20px;
  width: 20px;
  padding: 6px;

  color: #DDDDDD;

  &:hover {
    color: grey;
  }
`

const Text = styled.span`
  color: black;
`

const Button = styled.button`
  padding: 0;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  border: none;

  color: #DDDDDD;
  background: white;

  ${props => props.pull_right && css`
    margin-left: auto;
  `}

  ${props => props.secondary && css`
    border-radius: 3px;
    display: block;
    margin: 6px;
    padding: 6px;
    width: 95%;

    color: grey;
    background: #DDDDDD;

    &:hover {
      color: #4c4c4c;
      background: #cacaca;
    }
  `}

  ${props => props.zippy && css`
    height: 32px;
    width: 32px;

    &:hover {
      color: grey;
      background: #808080;
    }
`}
`

export {
  MenuHeader,
  Button,
  Wrapper,
  Text,
  Input,
  Icon,
}
