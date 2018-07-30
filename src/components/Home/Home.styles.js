import styled, { css } from 'styled-components'

const FlexWrapper = styled.div`
  display: flex;
  margin: auto;
  height: 100%;
  width: 80%;
`

const Button = styled.button`
  cursor: pointer;
  text-align: left;
  padding: 8px;
  width: 215px;
  display: block;
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

  ${props => props.bold && css`font-weight: bold;`}

  ${props => props.small && css`
    text-align: center !important;
    width: 75px !important;
    margin: 0 5px 0 0 !important;
  `}

  ${props => props.solid && css`
    background: #e2e4e6 !important;
    box-shadow: 0 1px 0 0 #c4c9cc;
    
    &:hover {
      background: #cdd2d4 !important;
      box-shadow: 0 1px 0 0 #a5acb0;
      color: #4c4c4c;
    }
  `}

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
  FlexWrapper
}
