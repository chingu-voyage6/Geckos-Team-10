import styled from 'styled-components'

const ListContainer = styled.div`
  overflow-x: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  background-color: #7a88b9;
`

const BoardContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  height: 100vh;
`

const CreateListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 50px;
  cursor: pointer;
  background-color: #e2e4e6;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
`

const CreateListFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #e2e4e6;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  width: 270px;
`

const CreateListActions = styled.div`
  width: 100%;
`

const TextArea = styled.input`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 5px;
  resize: none;
  outline: none;
  margin: 2px;
`

export {
  ListContainer,
  BoardContainer,
  CreateListButton,
  CreateListFormContainer,
  CreateListActions,
  TextArea
}
