import streams from '../apis/streams';
import history from '../history';
import {
  CREATE_QUERY,
  ADD_PAST_QUERIES,
  INITIALIZE_QUERY_SEARCH,
  FETCH_QUERIES
} from './types';


export const initializeQuerySearch = query => async (dispatch, getState) => {
  dispatch({ type: INITIALIZE_QUERY_SEARCH, payload: query });
};

export const createQuery = formValues => async (dispatch, getState) => {
  const response = await streams.post('/queries', { ...formValues });
  dispatch({ type: CREATE_QUERY, payload: response.data.result });
  dispatch({ type: ADD_PAST_QUERIES, payload: formValues });
  history.push('/');
};

export const fetchQueries = () => async dispatch => {
  const response = await streams.get('/queries');
  dispatch({ type: FETCH_QUERIES, payload: response.data });
}
