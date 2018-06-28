import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: block;
  width: 30%;
`

const Pill = styled.div`
  border-radius: 3px;
  margin-top: 3px;
  padding: 6px;
  background: #DDDDDD;
  width: 100%;
`

const Title = styled.span`
  margin-top: 5px;
  font-weight: 700;
  display: block;
  width: 100%;

  color: #838C91;
`

const Button = styled.button`
  cursor: pointer;
  text-align: left;
  padding: 8px;
  width: 80%;
  margin: 5px 5px 5px 0;
  margin-right: auto;
  border-radius: 4px;
  outline: none;
  border: none;

  color: white;

  &:hover {
    background: #cacaca;
  }

  ${props => props.color && css`
    background: #343434;

    &:hover {
      background: black;
    }
  `}
`

export {
  Button,
  Wrapper,
  Title,
  Pill
}
