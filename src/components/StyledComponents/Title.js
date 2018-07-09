import styled, { css } from 'styled-components'

const Title = styled.span`
  line-height: 24px;
  margin: 3px 0 0;
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
  display: block;
  width: 100%;


  ${props => props.light_grey && css` color: #838C91;`}
  ${props => props.small && css`
    font-size: 10px !important;
    font-weight: 500 !important;
  `}
`

export default Title
