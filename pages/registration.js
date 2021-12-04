import Navbar from "../Components/Navbar/Navbar";
import { useState } from "react";
import Form from "../Components/Form/Form";
import Image from 'next/image';
import SignUp from "../Assets/login.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import Router from "next/router";

const Regisration_Form = () => {
    const [shortDes, setShortDes] = useState("");
    const [des, setDes] = useState("");
    const [registrationType, setRegistrationType] = useState("");
    const [registrationFor, setRegistrationFor] = useState("");
    const [propertyAddr, setPropertyAddr] = useState("");
    const [propertySize, setPropertySize] = useState();
    const [propertyPrice, setPropertyPrice] = useState();
    const [propertyArea, setPropertyArea] = useState();
    const [propertyNearby, setPropertyNearby] = useState("");
    const [facility, setFacility] = useState("");

    const user_data = useSelector((state) => state.userInfo.userInfo_data);

    // console.log("dATA TOH YEH HAI", user_data);
    const [ind, setInd] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user_data);
        const data = {
            shortDes,
            des,
            registrationType,
            registrationFor,
            propertyAddr,
            propertySize,
            propertyPrice,
            propertyArea,
            propertyNearby,
            facility,
            username: user_data.username, 
        }
        axios.post('http://127.0.0.1:5000/register',{data}).then(res => {
            console.log(res);
            alert("Registration Successful");
        })
        // Router.push("/");
    }

    const handleNext = () => {
        setInd(ind + 1);
    }
    const form_data_1 = [
        {
            label: "Give a Short Description for your property",
            input: "input",
            denote_var: shortDes,
            set_var: setShortDes,
        },
        {
            label: "Give a Detailed Description for your property",
            input: "textarea",
            denote_var: des,
            set_var: setDes,
        },
    ];
    const form_data_2 = [
        {
            label: "Property Address",
            input: "textarea",
            denote_var: propertyAddr,
            set_var: setPropertyAddr,
        },
        {
            label: "Property Area",
            input: "textarea",
            denote_var: propertyArea,
            set_var: setPropertyArea,
        },
        {
            label: "Property Nearby",
            input: "textarea",
            denote_var: propertyNearby,
            set_var: setPropertyNearby,
        },
        {
            label: "Property Facility",
            input: "textarea",
            denote_var: facility,
            set_var: setFacility,
        },

    ];

    const form_data_3 = [
        {
            label: 'Registration Type',
            input: 'label',
        },
        {
            label: 'Commercial',
            input: 'radio',
            name: 'reg_type',
            value: 'commercial',
            denote_var: registrationType,
            set_var: setRegistrationType,
        },
        {
            label: 'Flat',
            input: 'radio',
            name: 'reg_type',
            value: 'flat',
            denote_var: registrationType,
            set_var: setRegistrationType,
        },
        {
            label: 'Plot',
            input: 'radio',
            name: 'reg_type',
            value: 'plot',
            denote_var: registrationType,
            set_var: setRegistrationType,
        },
        {
            label: 'Registration For',
            input: 'label',
        },
        {
            label: 'Rent',
            input: 'radio',
            name: 'reg_for',
            value: 'rent',
            denote_var: registrationFor,
            set_var: setRegistrationFor,
        },
        {
            label: 'Buy',
            input: 'radio',
            name: 'reg_for',
            value: 'buy',
            denote_var: registrationFor,
            set_var: setRegistrationFor,
        },
        {
            label: 'Invest',
            input: 'radio',
            name: 'reg_for',
            value: 'invest',
            denote_var: registrationFor,
            set_var: setRegistrationFor,
        },
    ];

    const form_data_4 = [
        {
            label: "Property Size",
            input: "input",
            denote_var: propertySize,
            set_var: setPropertySize,
        },
        {
            label: "Property Price",
            input: "input",
            denote_var: propertyPrice,
            set_var: setPropertyPrice,
        },
    ];

    const form_data = [form_data_1, form_data_2, form_data_3, form_data_4];

    return (
        <div>
            {
                /*
                registration_id ( we will give )
                registration_seller ( we know redux )
                registration_type ( building/flat/shop/office/other )
                registration_for (rent/ buy/ investment )
                property_id(generated by us)
                property_addr (we will get)
                property_size ( data)
                property_price ( data)
                property_area ( data )
                property_nearby ( data )
                facilities (data)
                */
            }
            <Navbar/>
            <h1 style={{padding: "1rem", textAlign: "center"}}>Registration Form</h1>
            <p style={{padding: "1rem", textAlign: "center", marginBottom: "2rem"}}>Fill this form to register your property.</p>
            <div style={{display: "flex"}}>
                <div style={{width: "50%", margin: "auto"}}>
                    <Image src={SignUp}/>
                </div>
                <div>
                    {form_data.map((form, index)=>(
                        ind===index && <Form form_construct={form} key={index}/>
                    ))}
                {/* <Form form_construct={form_data}/> */}
                {ind!==0 && <button variant="contained" color="primary" style={{width: "45%", marginBottom: "2rem", marginRight: "2rem"}} onClick={()=>setInd(ind-1)}>Previous</button>}
                {ind!==(form_data.length-1) && <button variant="contained" style={{width: "45%", marginBottom: "2rem"}} color="primary" onClick={handleNext}>Next</button>}
                {ind===(form_data.length-1) && <button variant="contained" style={{width: "45%", marginBottom: "2rem"}} onClick={handleSubmit}>Submit Form</button>}
                </div>
            </div>
        </div>
    );
}

export default Regisration_Form;