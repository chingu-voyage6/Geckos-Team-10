import styled from 'styled-components'

const Button = styled.button`
  padding: 0 5px;
  background-color: #fff0;
  color: #909090;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  :hover {
    background-color: #ccc
    color: #000;
  }
`

const Label = styled.label`
  width: 100%;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`

const ListHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  margin-bottom: 5px;
  position: relative;
`

export {
  Button,
  Label,
  ListHeaderContainer
}
