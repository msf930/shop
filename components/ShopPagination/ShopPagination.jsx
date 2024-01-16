

import React from 'react';
import { createClient } from "next-sanity";
import ShopItem from "@/components/ShopItem/ShopItem";
import Link from "next/link";

export default async function ShopPagination({ products }){
    return (
        <div className="shopItemArea">
            <div className="shopTitle">SHOP</div>
            {products.length > 0 &&
                products.map((item, i) => (
                    <div key={i}>

                            <ShopItem
                                link={`/shop/${encodeURIComponent(item._id)}`}
                                variants={item.productVariants}
                                img1={item.img1}
                                img2={item.img2}
                                title={item.title}
                                detail={item.detail}
                                price={item.price}
                                rank={item.rank}
                                special={item.special}
                            />

                    </div>
                ))
            }
        </div>
    );
}

