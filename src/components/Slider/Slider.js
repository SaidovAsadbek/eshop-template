import React, { useEffect, useState } from "react";
import "./Slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderLength = sliderData.length;
    // console.log(sliderLength); // 4 3

    // automatically scroll
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === sliderLength - 1 ? 0 : currentSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? sliderLength - 1 : currentSlide - 1
        );
    };

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            function auto() {
                slideInterval = setInterval(nextSlide, intervalTime);
            }
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [autoScroll, slideInterval, currentSlide]);

    return (
        <div className="slider">
            <AiOutlineArrowLeft onClick={prevSlide} className="arrow prev" />
            <AiOutlineArrowRight onClick={nextSlide} className="arrow next" />

            {/* slider-data */}
            {sliderData.map((slide, index) => {
                const { image, heading, desc } = slide;
                return (
                    <div
                        className={
                            index === currentSlide ? "slide current" : "slide"
                        }
                        key={index}>
                        {index === currentSlide && (
                            <>
                                <img src={image} alt={heading} />
                                <div className="content">
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr />
                                    <a
                                        href="#product"
                                        className="--btn --btn-primary">
                                        Shop Now
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
