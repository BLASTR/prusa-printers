import React from 'react';
import styled from 'styled-components';

interface IProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  theme?: 'link' | 'button';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const StyledButton = styled.button`
  display: block;
  padding: 8px 20px;
  background-color: ${props => props.theme.colors.brand};
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: ${props => props.theme.colors.white};

  &:hover {
    opacity: 0.9;
  }
`;

const StyledLink = styled.button`
  color: ${props => props.theme.colors.brand};
  text-decoration: none;
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button: React.FC<IProps> = ({
  theme = 'button',
  onClick,
  type = 'button',
  children,
}) => (
  <>
    {theme === 'button' ? (
      <StyledButton type={type} onClick={onClick}>
        {children}
      </StyledButton>
    ) : (
      <StyledLink type={type} onClick={onClick}>
        {children}
      </StyledLink>
    )}
  </>
);
