import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from 'carbon-react/lib/components/menu';
import Profile from 'carbon-react/lib/components/profile';
import StyledUserMenu from './user-menu.style';

const UserMenu = ({ user }) => {
  if (!user?.name || !user?.email) return null;

  const { name, email } = user;
  return (
    <StyledUserMenu>
      <Menu>
        <MenuItem submenu={ (
          <Profile
            name={ name }
            email={ email }
            size='S'
          />
        ) }
        >
          <MenuItem href='#'>
            View Profile
          </MenuItem>
          <MenuItem href='#'>
            Logout
          </MenuItem>
        </MenuItem>
      </Menu>
    </StyledUserMenu>
  );
};

UserMenu.propTypes = {
  user: PropTypes.object
};

export default UserMenu;
