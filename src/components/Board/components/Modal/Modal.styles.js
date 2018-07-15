import styled from 'styled-components'

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #a9a9a9;
  outline: none;
  width: 50%;
`

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
  margin: 2px;
`
const ModalColumnContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row nowrap;
`
const ModalColumn = styled.div`
  display: flex;
  flex-grow: ${props => props.flexGrow || '1'};
  flex-direction: column;
  input {
    border-radius: 5px;
    border: 1px solid #a9a9a9;
    height: 20px;
    padding: 2px;
    outline: none;
  }
`

const AddTagContainerMenu = styled.div`
  position: relative;
`

export {
  Input,
  TextArea,
  ModalContainer,
  ModalColumn,
  ModalColumnContainer,
  AddTagContainerMenu
}
