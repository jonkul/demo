import Navbar from "./Navbar";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import cn from "classnames";

import { useRouter } from "next/router";

export default function Header() {
  function logic(route) {
    if (route === "/") {
      if (window.scrollY > 2) {
        setScroll(true);
        setHeaderClass(headerScroll);
        setLogoClass(logoScroll);
      } else if (window.scrollY < 3) {
        setScroll(false);
        setHeaderClass(headerTop);
        setLogoClass(logoTop);
      }
    } else if (route !== "/") {
      setScroll(true);
      setHeaderClass(headerScroll);
      setLogoClass(logoScroll);
    }
  }

  // joined classname variables to use in states
  const headerScroll = [styles.header, styles.scroll].join(" ");
  const headerTop = [styles.header, styles.top].join(" ");
  const logoScroll = [
    styles.logocontainer,
    styles.logoscroll,
    styles.fadein,
  ].join(" ");
  const logoTop = [
    styles.logocontainer,
    styles.logotop,
    styles.delayedfadein,
  ].join(" ");

  const router = useRouter();

  // initial states
  const [route, setRoute] = useState(router.asPath);

  // checks
  const routeIndex = route === "/";

  // more initial states
  const [scroll, setScroll] = useState(); // routeIndex ? false : true
  const [headerClass, setHeaderClass] = useState(
    routeIndex ? headerTop : headerScroll
  );
  const [logoClass, setLogoClass] = useState(routeIndex ? logoTop : logoScroll);

  // eventlistener on scroll, to check if window scrolled
  useEffect(() => {
    window.addEventListener("scroll", () => {
      logic(route);
    });
  }, [route]);

  // populate initial states based on path and scroll status
  useEffect(() => {
    setRoute(router.asPath);
    logic(router.asPath);
  }, [router]);

  return (
    <>
      {/* header wrapper */}
      <header className={headerClass}>
        {/* headerleft */}
        <div className={styles.headerleft}></div>

        {/* mid logocontainer & logo */}
        <div className={logoClass}>
          <Link href="/">
            <a>
              <Image
                src="/images/logo.svg"
                alt="Ekvalls Fastigheter AB logo"
                layout="fill"
                // objectFit="cover"
                quality={100}
              />
            </a>
          </Link>
        </div>

        {/* headerright & burger menu & navbar */}
        <div className={styles.headerright}>
          <Navbar />
        </div>
      </header>
    </>
  );
}
