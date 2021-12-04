import styles from "./ListProperty.module.css";
import {Details} from "./Details";
import SlideShow from "../SlideShow/SlideShow";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

const ListProperty = ({address}) => {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get(address).then(res => {
            console.log("This is the data", res.data.data);
            setDetails(res.data.data);
        })
    }, [])
    
    const redirectProperty = (e, id) => {
        e.preventDefault();
        Router.push(`/details/${id}`);
    }

    return (
        <div className={styles.listproperty}>
            <div style={{textAlign: "center", margin: "3rem", marginTop: "2rem", color: "#123C69"}}><h1>Listed Property</h1><div style={{ height: "0.2rem", background: "#AC3B61"}}></div></div>
            <div className={styles.listproperty_repeater}>
                {details.map(detail => (
                    <div className={styles.listproperty_repeater_item} key={detail.p_id} onClick={(e)=>redirectProperty(e, detail.p_id)}>
                        <SlideShow passId={detail.p_id}/>
                        <div className={styles.listproperty__details}>
                            <h1>{detail.shortDes}</h1>
                            <p><strong>Address: </strong>{detail.p_address}</p>
                            <p><strong>Area: </strong>{detail.p_area}</p>
                            <p><strong>Rent: </strong>{detail.rent}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProperty;