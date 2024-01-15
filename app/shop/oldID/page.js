"use client"

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation'
import PortableText from "react-portable-text"
import SwiperHandler from "@/components/SwiperHandler/SwiperHandler";
import StarRatings from "react-star-ratings/build/star-ratings";




export default async function Page() {
    const pathname = usePathname();
    const id = pathname.slice(6);
    const productData = await getProduct(id);
    const product = productData.result[0];
    const imagesArr = product.images;
    const productVariants = product.productVariants;
    const colors = getColors(productVariants);
    const productImages = getVariantImages(productVariants);







    return (
        <div className="productPage">

            <div>
                <div className="projectTop"></div>

            </div>
            <div className="productContainer">
                <div className="shopImgContainer">
                    <SwiperHandler swiperArr = {URLArrGen2(productImages)}/>
                </div>
                <div className="productInfo">
                    <h1> {product.title}</h1>
                    <h2> {product.detail}</h2>
                    <h2> {product.price}</h2>

                    <div className="productRatingContainer">
                        <StarRatings
                            rating={getRandomInt(3,5)}
                            starRatedColor="#ADA18F"
                            starEmptyColor="#CFC7BC"
                            numberOfStars={5}
                            name='rating'
                            starDimension="15px"
                            starSpacing="2px"
                        />
                        <div>(23)</div>
                    </div>



                    <h2> {product.color}</h2>

                    <div className="colorContainer">
                        {colors.map((color, index) => (
                            <div

                                key={index}
                                style={{
                                    backgroundColor: color,
                                    width: '50px',
                                    height: '50px',
                                    border: '2px solid black',
                                    margin: '10px',
                                    padding: '20px'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="ptContainer">

                <div className="ptArea">
                    <PortableText
                        content={product.content}
                        serializers={{
                            ul: ({ children }) => <ul className="ptUL">{children}</ul>,
                            li: ({ children }) => <li className="ptLI">{children}</li>
                        }}
                    />
                </div>
            </div>
        </div>
    );
};



async function getProduct(props){
    const PROJECT_ID = "xx2b8ubw";
    const DATASET = "production";
    const ID = props;
    const QUERYA = "*%5B_id%20%3D%3D%20";
    const QUERYB = "%5D";
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERYA}"${ID}"${QUERYB}`;
    //const URL = 'https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20%22ec6c09a1-5063-4a7b-b775-c713437f2136%22%5D';
    const products = await fetch(URL);
    return products.json();
}

function getImgURL(props){
    const img1RefName = props.asset._ref;
    const img1slice = img1RefName.slice(6);
    const lastDashIndex = img1slice.lastIndexOf("-");
    const img1FileName = img1slice.slice(0, lastDashIndex) + "." + img1slice.slice(lastDashIndex + 1);
    return 'https://cdn.sanity.io/images/xx2b8ubw/production/'+ img1FileName;
}

function URLArrGen(props){
    const URLArr = [];
    props.map((i) => (
        URLArr.push(getImgURL(i))
    ))
    return URLArr;
}
function getImgURL2(props){
    const img1RefName = props;
    const img1slice = img1RefName.slice(6);
    const lastDashIndex = img1slice.lastIndexOf("-");
    const img1FileName = img1slice.slice(0, lastDashIndex) + "." + img1slice.slice(lastDashIndex + 1);
    return 'https://cdn.sanity.io/images/xx2b8ubw/production/'+ img1FileName;
}

function URLArrGen2(props){
    const URLArr = [];
    props.map((item, i) => (
        URLArr.push(getImgURL2(item))
    ))
    return URLArr;
}
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function getColors(props){
    const colorArr = [];
    props.map((color, i) => (
        colorArr.push(props[i].color)
    ))
    return colorArr;
}
function getVariantImages(props){

    const itemArr = [];
    props.map((item, i) => (
        itemArr.push(props[i].variantImages)
    ))
    const flatArr = itemArr.flat();
    const assetArr = [];
    flatArr.map((asset, i) => (
        assetArr.push(flatArr[i].asset)
    ))
    const imgArr = [];
    assetArr.map((img, i) => (
        imgArr.push(assetArr[i]._ref)
    ))
    return imgArr;
}
