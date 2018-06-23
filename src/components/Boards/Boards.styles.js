import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  top: 50px;
  left: 0;
  display: block;
  z-index: 99;
  position: absolute;
  border-radius: 0 3px 3px 0;
  box-shadow: 0 3px 6px rgba(0,0,0,.4);
  background: #9999FF;
  width: 280px;
  height: 1000px;
`
const Input = styled.input`
  transition: background 85ms ease-in, border-color 85ms ease-in;
  width: 95%;
  border: 1px: solid grey;
  border-radius: 3px;
  background: #E2E4E6;
  padding: 6px;
  border: none;
  height: 29px;
  margin: 6px;
  
  &:focus {
    background: white;
  }
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

const Pills = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
  min-height: 35px;
`

const Pill = styled.div`
  border-radius: 3px;
  margin-top: 3px;
  padding: 6px;
  background: #DDDDDD;
  width: 100%;
`

const Text = styled.span`
  color: #DDDDDD;
`

const Button = styled.button`
  padding: 0;
  cursor: pointer;
  color: #DDDDDD;  
  background: #9999FF;
  border-radius: 4px;
  outline: none;
  border: none;

  ${props => props.pull_right && css`
    margin-left: auto;
  `}

  ${props => props.secondary && css`
    border-radius: 3px;
    color: grey;
    display: block;
    margin-top: 3px;
    margin-left: auto;
    margin-right: auto;
    padding: 6px;
    background: #DDDDDD;
    width: 95%;

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
      background: #DDDDDD;
    }
`}
`

export {
  Button,
  Wrapper,
  Text,
  Input,
  Icon,
  Pills,
  Pill
}
