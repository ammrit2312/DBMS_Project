import styles from './detail.module.css';
import SlideShow_Main from '../../Components/SlideShow_Main/SlideShow_Main';
import Navbar from '../../Components/Navbar/Navbar';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

const data = {
    title: 'Property 1',
    area: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, sunt!',
    address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure magni repudiandae vitae voluptates, exercitationem quod sapiente placeat provident sit quo.',
    facilities: 'Lorem ipsum dolor sit amet.',
    nearby: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, sunt!',
    price: '$1,000,000',
    size: '200sq feet',
    
}

const Details = () => {
    const userData = useSelector((state) => state.userInfo.userInfo_data);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const { id } = router.query;
    // console.log(id)
    const [finalData, setFinalData] = useState([]);
    useEffect(() => {
        // const { id } = router.query;
        console.log("This is time", id);
        axios.post(`http://127.0.0.1:5000/property/info`, {id}).then(res => {
            console.log("This is the data", res.data.data);
            setFinalData(res.data.data);
            setUsername(res.data.username);
        })
    }, [])
    return (
        <div>
            <Navbar />
            <div style={{display: 'flex', marginTop: '2rem'}}>
                <SlideShow_Main detail_id={id} users={username}/>
                <div className={styles.details__content}>
                    <div style={{textAlign: "center", margin: "3rem", marginTop: "0rem", marginLeft: 0, color: "#123C69"}}><h1>Property Details</h1><div style={{ height: "0.2rem", background: "#AC3B61"}}></div></div>
                    <h1>{finalData.shortDes}</h1>
                    <p className={styles.details__header}>Description</p>
                    <p>{finalData.des}</p>
                    <p className={styles.details__header}>Address</p>
                    <p>{finalData.p_address}</p>
                    <p className={styles.details__header}>Area</p>
                    <p>{finalData.p_area}</p>
                    <p className={styles.details__header}>Facility</p>
                    <p>{finalData.p_facility}</p>
                    <p className={styles.details__header}>Nearby</p>
                    <p>{finalData.p_nearby}</p>
                    <p className={styles.details__header}>Rating</p>
                    <p>{finalData.rating} out of 5</p>
                    <p className={styles.details__header}>Price</p>
                    <p>{finalData.rent}</p>
                    {userData.type_user === 'buyer' && <><p className={styles.details__header}>Seller Contact</p>
                    <p>{finalData.seller_phone}</p></>}
                    {finalData.type_property==="invest" && <><p className={styles.details__header}>Growth Rate</p>
                    <p>{finalData.growth_rate}</p></>}
                </div>
            </div>
        </div>
    );
}

export default Details;