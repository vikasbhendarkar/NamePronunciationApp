import Mock from '../mock'
import shortid from 'shortid'
const { uniqueNamesGenerator, names} = require('unique-names-generator');

let employeeDB = {
    "employee": []
}


for(let i=0;i<50;i++) {
    let fname = uniqueNamesGenerator({dictionaries:[names], length: 1})
    let lname = uniqueNamesGenerator({dictionaries:[names], length: 1})
    let preferred_name = fname+" "+lname
    employeeDB["employee"].push({
        "eid": shortid.generate(),
        "uid": shortid.generate(),
        "fname": fname,
        "lname": lname,
        "preferred_name": preferred_name,
        "pronounciation": "",   //base64 encoded
        "status": (i%2 === 0)? "completed": "pending"
        
    })
}

Mock.onGet('/api/employee').reply((config) => {
    const start = parseInt(config.start)
    const end = parseInt(config.end)
    let response = []
    if(config.filter !== "all") {
        response = employeeDB.employee.filter((emp)=> emp.status === config.filter)
        response = response.slice(start, end)
    }
    else {
        response = employeeDB.employee.slice(start,end)
    }
    return [200, response]
})

Mock.onGet('/api/employee/recording').reply((config) => {
    const employee = employeeDB.employee.find((emp) => emp.eid === config.eid)
    if(employee.pronounciation !== "") {
        return [200, employee.pronounciation]
    }
    return [200, {}]
})

Mock.onGet('/api/employee/analytics').reply((config) => {
    // get completed and pending stats
    const response = {}
    const completed = employeeDB.employee.filter((emp) => emp.status === 'completed')
    const pending = employeeDB.employee.filter((emp) => emp.status === 'pending')
    response["analytics"] = {
        "completed": completed.length,
        "pending": pending.length
    }
    return [200,response]
})


Mock.onPost('/api/employee/update').reply((config) => {
    const data = JSON.parse(config.data)
    const eid = data.eid
    const audiodata = data.file
    console.log("audio data", audiodata)
    const employee = employeeDB.employee.find((emp)=> emp.eid === eid)
    employee["pronounciation"] = audiodata
    employee["status"] = "completed"
    return [200, {}]
})