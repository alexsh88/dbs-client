import {
  CREATE_QUERY,
  ADD_PAST_QUERIES,
  INITIALIZE_QUERY_SEARCH,
  FETCH_QUERIES
} from '../actions/types';

const INITIAL_STATE = {
  pastQueries: [],
  results: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUERIES:
      const fetchedPastQueries = [ ...state.pastQueries, ...action.payload];
      return { ...state, pastQueries: fetchedPastQueries};
    case CREATE_QUERY:
      const results = [...action.payload]
      return { ...state, results };
      case ADD_PAST_QUERIES:
        const mergedPastQueries = [ ...state.pastQueries, action.payload];
      return { ...state, pastQueries: mergedPastQueries};
      case INITIALIZE_QUERY_SEARCH:
        const query = action.payload;
      return { ...state, query};
    default:
      return state;
  }
};
