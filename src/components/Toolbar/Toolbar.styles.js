import styled, { css } from 'styled-components'

const Wrapper = styled.section`
  width: 100%;
  height: 35px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  padding: 5px 0;
  z-index: 10;

  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  background: #FFFFCC;
`

const Brand = styled.div`
  position: absolute;
  left: 45%;
  height: 35px;
  line-height: 2;
  vertical-align: middle;
  ${props => props.pretty && css`
    text-decoration: none;
  `}
`

const Input = styled.input`
  margin: 0 5px 0 5px;
`

const Button = styled.button`
  cursor: pointer;
  margin: 0 5px 0 5px;
  border-radius: 4px;
  outline: none;
  border: none;

  ${props => props.pull_right && css`
    margin-left: auto;
  `}
`

export {
  Wrapper,
  Brand,
  Input,
  Button
}
