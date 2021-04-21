import React, { InputHTMLAttributes } from 'react';
import styled from "styled-components";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Label = styled.label`
  cursor: pointer;
  
  input {
    display: none;
  }
`;

const Text = styled.span`
  position: relative;
  padding-left: 26px;
  
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 16px;
    height: 16px;
    border: 1px solid ${props => props.theme.colors.brand};
    border-radius: 2px;
  }
  
  &::before {
    position: absolute;
    top: 3px;
    left: 3px;
    content: '';
    width: 12px;
    height: 12px;
    background-color: ${props => props.theme.colors.brand};
    border-radius: 2px;
    transform: scale(${props => props.checked ? 1 : 0});
    transition: transform 100ms ease-in-out;
  }
`;

export const Checkbox: React.FC<IProps> = ({ name, children, checked, className, ...rest }) => (
  <Label className={className}>
    <input name={name} type="checkbox" {...rest} />
    <Text checked={checked}>{children}</Text>
  </Label>
);
