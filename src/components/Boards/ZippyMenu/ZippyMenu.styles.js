import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Pills = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
  min-height: 35px;
`

const Filter = styled.div`
  width: 82%;
  position: absolute;
  top: 0;
  background: white;
  opacity: 0.75;
  right: 0;
  height: 100%;
  z-index: 1;
`

const StyledLink = styled(Link)`
  cursor: pointer;
  position: relative;
  min-height: 24px;
  text-decoration: none;
  text-align: left;
  outline: none;
  border: none;
  border-radius: 3px;
  margin-top: 4px;
  padding: 6px;
  width: 100%;
  opacity: 0.7;
  transition: 0.1s;

  color: ${props => props.color || 'grey'};
  background: ${props => props.background || '#DDDDDD'};

  &:hover {
    opacity: 1;
  }
`

const Pill = styled.div`
  border-radius: 3px;
  min-height: 24px;
  margin-top: 3px;
  padding: 6px;
  width: 100%;

  color: ${props => props.color || 'grey'};
  background: ${props => props.background || '#DDDDDD'};

  &:hover {
    filter: brightness(80%);
  }
`

export {
  StyledLink,
  Filter,
  Pills,
  Pill
}
