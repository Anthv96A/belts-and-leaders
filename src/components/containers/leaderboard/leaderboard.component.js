import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'carbon-react/lib/components/loader';
import { connect } from 'react-redux';
import {
  FlatTable, FlatTableHead, FlatTableBody, FlatTableHeader, FlatTableRow, FlatTableCell, Sort
} from 'carbon-react/lib/components/flat-table';
import Pager from 'carbon-react/lib/components/pager';
import { retrieveUsers } from '../../../store/actions';
import * as types from '../../../store/types';
import StyledLeaderBoard from './leaderboard.style';

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

const LeaderBoard = ({ users, getUsersAsync }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortedCol, setSortedCol] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);

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

  const getLeaderBoard = () => {
    const handleClick = (value) => {
      setSortedCol(value);
      setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    };

    const userPropMap = {
      Rank: 'rank', Username: 'name', 'Maturity level': 'maturityLevel', Belt: 'belt'
    };

    const sortByNumber = (items, sortByValue, type) => items.sort((a, b) => {
      const x = a[userPropMap[sortByValue]];
      const y = b[userPropMap[sortByValue]];
      return type === 'asc' ? x - y : y - x;
    });

    const sortByString = (items, sortByValue, type) => items.sort((a, b) => {
      const itemA = a[userPropMap[sortByValue]];
      const itemB = b[userPropMap[sortByValue]];

      if (type === 'asc') return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;

      return (itemA > itemB) ? -1 : (itemA < itemB) ? 1 : 0;
    });

    const leaderBoardData = () => {
      if (['Rank', 'Maturity level'].includes(sortedCol)) return sortByNumber(users, sortedCol, sortBy);
      if (['Username', 'Belt'].includes(sortedCol)) return sortByString(users, sortedCol, sortBy);
      return users;
    };

    const rows = leaderBoardData().map(user => (
      <FlatTableRow key={ user.id }>
        <FlatTableCell>{ user.rank }</FlatTableCell>
        <FlatTableCell>{ user.name }</FlatTableCell>
        <FlatTableCell>{ user.maturityLevel }</FlatTableCell>
        <FlatTableCell>{ user.belt }</FlatTableCell>
      </FlatTableRow>
    ));

    const renderRows = () => {
      const { start, end } = recordsRange;
      if (start < 0) return rows;
      if (end > rows.length) return rows.slice(start, rows.length);
      return rows.slice(start, end);
    };

    const handlePagination = (newPage, newPageSize) => {
      const adjustment = currentPage === newPage ? 0 : newPage - currentPage;
      let start = adjustment > 0 ? recordsRange.start + newPageSize : recordsRange.start - newPageSize;
      start = start < 0 || Math.abs(start - recordsRange.end) > newPageSize ? 0 : start;
      const end = adjustment > 0 ? recordsRange.end + newPageSize : start + newPageSize;
      setRecordsRange({ start, end });
      setCurrentPage(newPage);
    };

    return (
      <>
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              { ['Rank', 'Username', 'Maturity level', 'Belt'].map(headItem => (
                <FlatTableHeader key={ headItem }>
                  <Sort
                    onClick={ () => handleClick(headItem) }
                    sortType={ headItem === sortedCol && sortBy }
                  >
                    { headItem }
                  </Sort>
                </FlatTableHeader>
              ))}
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            { renderRows() }
          </FlatTableBody>
        </FlatTable>
        <Pager
          totalRecords={ rows.length }
          showPageSizeSelection
          pageSize={ 10 }
          currentPage={ currentPage }
          onPagination={ (next, size) => handlePagination(next, size) }
          pageSizeSelectionOptions={ [{ id: '5', name: '5' }, { id: '10', name: '10' }] }
        />
      </>
    );
  };

  return (
    <StyledLeaderBoard>
      { state.isLoading && (<Loader isActive size='large' />) }
      { !state.error && getLeaderBoard() }
    </StyledLeaderBoard>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsersAsync: () => dispatch(retrieveUsers())
});

LeaderBoard.propTypes = {
  users: PropTypes.array,
  getUsersAsync: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
