import styled, { css } from 'styled-components'

const Icon = styled.span`
width: 20px;

color: white;

${props => props.grey && css` color: grey;`}
${props => props.medium && css`font-size: 20px; height: 20px; padding: 6px;`}
${props => props.active && css`
  color: #0179BF !important;
  background: #E4F0F6;

  &:hover {
    background: #E4F0F6;      
  }
`}
`

export default Icon
