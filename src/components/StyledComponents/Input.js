import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  padding: 6px 8px;
  display: block;
  box-sizing: border-box;

  background: #e2e4e6;

  ${props => (props.wide ? 'width: 100%' : 'width: 250px')}
`

export default Input
