"use client"

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation'
import PortableText from "react-portable-text"
import SwiperHandler from "@/components/SwiperHandler/SwiperHandler";
import StarRatings from "react-star-ratings/build/star-ratings";




export default function Page() {


    const [productData, setProductData] = useState({});
    const [variantData, setVariantData] = useState([]);
    const [variantImageData, setVariantImageData] = useState([]);
    const [contentData, setContentData] = useState([]);
    const [colorIndex, setColorIndex] = useState(0);


    const pathname = usePathname();
    const id = pathname.slice(6);
    const imagesData = getVariantImages(variantImageData);
    const imagesURLArr = URLArrGen(imagesData);
    const colorsArr = getColors(variantData);

    //const productImages = getVariantImages(productVariants);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();
                setProductData(result.result[0]);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchVariantData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setVariantData(result.result[0].productVariants);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVariantData();
    }, [id,colorIndex]);

    useEffect(() => {
        const fetchVariantImageData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setVariantImageData(result.result[0].productVariants[colorIndex].variantImages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVariantImageData();
    }, [id,colorIndex]);

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setContentData(result.result[0].content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchContentData();
    }, [id]);




console.log(productData);



    return (
        <div className="productPage">

            <div>
                <div className="projectTop"></div>

            </div>
            <div className="productContainer">
                <div className="shopImgContainer">
                    <SwiperHandler swiperArr = {imagesURLArr}/>
                </div>
                <div className="productInfo">
                    <h1> {productData.title}</h1>
                    <h2> {productData.detail}</h2>
                    <h2> ${productData.price}.00</h2>

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



                    <h2 style={{textTransform: 'capitalize'}}>
                        Color: {colorsArr[colorIndex]}
                    </h2>

                    <div className="colorContainer">
                        {variantData.map((color, index) => (
                            <button
                                onClick={() => setColorIndex(index)}
                                key={index}
                                style={{
                                    backgroundColor: color.color,
                                    width: '50px',
                                    height: '50px',
                                    border: '2px solid black',
                                    margin: '10px',
                                    padding: '20px',
                                    cursor: 'pointer'
                                }}
                            ></button>
                        ))}
                    </div>

                </div>
            </div>
            <div className="ptContainer">

                <div className="ptArea">
                    <PortableText
                        content={contentData}
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



function getProduct(props){
    const PROJECT_ID = "xx2b8ubw";
    const DATASET = "production";
    const ID = props;
    const QUERYA = "*%5B_id%20%3D%3D%20";
    const QUERYB = "%5D";
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERYA}"${ID}"${QUERYB}`;
    //const URL = `https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${ID}"%5D`;
    //const URL = 'https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20%22ec6c09a1-5063-4a7b-b775-c713437f2136%22%5D';
    const products = fetch(URL);
    return products.json();
}



function URLArrGen(props){
    const URLArr = [];
    props.map((i) => (
        URLArr.push(getImgURL(i))
    ))
    return URLArr;
}
function getImgURL(props){
    const img1slice = props.slice(6);
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
function getVariantImages(data){

    const itemArr = [];
        itemArr.push(data)
    const imgObjArr =
    itemArr.map((item,i) => (
        Object
            .keys(item)
            .map(k => item[k].asset._ref)
    ))
    const imgArr = imgObjArr[0];
    return imgArr;
}
