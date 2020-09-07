import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Profile from 'carbon-react/lib/components/profile';
import Icon from 'carbon-react/lib/components/icon';
import {
  StyledProfileWrapper,
  StyledProfile,
  EditableUserPanel,
  Information,
  Statistics,
  InfoText,
  StatText,
  EditableWrapper,
  StatPanel,
  Stat
} from './user-profile.style';

const UserProfile = ({ name }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <StyledProfileWrapper>
      <EditableUserPanel>
        <div style={ { display: 'block', height: '100px' } }>
          <StyledProfile>
            <Profile
              email=''
              name={ name }
              size='XXL'
            />
          </StyledProfile>
        </div>
        <EditableWrapper>
          <Statistics>
            <Information>
              <InfoText align='left'>Contact: foo</InfoText>
              <InfoText align='left'>Specialist area: foo bar</InfoText>
              <InfoText align='left'>Time as champion: 1 year</InfoText>
            </Information>
            <StatPanel>
              <Stat>
                <InfoText align='center'>Rank:</InfoText>
                <StatText>1st</StatText>
              </Stat>
              <Stat>
                <InfoText align='center'>Belt:</InfoText>
                <StatText color='white'>white</StatText>
              </Stat>
              <Stat>
                <InfoText align='center'>Maturity Level:</InfoText>
                <StatText>25</StatText>
              </Stat>
            </StatPanel>
          </Statistics>
        </EditableWrapper>
        { !editMode && <Icon type='edit' onClick={ () => setEditMode(true) } /> }
        { editMode && <Icon type='cross' onClick={ () => setEditMode(false) } /> }
      </EditableUserPanel>
    </StyledProfileWrapper>
  );
};

export default UserProfile;


UserProfile.propTypes = {
  name: PropTypes.string
};
