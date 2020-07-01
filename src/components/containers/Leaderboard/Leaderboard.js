import React, { useReducer, useEffect } from 'react';
import Loader from 'carbon-react/lib/components/loader';
import { connect } from 'react-redux';
import { retrieveUsers } from '../../../store/actions/index';
import * as types from '../../../store/types/index';

const initialState = {
  isLoading: false,
  error: null
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case types.FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    default:
      return state;
  }
};

const Leaderboard = ({ users, getUsersAsync }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: types.LOADING });
        await getUsersAsync();
        dispatch({ type: types.SUCCESS });
      } catch (error) {
        dispatch({ type: types.FAILED, payload: { error } });
      }
    })();
  }, [getUsersAsync]);

  const spinner = state.isLoading ? (<Loader isActive size='large' />) : null;
  const style = { margin: '0px' };
  const content = !state.error ? <ul style={ style }>{users.map(u => <li key={ u.id }>{u.name}</li>)}</ul> : <p>{state.error}</p>;

  return (
    <div>
      {spinner}
      {content}
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsersAsync: () => dispatch(retrieveUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
