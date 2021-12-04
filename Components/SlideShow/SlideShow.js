import styles from './SlideShow.module.css';
import Image from 'next/image';
// import First from '../../Assets/first.jpeg';
// import Second from '../../Assets/second.jpeg';
// import Third from '../../Assets/third.jpeg';
// import Data from '../../Assets/data.jpg';
import { useState, useEffect } from 'react';
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


const SlideShow = ({passId}) => {
    const slideshowData = []
    if(passId === "p_1"){
        slideshowData = [First1, Second1, Third1]
    }
    else if(passId === "p_2"){
        slideshowData = [First2, Second2, Third2]
    }
    else if(passId === "p_3"){
        slideshowData = [First3, Second3, Third3]
    }
    else if(passId === "p_4"){
        slideshowData = [First4, Second4, Third4]
    }
    else{
        slideshowData = [First, Second, Third]
    }

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
        </div>
    );
}

export default SlideShow;