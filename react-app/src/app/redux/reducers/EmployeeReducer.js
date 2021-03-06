import {
    GET_EMPLOYEE_LIST,
    UPDATE_EMPLOYEE_RECORDING,
    GET_EMPLOYEE_RECORDING,
    GET_ANALYTICS
} from '../actions/EmployeeActions'

const initialState = []

const EmployeeReducer = function (state = initialState, action) {
    switch(action.type) {
        case GET_EMPLOYEE_LIST: {
            const employeeList = []
            for(const keys in action.payload.response.result) {
                employeeList.push(action.payload.response.result[keys])
            }
            
            return employeeList
        }
        case UPDATE_EMPLOYEE_RECORDING: {
            return [...state]
        }
        case GET_EMPLOYEE_RECORDING: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default EmployeeReducer