import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from 'carbon-react/lib/components/menu';
import Profile from 'carbon-react/lib/components/profile';
import { AzureAD } from 'react-aad-msal';
import StyledUserMenu from './user-menu.style';
import authProvider from '../../../../azure/authProvider';

const UserMenu = ({ auth }) => {
  return (
    <AzureAD provider={ authProvider }>{
      ctx => (
        <StyledUserMenu>
          { authRenderedContent(auth, ctx)}
        </StyledUserMenu>
      )}
    </AzureAD>
  );
};

function authRenderedContent({ isAuth, account }, ctx) {
  if (isAuth === false) return null;

  const submenu = (
    <Profile
      email=''
      name={ account.name }
      size='S'
    />
  );

  return (
    <Menu>
      <MenuItem submenu={ submenu }>
        <MenuItem href='#'> View Profile</MenuItem>
        <MenuItem href='#' onClick={ ctx.logout }>Logout</MenuItem>
      </MenuItem>
    </Menu>
  );
}

UserMenu.propTypes = {
  auth: PropTypes.object
};

export default UserMenu;
