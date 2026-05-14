import React from 'react'
import Navbar from '../../components/Navbar'
import {Link} from 'react-router-dom'
import landing from '../../assests/landing.jpg';
import styles from './Landing.module.css'

function Landing() {
  return (
    <>
        <Navbar active={"home"}/>
        <div className={styles.landing__wrapper}>
            <div className={styles.landing__text}>
                <h1>Schedule Your Daily Tasks With <span className="primaryText">ToDo!</span></h1>
              <div className='btnWrapper'>
              <Link to="/register" className="primaryBtn">Register</Link>
              <Link to="/login" className='secondaryBtn'>Login</Link>
              </div>
            </div>

            <div className={styles.landing__img}>
                <img src={landing} alt="landing" />
            </div>
      </div>
    </>
  )
}

export default Landing