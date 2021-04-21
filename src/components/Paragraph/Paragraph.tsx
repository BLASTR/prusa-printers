import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-size: 1.125rem;
`;

export const Paragraph: React.FC = ({ children }) => <StyledParagraph>{children}</StyledParagraph>;
