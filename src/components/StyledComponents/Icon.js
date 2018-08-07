import styled, { css } from 'styled-components'

const Icon = styled.span`
width: 20px;
pointer-events: none;

color: ${props => props.color || '#DDDDDD'};

${props => props.dark && css`
  color: #DDDDDD;

  &:hover {
    color: #808080 !important;
  }
`}

${props => props.grey && css` color: grey;`}
${props => props.center && css`
  margin: auto;
  display: block;
`}
${props => props.medium && css`font-size: 20px; height: 20px; padding: 6px;`}
${props => props.active && css`
  color: #0179BF;
  background: #E4F0F6;

  &:hover {
    background: #E4F0F6;
  }
`}
${props => props.active_white && css`color: white;`}
`

export default Icon
