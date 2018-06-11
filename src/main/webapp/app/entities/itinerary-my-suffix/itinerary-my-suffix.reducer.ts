import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IItineraryMySuffix, defaultValue } from 'app/shared/model/itinerary-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_ITINERARY_LIST: 'itinerary/FETCH_ITINERARY_LIST',
  FETCH_ITINERARY: 'itinerary/FETCH_ITINERARY',
  CREATE_ITINERARY: 'itinerary/CREATE_ITINERARY',
  UPDATE_ITINERARY: 'itinerary/UPDATE_ITINERARY',
  DELETE_ITINERARY: 'itinerary/DELETE_ITINERARY',
  RESET: 'itinerary/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItineraryMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ItineraryMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: ItineraryMySuffixState = initialState, action): ItineraryMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ITINERARY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ITINERARY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ITINERARY):
    case REQUEST(ACTION_TYPES.UPDATE_ITINERARY):
    case REQUEST(ACTION_TYPES.DELETE_ITINERARY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ITINERARY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITINERARY):
    case FAILURE(ACTION_TYPES.CREATE_ITINERARY):
    case FAILURE(ACTION_TYPES.UPDATE_ITINERARY):
    case FAILURE(ACTION_TYPES.DELETE_ITINERARY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITINERARY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITINERARY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ITINERARY):
    case SUCCESS(ACTION_TYPES.UPDATE_ITINERARY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ITINERARY):
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

const apiUrl = SERVER_API_URL + '/api/itineraries';

// Actions

export const getEntities: ICrudGetAllAction<IItineraryMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ITINERARY_LIST,
  payload: axios.get<IItineraryMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IItineraryMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITINERARY,
    payload: axios.get<IItineraryMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IItineraryMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ITINERARY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IItineraryMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ITINERARY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IItineraryMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ITINERARY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
