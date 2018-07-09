import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
`

const Card = styled.button`
  cursor: pointer;
  text-align: left;
  padding: 8px;
  width: 165px;
  height: 100px;
  outline: none;
  border: none;
  margin: 5px 5px 5px 0;
  border-radius: 4px;
  transition: 0.1s;
  color: white;

  &:hover {
    filter: brightness(80%);
  }
`

const CardTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  display: block;
  padding-bottom: 60px;
  overflow: hidden;
`
const CardWrapper = styled.div`
  z-index: 100;
  margin: 5px 5px 5px 0;
  border-radius: 4px;

  &:hover {
    background-color: black !important;
  }
`

export {
  Wrapper,
  Card,
  CardTitle,
  CardWrapper,
}
