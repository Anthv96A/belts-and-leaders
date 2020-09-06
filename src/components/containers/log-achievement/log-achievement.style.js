import styled, { css } from 'styled-components';
import StyledInputPresentation from 'carbon-react/lib/__experimental__/components/input/input-presentation.style';

const StyledHeading = styled.h2`
  color: #394252;
  font-size: 20px;
  line-height: 32px;
`;

const StyledInlineWrapper = styled.div`
  ${({ align }) => css`
    ${!align && css`
      display: inline-flex;
      width: 100%;
      padding 28px 0px;
    `}

    ${align === 'left' && css`
      width: 70%;
      padding-right: 4px;
    `}

    ${align === 'right' && css`
      width: 30%;
      padding-left: 4px;
      
      ${StyledInputPresentation} {
        width: 100%;
      }
    `}
  `}
`;

export { StyledHeading, StyledInlineWrapper };
