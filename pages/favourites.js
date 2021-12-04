import ListProperty from "../Components/ListProperty/ListProperty";
import Navbar from "../Components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";

const Favourites = () => {
    const userData = useSelector((state) => state.userInfo.userInfo_data);
    return (
        <div>
            <Navbar />
            <ListProperty address={`http://127.0.0.1:5000/find/favourites/${userData.username}`}/>
        </div>
    );
}

export default Favourites;