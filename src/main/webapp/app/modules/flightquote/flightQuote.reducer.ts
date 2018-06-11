import axios from 'axios';

export const ACTION_TYPES = {
  INSERT_CUSTOMER: 'INSERT_CUSTOMER',
  INSERT_HOTEL_DETAILS: 'INSERT_HOTEL_DETAILS'
};

const initialState = {
  customerDetails: {
    name: null,
    city: null,
    contactNo: null,
    emailId: null
  },
  hotelDetails: []
};

export type flightQuoteState = Readonly<typeof initialState>;

// Reducer
export default (state: flightQuoteState = initialState, action): flightQuoteState => {
  switch (action.type) {
    case ACTION_TYPES.INSERT_CUSTOMER: {
      return {...state, customerDetails: action.payload }
    }
    case ACTION_TYPES.INSERT_HOTEL_DETAILS: {
      console.log("Hotel From RED...",action.payload);
      return {...state, hotelDetails: action.payload }
    }
    default:
      return state;
  }
};

// Actions
  export const add = customer => async dispatch => {
    await dispatch({
      type: ACTION_TYPES.INSERT_CUSTOMER,
      payload: customer
    });
  };

  export const addHotel = hotelDet => async dispatch => {
    await dispatch({
      type: ACTION_TYPES.INSERT_HOTEL_DETAILS,
      payload: hotelDet
    });
  };
