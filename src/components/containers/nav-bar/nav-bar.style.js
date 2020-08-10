import styled from 'styled-components';

const StyledNavBar = styled.div`
  min-height: 40px;
  background-color: #E6EBED;
  border-bottom: 1px solid #E6EBED;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.09);
  display: flex;
`;

const NavChildWrapper = styled.div`
  position: relative;
  background-color: #E6EBED;
  ${({ align }) => (align === 'left') && `
    padding 0px 40px;
    display: flex;
    align-items: center;
  `}
  min-height: 40px;
  width: 50%;
  font-weight: 700;
`;

export { StyledNavBar, NavChildWrapper };
