import styled from 'styled-components'

const Heading = styled.div`
  border-bottom: 1px solid #DDDDDD;
  text-align: center;
  padding: 11px 0 13px 0;
  height: 18px;
  width: 100%

  color: ${props => props.color || '#A1A1A1'};
`

export default Heading
