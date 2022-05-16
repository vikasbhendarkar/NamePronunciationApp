import axios from 'axios'

export const GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST'
export const UPDATE_EMPLOYEE_RECORDING = 'UPDATE_EMPLOYEE_RECORDING'
export const GET_EMPLOYEE_RECORDING = 'GET_EMPLOYEE_RECORDING'
export const GET_ANALYTICS = 'GET_ANALYTICS'

const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};

const base64toBlob = (base64string) => {
    const blob = base64string.blob()
    return blob
}

export const getEmployeeList = (page, following, rows, filter) => (dispatch) => {
    const start = page*rows + 1
    const end = (page+following)*rows
    axios.get('/api/employee', {
        start: start,
        end: end,
        filter: filter
    }).then((res) => {
        dispatch({
            type: GET_EMPLOYEE_LIST,
            payload: res.data,
        })
    })
}

export const getRecording = (eid) => (dispatch) => {
    axios.get('/api/employee/recording', {
        eid: eid
    }).then((res) => {
        dispatch({
            type: GET_EMPLOYEE_RECORDING,
            payload: res.data
        })
    })
}

export const getAnalytics = () => (dispatch) => {
    console.log("here ")
    axios.get('/api/employee/analytics').then((res) => {
        console.log("here ", res.data)
        dispatch({
            type: GET_ANALYTICS,
            payload: res.data
        })
    })
}

export const updateEmployeeRecording = (eid, recording_data) => (dispatch) => {
    
    let file = ""
    blobToBase64(recording_data).then(base64data => {
        //console.log("base 64 data ", base64data)
        file = base64data
    }).then(() => {
        axios.post('/api/employee/update', {
            eid: eid,
            blob: recording_data,
            file: file
        }).then((res) => {
            dispatch({
                type: UPDATE_EMPLOYEE_RECORDING,
                payload: res.data
            })
        })    
    })
}