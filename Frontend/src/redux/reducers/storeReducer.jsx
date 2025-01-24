const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  isCreated:false,
  storesArray: [],
  storeData: {
    storeName: "",
    storeId: "",
    storeDescription: "",
    storeAddress: "",
  },
};

export const storeReducer = (state = initialState, action) => {
  let response=action.payload;
  switch (action.type) {
    case "CREATESTORE_PENDING":
      return { ...state, isLoading: true };
    case "CREATESTORE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        isCreated:true,
        storesArray:[...state.storesArray,response.data.store],
        message: response.data.message,
      };
    case "CREATESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        message: response.data.message,
      };
    case "GETSTORES_PENDING":
      return { ...state, isLoading: true };
    case "GETSTORES_FULFILLED":
      return {
        ...state,
        isLoading: false,
        storesArray: [...response.data.store],
        flag: !state.flag,
      };
    case "GETSTORES_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
      };
    case "DELETESTORE_PENDING":
      return { ...state, isLoading: true };
    case "DELETESTORE_FULFILLED":
      let deletedStores = (state.storesArray.filter = (store) => {
        if (store.id != response.data.id) return store;
      });
      return {
        ...state,
        isLoading: false,
        storeData: {},
        storesArray: deletedStores,
        flag: !state.flag,
        message: response.data.message,
      };
    case "DELETESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: response.data.message,
        flag: !state.flag,
      };
      case "UPDATESTORE_PENDING":
      return { ...state, isLoading: true };
    case "UPDATESTORE_FULFILLED":
      const updatedStores = (state.storesArray.map = (store, index) => {
        if (store.id == response.data.id) {
          state.storesArray[index] = response.data.store; //check
        }
        return store;
      });
      return {
        ...state,
        isLoading: false,
        storeData: response.data.store, //check
        storesArray: updatedStores,
        flag: !state.flag,
        message: response.data.message,
      };
    case "UPDATESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: response.data.message,
        flag: !state.flag,
      };
    default:
      return state;
  }
};

