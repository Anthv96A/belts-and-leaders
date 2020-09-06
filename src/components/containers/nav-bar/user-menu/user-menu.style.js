import styled from 'styled-components';
import { StyledMenuWrapper } from 'carbon-react/lib/components/menu/menu.style';

const StyledUserMenu = styled.div`
  position: absolute;
  right: 0px;
  top: -1px;
  padding-top: 2px;
  padding-right: 2px;

  ${StyledMenuWrapper} {
    position: relative;
    top: -2px;
  }
`;

export default StyledUserMenu;
