import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: block;
  width: 30%;
`

const Pill = styled.div`
  border-radius: 3px;
  margin-top: 3px;
  padding: 6px;
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
  font-weight: bold;
  padding: 8px;
  width: 80%;
  margin: 5px 5px 5px 0;
  margin-right: auto;
  border-radius: 4px;
  outline: none;
  border: none;

  color: black;
  background: #F8F9F9;

  &:hover {
    background: #EDEFF0;
  }

  ${props => props.active && css`
    color: #0179BF !important;
    background: #E4F0F6;

    &:hover {
      background: #E4F0F6;      
    }
  `}
`

export {
  Button,
  Wrapper,
  Title,
  Pill
}
