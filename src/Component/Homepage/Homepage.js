import React, { useState } from 'react'

import BusSearch from './BusSearch/BusSearch'
import Offer from './HomepageComponent/Offer'
import AboutUs from './HomepageComponent/AboutUs'
import Twit from './HomepageComponent/Twit'
import FooterSection from './HomepageComponent/FooterSection'

import offersData from '../../Static/OffersData'
import twitsData from '../../Static/Twits'
import classes from './Homepage.module.css'






export default function Homepage() {

    return (
        <div>
            <div className={classes.main_container}>
                <div className={classes.container}>
                    <BusSearch />

                </div>
            </div>
            <div className={classes.offers}>
                {offersData.map(offer1 => <Offer key={offer1.title} offerData={offer1} />)}
            </div>
            <div className={classes.aboutUs}>
                <AboutUs />
            </div>
            <div className={classes.offers}>
                {twitsData.map(offer1 => <Twit key={offer1.title} offerData={offer1} />)}
            </div>
            <div className={classes.aboutUs}>
                <FooterSection />
            </div>


        </div >
    )
}
