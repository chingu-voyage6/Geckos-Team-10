import styled, { css } from 'styled-components'

const Title = styled.span`
  line-height: 24px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 8px;
  margin-left: 8px;
  text-align: left;
  display: block;
  position: relative;
  color: black;
  z-index: 3;

  ${props => props.black && css` color: black;`}
  ${props => props.light_grey && css` color: #838C91;`}
  ${props => props.small && css`
    font-size: 10px !important;
    font-weight: 500 !important;
  `}
`

export default Title
