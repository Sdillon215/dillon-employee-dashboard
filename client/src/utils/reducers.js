import { useReducer } from 'react';
import {
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_DEPARTMENT,
    UPDATE_DEPARTMENTS,
    ADD_TO_PO_CART,
    ADD_MULTIPLE_TO_PO_CART,
    REMOVE_FROM_PO_CART,
    UPDATE_PO_CART,
    ADD_TO_SO_CART,
    ADD_MULTIPLE_TO_SO_CART,
    REMOVE_FROM_SO_CART,
    UPDATE_SO_CART,
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_DEPARTMENTS`, return a new state object with an updated department orders array
        case UPDATE_DEPARTMENTS:
            return {
                ...state,
                departments: [...action.departments]
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products]
            };

        case UPDATE_CURRENT_DEPARTMENT:
            return {
                ...state,
                currentDepartment: action.currentDepartment
            };

        case ADD_TO_PO_CART:
            return {
                ...state,
                poCart: [...state.poCart, action.product]
            };

        case ADD_MULTIPLE_TO_PO_CART:
            return {
                ...state,
                poCart: [...state.poCart, ...action.products],
            };

        case REMOVE_FROM_PO_CART:
            let newPoState = state.poCart.filter(product => {
                return product._id !== action._id;
            });

        return {
            ...state,
            poCart: newPoState
        };

        case UPDATE_PO_CART:
            return {
                ...state,
                poCart: state.poCart.map(product => {
                    if (action._id === product._id) {
                        product.quantity = action.quantity;
                        product.unitPrice = action.unitPrice;
                        product.productTotal = action.productTotal;
                    }
                    return product;
                })
            };

        case ADD_TO_SO_CART:
            return {
                ...state,
                soCart: [...state.soCart, action.product]
            };

        case ADD_MULTIPLE_TO_SO_CART:
            return {
                ...state,
                soCart: [...state.soCart, ...action.products],
            };

        case REMOVE_FROM_SO_CART:
            let newSoState = state.soCart.filter(product => {
                return product._id !== action._id;
            });

        return {
            ...state,
            soCart: newSoState
        };

        case UPDATE_SO_CART:
            return {
                ...state,
                soCart: state.soCart.map(product => {
                    if (action._id === product._id) {
                        product.quantity = action.quantity;
                        product.unitPrice = action.unitPrice;
                        product.productTotal = action.productTotal;
                    }
                    return product;
                })
            };

        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};