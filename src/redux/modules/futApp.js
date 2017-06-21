
import fetch from 'isomorphic-fetch';

export const POST_URL         = 'fut/futApp/POST_URL';
export const POST_URL_RECEIVE = 'fut/futApp/POST_URL_RECEIVE';
export const POST_URL_ERROR   = 'fut/futApp/POST_URL_ERROR';

export const CHANGE_URL       = 'fut/futApp/CHANGE_URL';
export const CHANGE_FILTER    = 'fut/futApp/CHANGE_FILTER';
export const CHANGE_SELECTOR  = 'fut/futApp/CHANGE_SELECTOR';

export const FILTER           = 'fut/futApp/FILTER';
export const FILTER_DONE      = 'fut/futApp/FILTER_DONE';
export const FILTER_LIMIT     = 'fut/futApp/FILTER_LIMIT';

export const ERROR = 'fut/futApp/ERROR';

const serverApiUrls = '/api/urls';

export function onChangeUrl (value) {
  return {
    type: CHANGE_URL,
    value
  }
}

export function onChangeSelector (value) {
  return {
    type: CHANGE_SELECTOR,
    value
  }
}

export function onChangeFilter (value) {
  return {
    type: CHANGE_FILTER,
    value
  }
}

function _urlPost (url) {
  return {
    type: POST_URL,
    url
  }
}

function _urlPostReceive (url, json) {
  return {
    type: POST_URL_RECEIVE,
    url,
    data: json
  }
}

function _urlPostError (url, message) {
  return {
    type: POST_URL_ERROR,
    url,
    error: message
  }
}

export function urlPost () {
  return function (dispatch, getState) {
    let url = getState().futApp.url;
    dispatch(_urlPost(url));
    return fetch(serverApiUrls, {
        method: 'POST',
        body: JSON.stringify({
          url
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw makeError(response);
      })
      .then((json) => {
        dispatch(_urlPostReceive(url, json)); 
      })
      .catch((err) => {
        return dispatch(_urlPostError(url, err));
      })
  }
}

export function _error (code, message) {
  return {
    code,
    type: 'ERROR',
    error: message
  }
}

function makeError (responseOrNetError) {
  if (responseOrNetError instanceof Response) {
    var e0 = new Error(responseOrNetError.statusText || 'Error');
    e0.status = responseOrNetError.status;
    return e0;
  }
  return responseOrNetError;
}

function _filter () {
  return {
    type: FILTER
  }
}

function _filter_done (result) {
  return {
    type: FILTER_DONE,
    result
  }
}

function _filter_limit (count) {
  return {
    type: FILTER_LIMIT,
    count
  }
}

export function asyncFilter (selection) {
  return function (dispatch, getState) {
    var regex = getState().futApp.filter || '';
    dispatch(_filter());
    if (!selection) {
      return dispatch(_filter_done('No Filter'));
    }
    var rx;
    var res = []

    try {
      rx = new RegExp(regex, 'gim');
    } catch (e1) {
      // TODO handle regex error
      return dispatch(_filter_limit(0));
    }

    function loop (selection, res, count) {
      if (count > 10) {
        dispatch(_filter_done(res.join('\n')));
        return dispatch(_filter_limit(count));
      }
      var m = rx.exec(selection)
      if (m === null) {
        if (res.length === 0) {
          return dispatch(_filter_done('No matches'));
        }
        return dispatch(_filter_done(res.join('\n')));
      }
      // console.warn('loop', m, rx, rx.lastIndex, res, count);
      // Handle one capture group
      if (m[1]) {
        res.push(m[1])
      } else if (m[0]) {
        res.push(m[0])
      }
      setTimeout(function () {
        loop(selection, res, count + 1);
      }, 1);
    }
    loop(selection, res, 0);
  }
}

const initialState = {}

// reducer
// TODO immutable
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // URL
    case POST_URL:
      return Object.assign({}, state, {isFetching: true})
    case POST_URL_RECEIVE:
      return Object.assign({}, state, {isFetching: false, data: action.data});
    case POST_URL_ERROR:
      return Object.assign({}, state, {isFetching: false, error: action.error});
    // More generic changes
    case CHANGE_URL:
      return Object.assign({}, state, {url: action.value})
    case CHANGE_SELECTOR:
      return Object.assign({}, state, {selector: action.value});
    case CHANGE_FILTER:
      return Object.assign({}, state, {filter: action.value});
    // Async regex filter to handle .* well
    case FILTER:
      return Object.assign({}, state, {isFiltering: true});
    case FILTER_DONE:
      return Object.assign({}, state, {isFiltering: false, filtered: action.result});
    case FILTER_LIMIT:
      return Object.assign({}, state, {count: action.count, isFiltering: false});
    // Generic error
    case ERROR:
      return Object.assign({}, state, {
        error: action.error,
        code: action.code || 'bad'
      });
    default:
      return state;
  }
}

