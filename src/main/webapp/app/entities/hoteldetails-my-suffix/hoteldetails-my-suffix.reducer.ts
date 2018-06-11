import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IHoteldetailsMySuffix, defaultValue } from 'app/shared/model/hoteldetails-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_HOTELDETAILS_LIST: 'hoteldetails/FETCH_HOTELDETAILS_LIST',
  FETCH_HOTELDETAILS: 'hoteldetails/FETCH_HOTELDETAILS',
  CREATE_HOTELDETAILS: 'hoteldetails/CREATE_HOTELDETAILS',
  UPDATE_HOTELDETAILS: 'hoteldetails/UPDATE_HOTELDETAILS',
  DELETE_HOTELDETAILS: 'hoteldetails/DELETE_HOTELDETAILS',
  RESET: 'hoteldetails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHoteldetailsMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HoteldetailsMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: HoteldetailsMySuffixState = initialState, action): HoteldetailsMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HOTELDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOTELDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOTELDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_HOTELDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_HOTELDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HOTELDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOTELDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_HOTELDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_HOTELDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_HOTELDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOTELDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOTELDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOTELDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_HOTELDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOTELDETAILS):
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

const apiUrl = SERVER_API_URL + '/api/hoteldetails';

// Actions

export const getEntities: ICrudGetAllAction<IHoteldetailsMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOTELDETAILS_LIST,
  payload: axios.get<IHoteldetailsMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHoteldetailsMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOTELDETAILS,
    payload: axios.get<IHoteldetailsMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHoteldetailsMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOTELDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHoteldetailsMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOTELDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHoteldetailsMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOTELDETAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
