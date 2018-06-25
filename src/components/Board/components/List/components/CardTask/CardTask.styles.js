import styled from 'styled-components'

const CardTaskContainer = styled.div`
  display: flex;
  padding: 6px 6px 2px 8px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  flex-direction: column;
  cursor: pointer;
  margin: 2px;
  :hover {
    background-color: #edeff0;
    border-bottom-color: #d6dadc;
  }
`

const LineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Label = styled.label`
  margin-bottom: 2px;
  cursor: pointer;
`

const Button = styled.button`
  border: 5px;
  background-color: green;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`

export {
  Button,
  CardTaskContainer,
  Label,
  LineContainer
}
