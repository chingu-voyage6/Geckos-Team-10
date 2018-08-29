import styled from 'styled-components'

const Input = styled.input`
  width: 210px;
  border-radius: 3px;
  margin: 0 5px 0 5px;
  transition: background .3s ease;
  height: 100%;
  border: none;

  background: ${props => props.background || 'grey'};
  
  &:hover {
    transition: 0.3s;
    background: ${props => props.hover || 'grey'}
  }
`

export default Input
