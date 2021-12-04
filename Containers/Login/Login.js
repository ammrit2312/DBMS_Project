import styles from './Login.module.css';
import Form from '../../Components/Form/Form';
import {useState} from 'react';
import axios from 'axios';
import Router from 'next/router'
import Navbar from '../../Components/Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux";
import {setUserInfo} from '../../Redux/ducks/userInfo';


const Login = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = [
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
    ]

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password);
        const data = {
            username,
            password
        }
        // axios
        //     .post('http://127.0.0.1:5000/login', {data})
        //     .then(res => {
        //         console.log(res);
        //     })
        axios.post('http://127.0.0.1:5000/login', {data}).then(res => {
            if(res.data.mssg==='Success'){
                // put it in redux
                dispatch(setUserInfo({username: username, type_user: res.data.type}));
                Router.push('/')
            }
            else{
                alert(res.data);
            }
        })

    }
    return (
        <div>
            <Navbar/>
        
            <div className={styles.Login}>
                <h1 className={styles.Login__title}>Login</h1>
                <div className={styles.centerDiv}>
                    <Form form_construct={login} />
                    <button style={{width: "45vw"}} onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}
 
export default Login;