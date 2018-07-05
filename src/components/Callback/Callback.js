import React from 'react'
import styled, { keyframes } from 'styled-components'

const SpinnerContainer = styled.div`
  align-items: center
  background: radial-gradient(#40404b, #111118) rgba(34,34,40,0.94);
  display: flex
  flex-direction: column
  justify-content: center
  margin: 0rem
  min-height: 100vh
  min-width: 100vw
  padding: 0rem
`

const rotate360 = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 8px solid #1e1f21;
  border-left-color: #2ecc71
  border-radius: 50%
  width: 100px;
  height: 100px;
  animation: ${rotate360} 1s linear infinite;
`


const Callback = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)

export default Callback
