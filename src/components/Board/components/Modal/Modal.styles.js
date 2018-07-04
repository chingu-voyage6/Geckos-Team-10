import styled from 'styled-components'

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 10px;
  min-height: 50px;
  border-radius: 5px;
  resize: none;
  outline: none;
  margin: 2px;
`

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
  TextArea,
  ModalContainer,
  ModalColumn,
  ModalColumnContainer
}
