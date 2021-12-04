import Navbar from "../../Components/Navbar/Navbar";
import ListProperty from "../../Components/ListProperty/ListProperty";
import SlideShow_Main from "../../Components/SlideShow_Main/SlideShow_Main";
import FirstPage from "./FirstPage";

const LandingPage = () => {
    return (
        <div>
            <Navbar/>
            <FirstPage/>
            <ListProperty address={"http://127.0.0.1:5000/property/getAll"}/>
        </div>
    );
}
 
export default LandingPage;