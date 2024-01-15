
import Image from 'next/image'

import logo from "../public/ARCHER.png"
import topo from '../public/topo.jpg'
import topo2 from '../public/topo2.jpg'
import topo3 from '../public/topo3.jpg'
import topo4 from '../public/topo4.jpg'

import ShopPagination from "@/components/ShopPagination/ShopPagination";

import React, from "react";
import ShopItem from "@/components/ShopItem/ShopItem";



export default async function Home() {
    const productData = await getProducts();
    const products = productData.result;
    return (
        <div className="ct" id="t1">
            <div className="ct" id="t2">
                <div className="ct" id="t3">
                    <div className="ct" id="t4">
                        <div className="ct" id="t5">
                            <div className="ct" id="tS">
                                <ul id="menu">
                                    <a href="#t1">
                                        <li className="icon" id="uno">HOME</li>
                                    </a>
                                    <a href="#t2">
                                        <li className="icon" id="dos">SHOP</li>
                                    </a>
                                    <a href="#t3">
                                        <li className="icon" id="tres">MEDIA</li>
                                    </a>
                                    <a href="#t4">
                                        <li className="icon" id="cuatro">ABOUT</li>
                                    </a>
                                    <a href="#t5">
                                        <li className="icon" id="cinco">CONTACT</li>
                                    </a>
                                </ul>
                                <div className="page" id="p1">
                                    <div className="colorFilter">
                                        <section className="icon">
                                            <Image
                                                src={logo}
                                                alt={logo}
                                                priority={true}
                                            />
                                        </section>
                                    </div>

                                </div>
                                <div className="page" id="p2">
                                    <Image
                                        className="pageBackground"
                                        src={topo}
                                        alt='topoBG'
                                        priority={true}
                                        placeholder='blur'
                                        layout='fill'
                                        objectFit='cover'
                                        objectPosition='center'
                                        />
                                    <ShopPagination products={products}/>


                                </div>
                                <div className="page" id="pS">
                                    <Image
                                        className="pageBackground"
                                        src={topo}
                                        alt='topoBG'
                                        priority={true}
                                        placeholder='blur'
                                        layout='fill'
                                        objectFit='cover'
                                        objectPosition='center'
                                    />
                                    <section className="icon"><span className="title">TEST</span></section>
                                </div>
                                <div className="page" id="p3">
                                    <Image
                                        className="pageBackground"
                                        src={topo2}
                                        alt='topoBG'
                                        priority={true}
                                        placeholder='blur'
                                    />
                                    <section className="icon fa fa-rocket"><span className="title">MEDIA</span></section>
                                </div>
                                <div className="page" id="p4">
                                    <Image
                                        className="pageBackground"
                                        src={topo3}
                                        alt='topoBG'
                                        priority={true}
                                        placeholder='blur'
                                    />
                                    <section className="icon fa fa-dribbble">
                                        <span className="title">ABOUT</span>
                                    </section>
                                </div>
                                <div className="page" id="p5">
                                    <Image
                                        className="pageBackground"
                                        src={topo4}
                                        alt='topoBG'
                                        layout='fill'
                                        objectFit='cover'
                                        objectPosition='center'
                                        priority={true}
                                        placeholder='blur'
                                    />
                                    <section className="icon fa fa-plus-circle">
                                        <span className="title">CONTACT</span>

                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


)
}


async function getProducts(){
    const PROJECT_ID = "xx2b8ubw";
    const DATASET = "production";
    const QUERY = encodeURIComponent(`*[_type == "products"]`);

    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    console.log(URL);
    const products = await fetch(URL);


    return products.json()
}
