import { CREATE_ORDER_FAIL, CLEAR_ERRORS, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST } from "../constants/orderConstant";
import { My_ORDERS_FAIL, My_ORDERS_REQUEST, My_ORDERS_SUCCESS } from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            }
        
        case CREATE_ORDER_SUCCESS:
            return{
                loading:false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return{
                loading:true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}

export const myOrdersReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case My_ORDERS_REQUEST:
            return{
                loading:true
            }
        
        case My_ORDERS_SUCCESS:
            return{
                loading:false,
                orders: action.payload
            }

        case My_ORDERS_FAIL:
            return{
                loading:true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}

