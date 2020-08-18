import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './logo';
import { StyledNavBar, NavChildWrapper } from './nav-bar.style';
import UserMenu from './user-menu';

const NavBar = ({ auth }) => {
  return (
    <StyledNavBar>
      <NavChildWrapper align='left'>
        <Logo />
        Security Champions
      </NavChildWrapper>
      <NavChildWrapper align='right'>
        <UserMenu auth={ auth } />
      </NavChildWrapper>
    </StyledNavBar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

NavBar.propTypes = {
  auth: PropTypes.object
};

export default connect(mapStateToProps)(NavBar);
