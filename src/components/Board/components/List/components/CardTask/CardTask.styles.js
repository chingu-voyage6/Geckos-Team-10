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
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Label = styled.label`
  margin-bottom: 2px;
  cursor: pointer;
`

export {
  CardTaskContainer,
  Label,
  LineContainer
}
