import styles from './FirstPage.module.css';
import Logo from '../../Assets/logo.jpeg';
import Image from 'next/Image';

const FirstPage = () => {
    return (
        <div className={styles.FirstPage}>
            <div className={styles.FirstPage__title}>
                <Image src={Logo} width={250} height={200}/>
                <h1 className={styles.firstPage__title}>GHAR</h1>
                <p className={styles.firstPage__subtitle}>India's No. 1 Property Portal</p>
            </div>
        </div>
    );
}

export default FirstPage;