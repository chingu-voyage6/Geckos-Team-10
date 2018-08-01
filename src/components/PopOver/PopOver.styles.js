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
  width: 304px;
  z-index: 99;
  padding: 10px;

  background: #fff;
  border-bottom-color: #c4c9cc;

  ${props => props.top_right && css`
    top: 45px;
    right: 5px;
  `}
`

export default Wrapper
