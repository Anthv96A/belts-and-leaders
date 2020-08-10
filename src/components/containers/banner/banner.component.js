import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'carbon-react/lib/components/tabs';
import Button from 'carbon-react/lib/components/button';
import { Link as RouterLink } from 'react-router';
import {
  BannerWrapper, InternalWrapper, TextWrapper
} from './banner.style';
import Leaderboard from '../leaderboard';

const Banner = ({ authenticated }) => {
  return (
    <BannerWrapper>
      <InternalWrapper>
        <TextWrapper>Welcome { authenticated && 'James' }</TextWrapper>
        { !authenticated && (
          <Button
            to='' renderRouterLink={ routerProps => <RouterLink { ...routerProps } /> }
            buttonType='primary'
          >
            Log In
          </Button>
        ) }
        { authenticated && <Button buttonType='primary'>Log Achievement</Button> }

      </InternalWrapper>
      <Tabs>
        <Tab title='Leaderboard' tabId='leaderboard'>
          <Leaderboard />
        </Tab>
        { authenticated && (
          <Tab title='Profile' tabId='profile'>
            profile
          </Tab>
        )}
      </Tabs>
    </BannerWrapper>
  );
};

Banner.propTypes = {
  authenticated: PropTypes.bool
};

export default Banner;
