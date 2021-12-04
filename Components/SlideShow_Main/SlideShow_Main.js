import styles from './SlideShow_Main.module.css';
import Image from 'next/image';
// import First from '../../Assets/first.jpeg';
// import Second from '../../Assets/second.jpeg';
// import Third from '../../Assets/third.jpeg';
// import Data from '../../Assets/data.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Router from 'next/router';

import First1 from '../../Assets/First/First.jpeg'
import Second1 from '../../Assets/First/Second.jpeg'
import Third1 from '../../Assets/First/Third.jpeg'

import First2 from '../../Assets/Second/First.jpeg'
import Second2 from '../../Assets/Second/Second.jpeg'
import Third2 from '../../Assets/Second/Third.jpeg'

import First3 from '../../Assets/Third/First.jpeg'
import Second3 from '../../Assets/Third/Second.jpeg'
import Third3 from '../../Assets/Third/Third.jpeg'

import First4 from '../../Assets/Fourth/First.jpeg'
import Second4 from '../../Assets/Fourth/Second.jpeg'
import Third4 from '../../Assets/Fourth/Third.jpeg'

import First from '../../Assets/Final/First.jpeg';
import Second from '../../Assets/Final/Second.jpeg';
import Third from '../../Assets/Final/Third.jpeg';

const SlideShow_Main = ({detail_id, users}) => {
    const slideshowData = []
    if(detail_id === "p_1"){
        slideshowData = [First1, Second1, Third1]
    }
    else if(detail_id === "p_2"){
        slideshowData = [First2, Second2, Third2]
    }
    else if(detail_id === "p_3"){
        slideshowData = [First3, Second3, Third3]
    }
    else if(detail_id === "p_4"){
        slideshowData = [First4, Second4, Third4]
    }
    else{
        slideshowData = [First, Second, Third]
    }

    const userData = useSelector((state) => state.userInfo.userInfo_data);

    const [index, setIndex] = useState(0);
    const [showSlide, setShowSlide] = useState(false);

    useEffect(() => {
        // if(showSlide) {
            setTimeout(() => {
                const newInd = index===slideshowData.length-1 ? 0 : index+1;
                setIndex(newInd);
            }, 2500);
        // }
        return () => {};
    }, [index])

    const manageFavourites = () => {
        // setShowSlide(!showSlide);
        if(userData.username === '' || userData.type_user === 'seller') {
            alert("Please Login as a Buyer");
            Router.push('/login');
            return;
        }
        axios.get(`http://127.0.0.1:5000/add/favourites/${userData.username}/${detail_id}`).then(res => {
            console.log("This is what we have done", res.data.mssg)
            if(res.data.mssg === 'Already in favourites')
                alert("Already in favourites");
            else if(res.data.mssg === 'Success')
                alert("Added to favourites");
        })
    }


    const editProperty = () => {
        Router.push(`/editRegistration/${detail_id}`);
    }

    return (
        <div 
            className={styles.slideshow}
            onMouseEnter={() => setShowSlide(true)}
            onMouseLeave={() => setShowSlide(false)}
        >
            <div className={styles.slideshow_slider} style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}>
                {slideshowData.map((slide, index) => (
                    <Image src={slide} key={index} className={styles.slide}/>
                ))}
            </div>
            <div className={styles.slideshow__buttons}>
                {slideshowData.map((_, idx) => (
                    <div className={`${styles.slideshow__button} ${index===idx?styles.active:""}`} onClick={()=> setIndex(idx)} key={idx}></div>
                ))}
            </div>
            <div>
                {userData.type_user==='buyer' && <button style={{marginBottom: "1rem"}} onClick={manageFavourites}>Save to Favourites</button>}
                {(userData.type_user==='seller' && users===userData.username) && <button style={{marginBottom: "1rem"}} onClick={editProperty}>Edit the Property</button>}
            </div>
        </div>
    );
}

export default SlideShow_Main;