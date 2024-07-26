import axiosDB from "../../axios"

export const getEmployee =  () => (dispatch) => {

    axiosDB.get(`/Manager/empSuper/${localStorage.getItem('id')}`, {
        headers: {
            "Authorization": 'Basic ' + localStorage.getItem("token")
        }
    }).then(resp => {
        let action = {
            type:"GET_EMPLOYEE",
            payload:resp.data
        }
        dispatch(action)
    })

}