import styles from './Navbar.module.css';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link'
import {setUserInfo} from '../../Redux/ducks/userInfo';
import Router from 'next/router';

const Navbar = () => {
    // rendered_menu = []
    // if(type_user === 'buyer'){
        
    // }
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userInfo.userInfo_data);
    console.log("This is new name", userData.type_user==='buyer'); 
    
    const renderNavbar = () => {
        let renderMenu;
        if(userData.type_user === 'buyer'){
            renderMenu = [
                {
                    name: 'Home',
                    href: '/'
                },
                {
                    name: 'Favourites',
                    href: '/favourites'
                },
            ]
        }
        else if(userData.type_user === 'seller'){
            renderMenu = [
                {
                    name: 'Home',
                    href: '/'
                },
                {
                    name: 'Register',
                    href: '/registration'
                },
                {
                    name: 'Your Listings',
                    href: '/yourListings'
                },
            ]
        }
        else{
            renderMenu = [
                {
                    name: 'Home',
                    href: '/'
                },
                {
                    name: 'Login',
                    href: '/login'
                },
                {
                    name: 'SignUp',
                    href: '/signup'
                },
            ]
        }

        return renderMenu.map((item, index) => (<Link href={item.href} key={index}><a>{item.name}</a></Link>))
            
    }

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(setUserInfo({username: '', type_user: ''}));
        Router.push('/')
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__logo}>
                Ghar
            </div>
            <div className={styles.navbar__links}>
                {renderNavbar()}
                {userData.type_user !== '' && <a onClick={handleLogOut} style={{cursor: 'pointer'}}>Log Out</a>}
            </div>
        </div>
    );
}

export default Navbar;