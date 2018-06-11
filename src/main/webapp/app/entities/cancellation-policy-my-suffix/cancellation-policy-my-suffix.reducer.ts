import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICancellationPolicyMySuffix, defaultValue } from 'app/shared/model/cancellation-policy-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_CANCELLATIONPOLICY_LIST: 'cancellationPolicy/FETCH_CANCELLATIONPOLICY_LIST',
  FETCH_CANCELLATIONPOLICY: 'cancellationPolicy/FETCH_CANCELLATIONPOLICY',
  CREATE_CANCELLATIONPOLICY: 'cancellationPolicy/CREATE_CANCELLATIONPOLICY',
  UPDATE_CANCELLATIONPOLICY: 'cancellationPolicy/UPDATE_CANCELLATIONPOLICY',
  DELETE_CANCELLATIONPOLICY: 'cancellationPolicy/DELETE_CANCELLATIONPOLICY',
  RESET: 'cancellationPolicy/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICancellationPolicyMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CancellationPolicyMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: CancellationPolicyMySuffixState = initialState, action): CancellationPolicyMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CANCELLATIONPOLICY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CANCELLATIONPOLICY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CANCELLATIONPOLICY):
    case REQUEST(ACTION_TYPES.UPDATE_CANCELLATIONPOLICY):
    case REQUEST(ACTION_TYPES.DELETE_CANCELLATIONPOLICY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CANCELLATIONPOLICY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CANCELLATIONPOLICY):
    case FAILURE(ACTION_TYPES.CREATE_CANCELLATIONPOLICY):
    case FAILURE(ACTION_TYPES.UPDATE_CANCELLATIONPOLICY):
    case FAILURE(ACTION_TYPES.DELETE_CANCELLATIONPOLICY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CANCELLATIONPOLICY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CANCELLATIONPOLICY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CANCELLATIONPOLICY):
    case SUCCESS(ACTION_TYPES.UPDATE_CANCELLATIONPOLICY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CANCELLATIONPOLICY):
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

const apiUrl = SERVER_API_URL + '/api/cancellation-policies';

// Actions

export const getEntities: ICrudGetAllAction<ICancellationPolicyMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CANCELLATIONPOLICY_LIST,
  payload: axios.get<ICancellationPolicyMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICancellationPolicyMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CANCELLATIONPOLICY,
    payload: axios.get<ICancellationPolicyMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICancellationPolicyMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CANCELLATIONPOLICY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICancellationPolicyMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CANCELLATIONPOLICY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICancellationPolicyMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CANCELLATIONPOLICY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
