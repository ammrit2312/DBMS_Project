import Form from '../../Components/Form/Form';
import { useState } from 'react';
import styles from './SignUp.module.css';
import Router from 'next/router'
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';

const SignUpForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [aadharNum, setAadharNum] = useState('');
    const [index, setIndex] = useState(0);
    const [phone, setPhone] = useState('');


    const signUp_main = [
        {
            label: "Username",
            input: "input",
            denote_var: username,
            set_var: setUsername,
        },
        {
            label: "Password",
            input: "password",
            denote_var: password,
            set_var: setPassword,
        },
        {
            label: "Phone",
            input: "input",
            denote_var: phone,
            set_var: setPhone,
        },
        {
            label: 'Buyer or Seller',
            input: 'label',
        },
        {
            label: 'Buyer',
            input: 'radio',
            name: 'type',
            value: 'buyer',
            denote_var: type,
            set_var: setType,
        },
        {
            label: 'Seller',
            input: 'radio',
            name: 'type',
            value: 'seller',
            denote_var: type,
            set_var: setType,
        },
    ];

    const signUp_buyer = [
        {
            label: "First Name",
            input: "input",
            denote_var: firstName,
            set_var: setFirstName,
        },
        {
            label: "Last Name",
            input: "input",
            denote_var: lastName,
            set_var: setLastName,
        },
    ];

    const signUp_seller = [
        {
            label: "First Name",
            input: "input",
            denote_var: firstName,
            set_var: setFirstName,
        },
        {
            label: "Last Name",
            input: "input",
            denote_var: lastName,
            set_var: setLastName,
        },
        {
            label: "Aadhar Number",
            input: "input",
            denote_var: aadharNum,
            set_var: setAadharNum,
        },
    ];

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(type)
        // console.log(username, password);
        const data = {
            username, 
            password,
            type, 
            firstName, 
            lastName,
            aadharNum, 
            phone,
        }
        axios.post('http://127.0.0.1:5000/signup', {data}).then(res => {
            if(res.data.mssg === 'Success'){
                Router.push('/login');
            }
            else if(res.data.mssg === 'User Already Exists'){
                alert('User Already Exists');
            }
        })
        // axios.post('http://127.0.0.1:5000/signup', {data}).then(res => console.log(res))
        // axios.post('http://127.0.0.1:5000/signup', {data}).then(res => {
        //     if(res.data.mssg==='Success'){
        //         // put it in redux
        //         Router.push('/login')
        //     }
        //     else{
        //         alert(res.data);
        //     }
        // })
    }

    return (
        <div>
            <Navbar/>
            <div className={styles.SignUp}>
                <h1 className={styles.signup__title}>SignUp</h1>
                <div className={styles.centerDiv}>
                    {(index==0) && <Form form_construct={signUp_main} />}
                    {(index===1 && type==='buyer') && <Form form_construct={signUp_buyer} />}
                    {(index===1 && type==='seller') && <Form form_construct={signUp_seller} />}
                    {(index!==0) && <button className={styles.signup__button} onClick={() => setIndex(index-1)} style={{width: "20vw", marginRight: "5vw"}}>Previous</button>}
                    {(index!==1) && <button className={styles.signup__button} style={{width: "45vw"}} onClick={() => setIndex(index+1)}>Next</button>}
                    {(index===1) && <button style={{width: "45vw"}} style={{width: "20vw"}} onClick={handleSignUp}>Login</button>}
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;