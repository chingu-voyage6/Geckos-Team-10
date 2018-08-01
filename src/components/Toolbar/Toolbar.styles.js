import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  height: 32px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  padding: 4px 0;

  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  background: #FFFFCC;

  ${props => props.offset && css`
    margin-left: 280px;
    z-index: -1;
  `}
`

const RowItem = styled.div`
  ${props => props.pull_right && css`
    margin-left: auto;
  `}
`

const Icon = styled.span`
  font-size: 20px;
  height: 20px;
  width: 20px;
  padding: 6px;
  
  color: white;
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
  width: 210px;
  border-radius: 3px;
  margin: 0 5px 0 5px;
  border: none;
`

const Button = styled.button`
  cursor: pointer;
  font-weight: 700;
  margin: 0 5px 0 5px;
  border-radius: 4px;
  outline: none;
  border: none;

  color: white;

  ${props => props.pull_right && css`
    margin-left: auto;
  `}

  ${props => props.avatar && css`
    border-radius: 25em;
    height: 32px;
    width: 32px;
    padding: 0;
    border: none;
  `}
`

const Avatar = styled.img`
  border-radius: inherit;
  height: inherit;
  width: inherit;
`

export {
  Avatar,
  Wrapper,
  RowItem,
  Brand,
  Input,
  Icon,
  Button
}
