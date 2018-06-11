import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITermsConditionsMySuffix, defaultValue } from 'app/shared/model/terms-conditions-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TERMSCONDITIONS_LIST: 'termsConditions/FETCH_TERMSCONDITIONS_LIST',
  FETCH_TERMSCONDITIONS: 'termsConditions/FETCH_TERMSCONDITIONS',
  CREATE_TERMSCONDITIONS: 'termsConditions/CREATE_TERMSCONDITIONS',
  UPDATE_TERMSCONDITIONS: 'termsConditions/UPDATE_TERMSCONDITIONS',
  DELETE_TERMSCONDITIONS: 'termsConditions/DELETE_TERMSCONDITIONS',
  RESET: 'termsConditions/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITermsConditionsMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TermsConditionsMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TermsConditionsMySuffixState = initialState, action): TermsConditionsMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TERMSCONDITIONS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TERMSCONDITIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TERMSCONDITIONS):
    case REQUEST(ACTION_TYPES.UPDATE_TERMSCONDITIONS):
    case REQUEST(ACTION_TYPES.DELETE_TERMSCONDITIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TERMSCONDITIONS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TERMSCONDITIONS):
    case FAILURE(ACTION_TYPES.CREATE_TERMSCONDITIONS):
    case FAILURE(ACTION_TYPES.UPDATE_TERMSCONDITIONS):
    case FAILURE(ACTION_TYPES.DELETE_TERMSCONDITIONS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TERMSCONDITIONS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TERMSCONDITIONS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TERMSCONDITIONS):
    case SUCCESS(ACTION_TYPES.UPDATE_TERMSCONDITIONS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TERMSCONDITIONS):
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

const apiUrl = SERVER_API_URL + '/api/terms-conditions';

// Actions

export const getEntities: ICrudGetAllAction<ITermsConditionsMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TERMSCONDITIONS_LIST,
  payload: axios.get<ITermsConditionsMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITermsConditionsMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TERMSCONDITIONS,
    payload: axios.get<ITermsConditionsMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITermsConditionsMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TERMSCONDITIONS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITermsConditionsMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TERMSCONDITIONS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITermsConditionsMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TERMSCONDITIONS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
