import styled, { css } from 'styled-components';
import StyledIcon from 'carbon-react/lib/components/icon/icon.style';
import { ProfileDetailsStyle } from 'carbon-react/lib/components/profile/profile.style';

const StyledProfileWrapper = styled.div`
  padding: 116px 0px;
`;

const StyledProfile = styled.div`
  top: -72px;
  left: 20px;
  width: 25%;
  position: relative;
  
  ${ProfileDetailsStyle} {
    margin-top: -40px;
  }
`;

const EditableUserPanel = styled.div`
  padding: 0px 8px;
  width: 98%;
  display: inline-flex;
  outline: 1px solid #D8D9DC;

  ${StyledIcon} {
    cursor: pointer;
    top: 8px;
  }
`;

const EditableWrapper = styled.div`
  position: relative;
  left: -24px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Information = styled.div`
  width: 20%;
  min-width: 180px;
  box-sizing: content-box;
  display: inline-block;
  float: left;
`;

const Statistics = styled.div`
  width: 100%;
`;

const InfoText = styled.p`
  color: #636872;
  font-family: Lato;
  font-size: 16px;
  line-height: 16px;
  text-align: ${({ align }) => `${align};`}
`;

const StatText = styled.p`
  ${({ color }) => css`
    ${color && css`
      color: ${color};
      -webkit-text-stroke: 1px ${color === 'black' ? 'white;' : 'black;'}
      -webkit-text-fill-color: ${color};
    `}
    ${!color && css`
      color: rgba(59, 66, 80, 0.8);
    `}
  `}
  font-family: Lato;
  font-size: 28px;
  line-height: 24px;
`;

const StatPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  float: right;
  width: 80%;
`;

const Stat = styled.div`
  width: 30%;
  text-align: center;
`;

export {
  StyledProfileWrapper,
  StyledProfile,
  EditableUserPanel,
  EditableWrapper,
  Information,
  Statistics,
  InfoText,
  StatText,
  StatPanel,
  Stat
};
