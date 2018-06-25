import styled from 'styled-components'

const ListFooterContainer = styled.div`
  width: 100%;
`

const Button = styled.button`
  cursor: pointer;
  width: ${props => props.width || '100%'};
  text-align: center;
  background-color: ${props => props.backgroundColor || '#fff0'};
  border: none;
  height: 30px;
  border-radius: 5px;
  margin-top: 5px;
  outline: none;
  color: ${props => props.color || '#909090'};
  font-weight: 600;
  :hover {
    background-color: ${props => props.backgroundColorHover || '#ccc'};
    color: ${props => props.colorHover || '#000'};
  }
`

export {
  Button,
  ListFooterContainer
}
