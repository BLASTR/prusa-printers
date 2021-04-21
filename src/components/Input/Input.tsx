import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const StyledInput = styled.input`
  border: 1px solid ${props => props.theme.colors.brand};
  width: 100%;
  padding: 12px 10px;
  box-shadow: none;
  background-color: ${props => props.theme.colors.gray['300']};
  appearance: none;
`;

export const Input: React.FC<IProps> = ({ name, type = 'text', label, ...restParams }) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <StyledInput id={name} type={type} name={name} {...restParams} />
  </div>
);
