import styled from 'styled-components'
import { Link } from 'react-router-dom'


const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  text-align: left;
  font-family: 'Pacifico', cursive;
  font-size: 20px;
  padding: 0;
  width: 149px;
  height: 84px;
  outline: none;
  border: none;
  margin: 5px 5px 5px 0;
  border-radius: 4px;
  transition: 0.1s;

  color: ${props => props.color || 'white'};

  &:hover {
    transition: 0.3s;
    color: white;
  }
`

export default StyledLink
