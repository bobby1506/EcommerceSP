const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  storesArray: [],
  storeData: {
    storeName: "",
    storeId: "",
    storeDescription: "",
    storeAddress: "",
  },
};

export const createStoreReducer = (state = initialState, action) => {
  let data=action.payload;
  switch (action.type) {
    case "CREATESTORE_PENDING":
      return { ...state, isLoading: true };
    case "CREATESTORE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        flag: !flag,
        message: action.payload.message,
      };
    case "CREATESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !flag,
        // error: action.payload.error,
        message: action.payload.message,
      };
    case "GETSTORES_PENDING":
      return { ...state, isLoading: true };
    case "GETSTORES_FULFILLED":
      return {
        ...state,
        isLoading: false,
        storesArray: data.storeArray, //check
        flag: !flag,
        message: data.message,
      };
    case "GETSTORES_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
    case "DELETESTORE_PENDING":
      return { ...state, isLoading: true };
    case "DELETESTORE_FULFILLED":
      let deletedStores = (state.storesArray.filter = (store) => {
        if (store.id != data.id) return store;
      });
      return {
        ...state,
        isLoading: false,
        storeData: {},
        storesArray: deletedStores,
        flag: !flag,
        message: data.message,
      };
    case "DELETESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
      case "UPDATESTORE_PENDING":
      return { ...state, isLoading: true };
    case "UPDATESTORE_FULFILLED":
      const updatedStores = (state.storesArray.map = (store, index) => {
        if (store.id == data.id) {
          storesArray[index] = data.store; //check
        }
        return store;
      });
      return {
        ...state,
        isLoading: false,
        storeData: data.store, //check
        storesArray: updatedStores,
        flag: !flag,
        message: data.message,
      };
    case "UPDATESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
    default:
      return state;
  }
};

