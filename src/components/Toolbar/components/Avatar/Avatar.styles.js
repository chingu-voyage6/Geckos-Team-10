import styled, { css } from 'styled-components'

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

const Img = styled.img`
  border-radius: inherit;
  height: inherit;
  width: inherit;
`

export { Img, Button }
