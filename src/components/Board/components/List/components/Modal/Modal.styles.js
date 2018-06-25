import styled from 'styled-components'

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  position: absolute;
  width: 200px;
  right: -175px;
  top: 30px;
  z-index: 1;
`

const Button = styled.button`
  color: #000;
  height: 50px;
  width: 100%;
  cursor: pointer;
  outline: none;
  background-color: #fff0;
  border: none;
  :hover {
    background-color: #ccc;
  }
`

export {
  ModalContainer,
  Button
}
