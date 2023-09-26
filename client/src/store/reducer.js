import { GET_DOGS, SEARCH_DOGS, SET_CURRENT_PAGE, TOGGLE_FORM, SAVE_DOG, ORDER_TOGGLE} from "./actions";

const initialState = {
  dog: {},
  dogs: [],
  currentPage: 1,
  itemsPerPage: 10,
  visibleForm: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case GET_DOGS:
      return { ...state, dogs: action.payload };
    case SEARCH_DOGS:
      return { ...state, dogs: action.payload };
    case SAVE_DOG:
      return { ...state, dog: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case TOGGLE_FORM:
      return { ...state, visibleForm: !state.visibleForm };
    case ORDER_TOGGLE:
      return { ...state, dogs: state.dogs.reverse() };
  }
};

export default rootReducer;