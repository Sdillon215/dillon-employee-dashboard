import { useReducer } from 'react';
import {
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_DEPARTMENT,
    ADD_TO_PO_CART,
    ADD_MULTIPLE_TO_PO_CART,
    REMOVE_FROM_PO_CART,
    UPDATE_PO_CART,
    CLEAR_PO_CART,
    UPDATE_DEPARTMENTS,
    UPDATE_DEPARTMENT_PO
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
            let newState = state.poCart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                poCart: newState
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
        case UPDATE_DEPARTMENT_PO:
            return {
                ...state,
                departments: state.departments.map(department => {
                    if (action._id === department._id) {
                        ...state,
                        department: [...state.department, ...action.porder],
                    }
                    return department;
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