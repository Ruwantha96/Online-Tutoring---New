import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './table.css';
import PlayButton from './PlayButton';



const URL = 'https://jsonplaceholder.typicode.com/users'

const Table = () => {
    const [courses, setCourses] = useState([]);

    useEffect( async () => {
        try {
            debugger
            // var stdId = localStorage.getItem('UserIdStd');
            const res = await axios.get('https://localhost:44319/Students/GetAllLectureByTeacherId?Id=');
            debugger
            setCourses(res.data)
        } catch (ex) {
            setCourses(null);
        }
    }, []);

    // const getData = async () => {
    //     const response = await axios.get(URL)
    //     setCourses(response.data)
    // }


    const renderHeader = () => {
        let headerElement = [ 'batch', 'class', 'lesson', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return courses?.map(data => {
            return  (
                <tr key={data.userId}>
                    <td style={{ width: '200px' }}>{data.batch}</td>
                    <td style={{ width: '150px' }}>{data.class}</td>
                    <td style={{ width: '150px' }}>{data.lesson}</td>
                    <td style={{ width: '270px' }}>
                        {/* <img style={{ width: '400px', height: '220px' }} src={data.path} /> */}
                        <strong >
                            <PlayButton path={data.path}/>
                        </strong>
                    </td>
                </tr>
            )
        });
    }

    return (
        
        <div class="tableFixHead">
            <table id='courses'>
                <thead >
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody >
                    {renderBody()}
                </tbody>
            </table>
        </div>
    )
}


export default Table