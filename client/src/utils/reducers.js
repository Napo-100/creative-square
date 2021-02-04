import { useReducer } from "react";
import { TOGGLE_CART } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}