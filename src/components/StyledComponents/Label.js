import styled from 'styled-components'

const Label = styled.label`
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  margin: ${props => props.marginBottom || 'initial'};
  width: 100%;
`

export default Label
