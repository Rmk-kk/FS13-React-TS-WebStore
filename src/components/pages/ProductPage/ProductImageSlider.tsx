import {useContext, useState} from "react";
import {ThemeContext} from "../../ThemeContext";

interface ProductImageSliderProps {
    slides: string[]
}

const ProductImageSlider = (props:ProductImageSliderProps) => {
    const {darkMode} = useContext(ThemeContext);
    const {slides} = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeToPrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }

    const changeToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }

    const changeSlide = (index:number) => {
        setCurrentIndex(index)
    }

    return (
        <div className={darkMode ? 'slider-container slider-dark' : 'slider-container'}>
            <div className='slider-left_arrow' onClick={() => changeToPrev()}>&#10096;</div>
            <div className='slider-right_arrow' onClick={() => changeToNext()}>&#10097;</div>
            <div className='slider-slide'
                style={{backgroundImage: `url(${slides[currentIndex]})`
            }}>
            </div>
            <div className='slider-circles'>
                {slides.map((slide, index) => {
                    return <span className={(currentIndex === index) ? 'active-dot' : ''}
                                 onClick={() => changeSlide(index)}
                                 key={index}>&#11044;</span>
            })}
            </div>
        </div>
    )
}

export default ProductImageSlider