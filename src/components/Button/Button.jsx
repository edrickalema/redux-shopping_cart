import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
    background: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    text-transform: capitalize;
`
function Button({action, text}) {
  return (
    <ButtonWrapper onClick={action}>{text}</ButtonWrapper>
  )
}

export default Button