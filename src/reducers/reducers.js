import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, ADD_MOVIE, DELETE_MOVIE } from '../actions/actions';

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    case ADD_MOVIE:
      return action.value;
    case DELETE_MOVIE:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action),
    user: user(state.user, action)
  }
}

export default moviesApp;