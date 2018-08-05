import styled from 'styled-components'

const Button = styled.button`
  background-color: ${props => props.backgroundColor || '#fff0'};
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || '2px'};
  color: ${props => props.color || '#909090'};
  cursor: pointer;
  font-weight: 600;
  height: ${props => props.height || '30px'};
  margin: ${props => props.margin || '0px'};
  text-align: ${props => props.textAlign || 'center'};
  top: ${props => props.positionTop || 'initial'};
  outline: none;
  padding: ${props => props.margin || '0 5px'};
  position: ${props => props.position || 'initial'};
  right: ${props => props.positionRight || 'initial'};
  width: ${props => props.width || '100%'};
  :hover {
    background-color: ${props => props.hoverBackgroundColor || '#ccc'};
    color: ${props => props.hoverColor || '#000'};
  }
`

export default Button
