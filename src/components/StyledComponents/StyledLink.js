import styled from 'styled-components'
import { Link } from 'react-router-dom'


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

export default StyledLink
