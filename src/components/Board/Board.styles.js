import styled from 'styled-components'

const ListContainer = styled.div`
  overflow-x: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
`

const BoardContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  height: 100vh;
`

const BackgroundFilter = styled.div`
  filter: brightness(90%);
  position: relative;
  height: 100%;
  width: 100%;
`

export {
  BackgroundFilter,
  BoardContainer,
  ListContainer,
}
