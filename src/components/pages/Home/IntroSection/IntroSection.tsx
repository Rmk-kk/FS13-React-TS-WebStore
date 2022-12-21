import './intro-section.scss'

import React from "react";
import {Container} from "@mui/material";

const IntroSection = () => {
    return (
        <>
            <Container maxWidth='lg' className='intro-section_wrap'>
                <h2 className='intro-section_wrap-heading'>The Leading Nordic online store for different apparel </h2>
            </Container>
            <section className='intro-section_intro'>
                <h1 className='intro-section_title'>Everything you will ever need in one place</h1>
                <iframe className='intro-section_spline' src='https://my.spline.design/miniroomcopy-73cef3f0e430711614a2e2da8f20a602/' frameBorder='0'/>
            </section>
            <div className='intro-section_photos'>
                <img src="../img/intro/women.jpg" alt="woman"/>
                <img src="../img/intro/cloths.jpg" alt="intro"/>
            </div>

        </>
    )
}

export default IntroSection