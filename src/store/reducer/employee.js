import { list } from "postcss";

const initialState = {
    list:[]
}

export const employee = (state = initialState,action) => 
{

    if(action.type === "GET_EMPLOYEE"){
        let temp = action.payload
        return {...state, list: temp}
    }

    return state;

}