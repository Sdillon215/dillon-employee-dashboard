import { useReducer } from 'react';
import {
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_PO_CART,
    REMOVE_FROM_PO_CART,
    UPDATE_PO_CART_QUANTITY,
    CLEAR_PO_CART,
    UPDATE_DEP_ORDERS
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_DEP_ORDERS`, return a new state object with an updated department orders array
        case UPDATE_DEP_ORDERS:
            return {
                ...state,
                depOrders: [...action.depOrders]
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products]
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        case ADD_TO_PO_CART:
            return {
                ...state,
                poCart: [...state.poCart, action.product]
            };

        case REMOVE_FROM_PO_CART:
            let newState = state.poCart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                poCart: newState
            };

        case UPDATE_PO_CART_QUANTITY:
            return {
                ...state,
                poCart: state.poCart.map(product => {
                    if (action._id === product._id) {
                        product.quantity = action.quantity;
                    }
                    return product;
                })
            };

        case CLEAR_PO_CART:
            return {
                ...state,
                cart: []
            };
            
        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};