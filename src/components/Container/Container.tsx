import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  color: ${props => props.theme.colors.primary};

  @media only screen and (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 750px;
  }

  @media only screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 970px;
  }

  @media only screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1700px;
  }
`;

interface IProps {
  tagName?: 'section' | 'article' | 'div';
}

export const Container: React.FC<IProps> = ({ tagName = 'section', children }) => (
  <StyledContainer as={tagName}>{children}</StyledContainer>
);
