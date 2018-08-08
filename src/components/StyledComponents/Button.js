import styled, { css } from 'styled-components'

const Button = styled.button`
  background-color: ${props => props.backgroundColor || '#fff0'};
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || '2px'};
  color: ${props => props.color || '#909090'};
  cursor: pointer;
  font-weight: 600;
  height: ${props => props.height || '30px'};
  margin: ${props => props.margin || '0px'};
  text-align: ${props => props.textAlign || 'center'};
  top: ${props => props.positionTop || 'initial'};
  outline: none;
  padding: ${props => props.margin || '0 5px'};
  position: ${props => props.position || 'initial'};
  right: ${props => props.positionRight || 'initial'};
  width: ${props => props.width || '100%'};
  :hover {
    background-color: ${props => props.hoverBackgroundColor || '#EDEFF0'};
    color: ${props => props.hoverColor || 'black'};
  }

  ${props => props.pull_right && css`margin-left: auto;`}
  ${props => props.bold && css`font-weight: bold;`}

  ${props => props.small && css`
    text-align: center !important;
    width: 75px !important;
    margin: 0 5px 0 0 !important;
  `}

  ${props => props.solid && css`
    background: #e2e4e6 !important;
    box-shadow: 0 1px 0 0 #c4c9cc;
    
    &:hover {
      background: #cdd2d4 !important;
      box-shadow: 0 1px 0 0 #a5acb0;
      color: #4c4c4c;
    }
  `}

  ${props => props.active && css`
    color: #0179BF !important;
    background: #E4F0F6;

    &:hover {
      background: #E4F0F6;      
    }
  `}

  ${props => props.danger && css`
    background: #eb5a46 !important;
    border-bottom-color: #b04632 !important;
    color: #fff !important;
    box-shadow: none;
    transition: background .3s ease;

    &:hover {
      background: #D0513D !important;
    }
  `}

  ${props => props.submit && css`
    background: #5aac44 !important;
    color: #fff !important;
    box-shadow: none;
    transition: background .3s ease;

    &:hover {
      background: #519839 !important;
    }
  `}
`

export default Button
