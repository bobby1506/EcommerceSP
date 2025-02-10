import React from "react";

const useCart = (totalItems, totalPrice) => {
  if (totalItems == 3)
    return { message: "add 5 items and get 20% off", totalPrice };

  if (totalItems >= 5 && totalItems < 10)
    return {
      message: "whoo! you get 20% off",
      totalPrice: totalPrice - totalPrice * (20 / 100),
    };

  if (totalItems == 6)
    return { message: "add 10 items and get 30% additional off", totalPrice };

  if (totalItems >= 10)
    return {
      message: "whoo! you get more 30% off",
      totalPrice: totalPrice - totalPrice * (30 / 100),
    };

  return { message: "", totalPrice };
};

export default useCart;
