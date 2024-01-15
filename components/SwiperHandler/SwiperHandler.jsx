"use client"

import React, {useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Thumbs} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const SwiperHandler = (props) => {
    const imagesArr = props.swiperArr;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className="swiperContainer">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#141414',
                    '--swiper-pagination-color': '#141414',
                }}
                modules={[Navigation, Thumbs]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                loop={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
                observer={true}
                observeParents={true}

            >
                {imagesArr.map((item,i) => (
                    <SwiperSlide><img key={i} className="swiperImg" src={imagesArr[i]} alt=""/></SwiperSlide>
                ))}

            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={0}
                slidesPerView={2}
                watchSlidesProgress={false}
                modules={[Navigation, Thumbs]}
                className="mySwiper"
                direction={"horizontal"}
                observer={true}
                observeParents={true}
            >
                {imagesArr.map((item,i) => (
                    <SwiperSlide><img key={i} className="swiperThumb" src={imagesArr[i]} alt=""/></SwiperSlide>
                ))}


            </Swiper>
        </div>
    );
};

export default SwiperHandler;