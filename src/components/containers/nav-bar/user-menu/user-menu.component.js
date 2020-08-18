import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from 'carbon-react/lib/components/menu';
import Profile from 'carbon-react/lib/components/profile';
import { AzureAD } from 'react-aad-msal';
import StyledUserMenu from './user-menu.style';
import authProvider from '../../../../azure/authProvider';

const UserMenu = ({ auth }) => {
  return (
    <AzureAD provider={ authProvider }>{ctx => (
      <StyledUserMenu>
        <Menu>
          { authRenderedContent(auth, ctx)}
        </Menu>
      </StyledUserMenu>
    )}
    </AzureAD>
  );
};

function authRenderedContent({ isAuth, account }, ctx) {
  if (isAuth === false) return null;

  const submenu = <Profile name={ account.name } size='S' />;

  return (
    <MenuItem submenu={ submenu }>
      <MenuItem href='#'> View Profile</MenuItem>
      <MenuItem href='#' onClick={ ctx.logout }>Logout</MenuItem>
    </MenuItem>
  );
}

UserMenu.propTypes = {
  auth: PropTypes.object
};

export default UserMenu;
