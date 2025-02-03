import { getOrders, updateOrders } from "../actions/orders";

const initialState = {
  orderList: [],
  isLoading: false,
  message: "",
  orderCreated:false,
  orderFetch:false,
  flag:false
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
        orderFetch:true,
        // message:response.message,
        flag:!state.flag,
      };
    case "GETORDERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        // message:action.payload?.response?.data?.message,
        flag:!state.flag,
      };
    case "POSTORDERS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "POSTORDERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        orderCreated:true,
        message:response?.message ||"order created",
        flag:!state.flag
      };
    case "POSTORDERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        message:action.payload?.response?.data?.message ||"some error occurred",
        flag:!state.flag,
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
      // return {
      //   ...state,
      //   isLoading: false,
      //   message:action.payload?.response?.data?.message ||"some error occurred"
      // };

    case "GETORDERSSELLER_PENDING":
      return {
        ...state,
        isLoading:true,
      };
    case "GETORDERSSELLER_FULFILLED":
      
      return {
        ...state,
        orderList: [...response.orderss],
        isLoading: false,
        orderFetch:true,
        flag:!state.flag,

        // message:
      };
    case "GETORDERSSELLER_REJECTED":
      return {
        ...state,
        isLoading: false,
        message:action.payload?.response?.data?.message,
        flag:!state.flag,
      };
      case "EMPTYORDERMSG":
        return{
          ...state,
          message:"",
        }
     default:
        return {...state }
  }


};
