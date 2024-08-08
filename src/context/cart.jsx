import { createContext, useReducer, useState } from "react";

//1.- CREAR CONTEXTO
export const CartContext = createContext();

const initialState = [];
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case "ADD_TO_CART": {
      const { id } = actionPayload;
      // primero checamos si el producto ya esta en el carro
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        //Una forma seria usando structureclone
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }
      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
    }
    case "REMOVE_FROM_CART": {
      const { id } = actionPayload;
      return state.filter((item) => item.id != id);
    }

    case "CLEAN_CART": {
      return initialState;
    }
  }
  return state;
};

//2.- CREAR PROVIDER
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFronCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () => dispatch({ type: "CLEAN_CART" });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        clearCart,
        removeFronCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
