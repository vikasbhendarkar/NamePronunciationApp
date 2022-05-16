import '../fake-db'
import React from 'react'
import PronounciationWidget from './PronounciationWidget'

const data = {
    "eid": "asdad",
    "uid": "qewqeqw",
    "fname": "john",
    "lname": "doe",
    "pronounciation": "",
    "status": "completed"
}
const App = () => {
    return (
        <PronounciationWidget data={data}/>
    )
}

export default App
