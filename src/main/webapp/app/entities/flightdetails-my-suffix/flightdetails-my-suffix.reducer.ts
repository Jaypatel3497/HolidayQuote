import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IFlightdetailsMySuffix, defaultValue } from 'app/shared/model/flightdetails-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_FLIGHTDETAILS_LIST: 'flightdetails/FETCH_FLIGHTDETAILS_LIST',
  FETCH_FLIGHTDETAILS: 'flightdetails/FETCH_FLIGHTDETAILS',
  CREATE_FLIGHTDETAILS: 'flightdetails/CREATE_FLIGHTDETAILS',
  UPDATE_FLIGHTDETAILS: 'flightdetails/UPDATE_FLIGHTDETAILS',
  DELETE_FLIGHTDETAILS: 'flightdetails/DELETE_FLIGHTDETAILS',
  RESET: 'flightdetails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFlightdetailsMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FlightdetailsMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: FlightdetailsMySuffixState = initialState, action): FlightdetailsMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FLIGHTDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLIGHTDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FLIGHTDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_FLIGHTDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_FLIGHTDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FLIGHTDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLIGHTDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_FLIGHTDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_FLIGHTDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_FLIGHTDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHTDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHTDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FLIGHTDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_FLIGHTDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FLIGHTDETAILS):
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

const apiUrl = SERVER_API_URL + '/api/flightdetails';

// Actions

export const getEntities: ICrudGetAllAction<IFlightdetailsMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FLIGHTDETAILS_LIST,
  payload: axios.get<IFlightdetailsMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFlightdetailsMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FLIGHTDETAILS,
    payload: axios.get<IFlightdetailsMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFlightdetailsMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FLIGHTDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFlightdetailsMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FLIGHTDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFlightdetailsMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FLIGHTDETAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
