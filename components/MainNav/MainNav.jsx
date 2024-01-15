"use client"

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNav = () => {
    const pathname = usePathname();
    return (
        <div>
            <div>
                <div className="flex flex-col gap-3">
                    <Link href="/" className={pathname === "/" ? "navItemActive" : "navItem"}>
                        Home
                    </Link>
                    <Link href="/shop" className={pathname === "/shop" ? "navItemActive" : "navItem"}>
                        Shop
                    </Link>
                    <Link href="/about" className={pathname === "/about" ? "navItemActive" : "navItem"}>
                        About
                    </Link>
                    <Link href="/contact" className={pathname === "/contact" ? "navItemActive" : "navItem"}>
                        Contact
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default MainNav;