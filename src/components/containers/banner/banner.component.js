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
import { createAchievement } from '../../../store/actions/achievements';

const Banner = ({ auth, logAchievement }) => {
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
      <LogAchievement
        logAchievement={ logAchievement } open={ open }
        onClose={ () => setOpen(false) }
      />
    </>
  );
};

Banner.propTypes = {
  auth: PropTypes.object,
  logAchievement: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logAchievement: achievement => dispatch(createAchievement(achievement))
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);

/* <Button
  to='' renderRouterLink={ routerProps => <RouterLink { ...routerProps } /> }
  buttonType='primary'
></Button> */
