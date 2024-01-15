"use client";

import React from 'react';
import Image from "next/image";


export default function ImageHandler(props){
    const img1RefName = props.imgName;
    const img1slice = img1RefName.slice(6);
    const lastDashIndex = img1slice.lastIndexOf("-");
    const img1FileName = img1slice.slice(0, lastDashIndex) + "." + img1slice.slice(lastDashIndex + 1);
    const img1URL = 'https://cdn.sanity.io/images/xx2b8ubw/production/'+ img1FileName;

    return (
        <div>
            <img
                src={img1URL}
                alt={props.title}
            />
        </div>

    );
};

