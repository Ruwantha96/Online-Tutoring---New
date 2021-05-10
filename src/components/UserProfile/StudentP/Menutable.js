import React, { useState, useEffect } from 'react'
import './table.css';
import Paybutton from './Paybutton';
import axios from 'axios';
import { AtmSharp } from '@material-ui/icons';
// import  StripeModal from './Stripe/StripeModal';
import StripeCheckOut from 'react-stripe-checkout';
import  { useHistory } from 'react-router-dom'

const URL = 'https://jsonplaceholder.typicode.com/users'


const Table = (props) => {
    debugger;
    console.log(props);
    const history = useHistory();
    // const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    // const [firstName, setFirstName] =  useState("");
    // const [lastName, setLastName] =  useState("");
    // const [email, setEmail] =  useState("");
    // const [phoneNumber, setPhone] =  useState("");
    // const [address, setAddress] =  useState("");
    // const [password, setPassword] =  useState("");
    // const [role, setRole] =  useState("Student");

    useEffect( async () => {
        try {
            const res = await axios.get('https://localhost:44319/Teachers/GetAllTeacher')
            debugger;
            setCourses(res.data);
        } catch (ex) {
            setCourses(null);
        }
    }, [])

    // const getData = async () => {
    //     setCourses(response.data)
    // }


    const renderHeader = () => {
        let headerElement = ['name', 'email', 'phone', 'subject','price', 'operation']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }


    // const handlePayClick =  (userId) => {
    //     debugger
    //     console.log("user id",userId );
    //     // setOpen(true);
    //     // yur cod here
    // }



    function handleToken(data){
        debugger;     
        var formData = new FormData();

        const stdId = localStorage.getItem('UserIdStd');
        formData.append("studentId", stdId);
        formData.append("teacherId", data.userId);
        formData.append("price", data.price);
        formData.append("subject", data.subject);
        formData.append("cardNumber", "42424242424242");
        formData.append("monthExpiry", "03");
        formData.append("yearExpiry", "25");
        formData.append("cvv", "123");
        const res =  axios.post('https://localhost:44319/Students/StudentPayment', formData);
        debugger;
        if(res){
            history.push("/AccSTsubscriptions");
        }
    }

    const renderBody = () => {
        return courses?.map(data => {
            return  (
                <tr key={data.userId}>
                    <td style={{ width: '250px' }}>{data.firstName}</td>
                    <td style={{ width: '200px' }}>{data.email}</td>
                    <td style={{ width: '150px' }}>{data.phone}</td>
                    <td style={{ width: '150px' }}>{data.subject}</td>
                    <td style={{ width: '150px' }}>{data.price}</td>
                    <td style={{ width: '270px' }}>
                        <StripeCheckOut
                            stripeKey="pk_test_51IXIUoLC2k2Kyk59hcacPGKxz1CBrDulNfhn3owCHDAj0DXrhBBVzctlQ4gMxYfEDjTJPZ9mW4SDqt5losDul2iN00a7X9AlKG"
                            token={() => handleToken(data)}
                        />
               
                    {/* <button onClick={() => handlePayClick(data.userId)}>Pay Now</button> */}
                    </td>
                </tr>
            )
        });
    }


    return (
        <div class="tableFixHead">
            <table id='courses'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
           
            {/* <StripeModal open={open} setOpen={setOpen} /> */}
        </div>
    )
}


export default Table