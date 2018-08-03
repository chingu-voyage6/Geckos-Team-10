import styled from 'styled-components'

const ButtonCard = styled.button`
  cursor: pointer;
  text-align: left;
  padding: 8px;
  width: 165px;
  height: ${props => props.height || '100px'}
  outline: none;
  border: none;
  margin: 5px 5px 5px 0;
  border-radius: 4px;
  transition: 0.1s;

  color: white;
  background: ${props => props.background || '#E2E4E6'}

  &:hover {
    filter: brightness(80%);
  }
`
export default ButtonCard
