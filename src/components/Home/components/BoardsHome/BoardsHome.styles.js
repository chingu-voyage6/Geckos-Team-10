import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
`

const Card = styled.button`
  cursor: pointer;
  text-align: left;
  padding: 8px;
  width: 165px;
  height: 100px;
  outline: none;
  border: none;
  margin: 5px 5px 5px 0;
  border-radius: 4px;
  transition: 0.1s;
  color: white;

  &:hover {
    filter: brightness(80%);
  }
`

const LinkTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  display: block;
  padding-bottom: 60px;
  overflow: hidden;
`
const CardWrapper = styled.div`
  z-index: 100;
  margin: 5px 5px 5px 0;
  border-radius: 4px;

  &:hover {
    background-color: black !important;
  }
`

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  text-align: left;
  padding: 8px;
  width: 149px;
  height: 84px;
  outline: none;
  border: none;
  margin: 5px 5px 5px 0;
  border-radius: 4px;
  transition: 0.1s;
  color: white;

  &:hover {
    filter: brightness(80%);
  }
`

export {
  Wrapper,
  Card,
  LinkTitle,
  CardWrapper,
  StyledLink,
}
