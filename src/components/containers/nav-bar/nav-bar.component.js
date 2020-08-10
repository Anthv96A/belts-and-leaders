import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './logo';
import { StyledNavBar, NavChildWrapper } from './nav-bar.style';
import UserMenu from './user-menu';

const NavBar = ({ user }) => {
  return (
    <StyledNavBar>
      <NavChildWrapper align='left'>
        <Logo />
        CHAWSY
      </NavChildWrapper>
      <NavChildWrapper align='right'>
        <UserMenu user={ user } />
      </NavChildWrapper>
    </StyledNavBar>
  );
};

const mapStateToProps = state => ({
  user: state.users[1] // how do I map to the logged in
});

NavBar.propTypes = {
  user: PropTypes.object // add the shape
};

export default connect(mapStateToProps)(NavBar);
