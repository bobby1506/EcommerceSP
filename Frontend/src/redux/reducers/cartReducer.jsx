// initialState={
//     cartItem:[],
//     isLoading:false,
//     flag:true
// }

// export const addToCart=(state=initialState,action)=>{
// let data=action.payload;
// switch(action.type){
//     case "ADDCART_PENDING":
//       return { ...state, isLoading: true };
//     case "ADDCART_FULFILLED":
//       return {
//         ...state,
//         isLoading: false,
//         flag: !flag,
//         productsArray: [...productArray, action.payload.product],
//         message: action.payload.message,
//       };
//     case "ADDCART_REJECTED":
//       return {
//         ...state,
//         isLoading: false,
//         flag: !flag,
//         // error: action.payload.error,
//         message: action.payload.message,
//       };
// }
// }

