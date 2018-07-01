import styled from 'styled-components'

const ModalContainer = styled.div`
  background-color: #fff;
  margin: 5px;
`
const ModalColumnContainer = styled.div`
  display: flex;
  flex-direction: row nowrap;
`
const ModalColumn = styled.div`
  display: flex;
  flex-grow: ${props => props.flexGrow || '1'};
  flex-direction: column;
`

export {
  ModalContainer,
  ModalColumn,
  ModalColumnContainer
}
