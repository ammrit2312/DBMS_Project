import Head from 'next/head'
import Image from 'next/image'
import LandingPage from '../Containers/LandingPage/LandingPage'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Landing Page */}
      <LandingPage/>
    </div>
  )
}
