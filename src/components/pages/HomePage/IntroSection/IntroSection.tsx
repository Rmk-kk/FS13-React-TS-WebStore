import './_intro-section.scss'
import React, {useContext} from "react";
import {Container} from "@mui/material";
import {ThemeContext} from "../../../ThemeContext";

const WomenImage = require('../../../../assets/img/intro/women.jpg')
const ClothImage = require("../../../../assets/img/intro/cloths.jpg");
const IntroSection = () => {
    const {darkMode} = useContext(ThemeContext)

    return (
        <div className={darkMode ? 'intro-section intro-section-dark' : 'intro-section'}>
            <Container maxWidth='lg' className='intro-section_wrap'>
                <h2 className='intro-section_wrap-heading'>The Leading Nordic online store for different apparel </h2>
            </Container>
            <section className='intro-section_intro'>
                <h1 className='intro-section_title'>Everything you will ever need in one place</h1>
                <iframe className='intro-section_spline' src='https://my.spline.design/miniroomcopy-73cef3f0e430711614a2e2da8f20a602/' frameBorder='0'/>
            </section>
            <div className='intro-section_photos'>
                <img src={WomenImage} alt="woman"/>
                <img src={ClothImage} alt="intro"/>
            </div>
        </div>
    )
}

export default IntroSection