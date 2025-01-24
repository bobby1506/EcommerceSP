import { updateOrders } from "../actions/orders";

const initialState = {
  orderList: [],
  isLoading: false,
  message: "",
};

export const orderReducer = (state = initialState, action) => {
  const response = action.payload?.data;
  switch (action.type) {
    case "GETORDERS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GETORDERS_FULFILLED":
        const updateOrdersList=[];
        for(const item of response.orders){
            for(const order of item.orderedItems){
                updateOrdersList.unshift(order);
            }
        }
      return {
        ...state,
        orderList: [...response.orders],
        isLoading: false,
        // message:
      };
    case "GETORDERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        // message:""
      };
    case "POSTORDERS_PENDING":
      return {
        ...state,
        // isLoading: true,
      };
    case "POSTORDERS_FULFILLED":
      return {
        ...state,
        // orderList: [...response.orderItems],
        // isLoading: false,
        // message:
      };
    case "POSTORDERS_REJECTED":
      return {
        // ...state,
        // isLoading: false,
        // message:""
      };
    case "UPDATEORDERS_PENDING":
      return {
        ...state,
        // isLoading: true,
      };
    case "UPDATEORDERS_FULFILLED":
      return {
        ...state,
        // orderList: [...response.orderItems],
        // isLoading: false,
        // message:
      };
    case "UPDATEORDERS_REJECTED":
      return {
        // ...state,
        // isLoading: false,
        // message:""
      };

    case "GETORDERSSELLER_PENDING":
      return {
        ...state,
        isLoading:true,
      };
    case "GETORDERSSELLER_FULFILLED":
      
      return {
        ...state,
        orderList: [...response.filteredItems],
        isLoading: false,
        // message:
      };
    case "GETORDERSSELLER_REJECTED":
      return {
        ...state,
        isLoading: false,
        // message:""
      };
     default:
        return state 
  }
};
