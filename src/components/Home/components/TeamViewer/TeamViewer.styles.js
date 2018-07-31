import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: block;
  width: 100%;

  ${props => props.large && css` width: 74% !important;`}
  ${props => props.med && css` width: 49% !important;`}
  ${props => props.small && css` width: 24% !important;`}
  ${props => props.flex && css` display: flex !important;`}
  ${props => props.align && css`align-items: center;`}
`

const Button = styled.button`
  max-height: 31px;
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

  ${props => props.active && css`
    color: white !important;
    background: #838c91 !important;
  `}

  ${props => props.bold && css`font-weight: bold;`}

  ${props => props.danger && css`
    background: #eb5a46 !important;
    border-bottom-color: #b04632 !important;
    color: #fff !important;
    box-shadow: none;
    transition: background .3s ease;

    &:hover {
      background: #D0513D !important;
    }
  `}

  ${props => props.small && css`
    text-align: center !important;
    width: 75px !important;
    margin: 0 5px 0 0;
  `}

  ${props => props.pull_left && css`margin-left: auto;`}

  ${props => props.solid && css`
    background: #e2e4e6;
    box-shadow: 0 1px 0 0 #c4c9cc;
    
    &:hover {
      background: #cdd2d4;
      box-shadow: 0 1px 0 0 #a5acb0;
      color: #4c4c4c;
    }
  `}
`

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  display: block;
  cursor: pointer;
  text-align: left;
  padding: 8px;
  margin: 5px 5px 5px 0;
  margin-right: auto;
  border-radius: 4px;
  outline: none;
  border: none;
  width: 200px;

  color: black;
  background: #F8F9F9;

  background: #e2e4e6 !important;
  box-shadow: 0 1px 0 0 #c4c9cc;
  
  &:hover {
    background: #cdd2d4 !important;
    box-shadow: 0 1px 0 0 #a5acb0;
    color: #4c4c4c;
  }
`
const LinkTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  display: block;
  padding-bottom: 60px;
  overflow: hidden;
`

const Input = styled.input`
  background-color: #e2e4e6;
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  padding: 6px 8px;
  display: block;
  width: 250px;
`

export {
  Button,
  Wrapper,
  Input,
  StyledLink,
  LinkTitle
}
