import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  border-radius: 3px;
  border: 1px solid #d6dadc;
  box-shadow: 0 1px 6px rgba(0,0,0,.15);
  overflow: hidden;
  position: absolute;
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  top: 45px;
  right: 5px;
  width: 304px;
  z-index: 99;
  padding: 10px;

  background: #fff;
  border-bottom-color: #c4c9cc;
`

const Header = styled.div`
  border-bottom: 1px solid #DDDDDD;
  text-align: center;
  padding: 11px 13px;
  height: 18px;
  width: 100%

  color: #A1A1A1;
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

const Pill = styled.div`
  display: block;
  width: 100%;
`

export {
  Avatar,
  Wrapper,
  Header,
  Button,
  Pill
}
