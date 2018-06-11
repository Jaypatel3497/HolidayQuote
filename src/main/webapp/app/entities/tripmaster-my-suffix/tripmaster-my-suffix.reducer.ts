import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITripmasterMySuffix, defaultValue } from 'app/shared/model/tripmaster-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TRIPMASTER_LIST: 'tripmaster/FETCH_TRIPMASTER_LIST',
  FETCH_TRIPMASTER: 'tripmaster/FETCH_TRIPMASTER',
  CREATE_TRIPMASTER: 'tripmaster/CREATE_TRIPMASTER',
  UPDATE_TRIPMASTER: 'tripmaster/UPDATE_TRIPMASTER',
  DELETE_TRIPMASTER: 'tripmaster/DELETE_TRIPMASTER',
  RESET: 'tripmaster/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITripmasterMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TripmasterMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TripmasterMySuffixState = initialState, action): TripmasterMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRIPMASTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRIPMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRIPMASTER):
    case REQUEST(ACTION_TYPES.UPDATE_TRIPMASTER):
    case REQUEST(ACTION_TYPES.DELETE_TRIPMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRIPMASTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRIPMASTER):
    case FAILURE(ACTION_TYPES.CREATE_TRIPMASTER):
    case FAILURE(ACTION_TYPES.UPDATE_TRIPMASTER):
    case FAILURE(ACTION_TYPES.DELETE_TRIPMASTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIPMASTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIPMASTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRIPMASTER):
    case SUCCESS(ACTION_TYPES.UPDATE_TRIPMASTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRIPMASTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/tripmasters';

// Actions

export const getEntities: ICrudGetAllAction<ITripmasterMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRIPMASTER_LIST,
  payload: axios.get<ITripmasterMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITripmasterMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRIPMASTER,
    payload: axios.get<ITripmasterMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITripmasterMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRIPMASTER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITripmasterMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRIPMASTER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITripmasterMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRIPMASTER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
