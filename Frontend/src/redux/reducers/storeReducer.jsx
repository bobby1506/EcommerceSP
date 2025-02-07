const initialState = {
  error: "",
  //message: "",
  flag: false,
  isLoading: false,
  isCreated: false,
  storesArray: [],
  storeData: {},
};

export const storeReducer = (state = initialState, action) => {
  let response = action.payload;
  switch (action.type) {
    case "CREATESTORE_PENDING":
      return { ...state, isLoading: true };
    case "CREATESTORE_FULFILLED":
      if (!response.data.isSocket) {
        return {
          ...state,
          isLoading: false,
          flag: !state.flag,
          isCreated: true,
          message: "store created sucessfully",
        };
      } else {
        return {
          ...state,
        };
      }

    case "CREATESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        //message: response.data.//message,
      };

    case "SOCKETDELAY":
      return {
        ...state,
        message: "it is taking too much time msg:Socket",
        flag: !state.flag,
      };
    case "SOCKETRESULT":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        isCreated: true,
        message: "store created sucessfully  message by Socket",
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
        //message: response.data.//message,
      };
    case "DELETESTORE_REJECTED":
      return {
        ...state,
        isLoading: false,
        //message: response.data.//message,
        flag: !state.flag,
      };

    default:
      return state;
  }
};
