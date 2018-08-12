import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  height: 34px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  padding: 4px 0;

  background: ${props => props.background || 'grey'};
  box-shadow: 0 1px 1px rgba(0,0,0,.1);

  ${props => props.offset && css`
    margin-left: 280px;
    z-index: -1;
  `}
`

const RowItem = styled.div`
  ${props => props.pull_right && css`
    margin-left: auto;
  `}
`

const Icon = styled.span`
  font-size: 20px;
  height: 20px;
  width: 20px;
  padding: 6px;
  
  color: white;
`

const Brand = styled.div`
  position: absolute;
  left: 45%;
  height: 35px;
  vertical-align: middle;
  ${props => props.pretty && css`
    text-decoration: none;
  `}
`

const Input = styled.input`
  width: 210px;
  border-radius: 3px;
  margin: 0 5px 0 5px;
  transition: background .3s ease;
  border: none;

  background: ${props => props.background || 'grey'};
  
  &:hover {
    transition: 0.3s;
    background: ${props => props.hover || 'grey'}
  }
`

const Button = styled.button`
  cursor: pointer;
  font-weight: 700;
  margin: 0 0 0 5px;
  border-radius: 4px;
  transition: 0.3s;
  outline: none;
  border: none;

  color: white;
  background: ${props => props.background || 'grey'};

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

  &:hover {
    transition: 0.3s;
    background: ${props => props.hover || 'grey'}
  }
`

const Avatar = styled.img`
  border-radius: inherit;
  height: inherit;
  width: inherit;
`

export {
  Avatar,
  Wrapper,
  RowItem,
  Brand,
  Input,
  Icon,
  Button
}
