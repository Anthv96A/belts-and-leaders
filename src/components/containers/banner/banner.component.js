import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'carbon-react/lib/components/tabs';
import Button from 'carbon-react/lib/components/button';
import { connect } from 'react-redux';
import { AzureAD } from 'react-aad-msal';
import {
  BannerWrapper, InternalWrapper, TextWrapper
} from './banner.style';
import Leaderboard from '../leaderboard';
import authProvider from '../../../azure/authProvider';
import LogAchievement from '../log-achievement';
import UserProfile from '../user-profile';

const Banner = ({ auth }) => {
  const [open, setOpen] = useState(false);

  const displayText = (auth.isAuth && auth.account.name)
    ? `back to Belts and Leaders ${auth.account.name}!`
    : 'to Belts & Leaders, our security champion achievement league!';

  const loginOrLogAchievement = (auth.isAuth)
    ? <Button onClick={ () => setOpen(true) } buttonType='primary'>Log Achievement</Button>
    : <AzureAD provider={ authProvider }>{({ login }) => <Button onClick={ login } buttonType='primary'>Sign In</Button> }</AzureAD>;

  return (
    <>
      <BannerWrapper>
        <InternalWrapper>
          <TextWrapper>Welcome { displayText }</TextWrapper>
          {loginOrLogAchievement}
        </InternalWrapper>
        <Tabs>
          <Tab title='Leaderboard' tabId='leaderboard'>
            <Leaderboard />
          </Tab>
          { auth.isAuth && (
            <Tab title='Profile' tabId='profile'>
              <UserProfile name={ auth.account.name } />
            </Tab>
          )}
        </Tabs>
      </BannerWrapper>
      <LogAchievement open={ open } onClose={ () => setOpen(false) } />
    </>
  );
};

Banner.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Banner);

/* <Button
  to='' renderRouterLink={ routerProps => <RouterLink { ...routerProps } /> }
  buttonType='primary'
></Button> */
