import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.flex ? 'flex' : 'block')};
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0'}
  ${props => props.align && css`align-items: center;`}
`

export default Wrapper
