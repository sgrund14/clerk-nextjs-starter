import styles from "/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const handleSignout = useCallback(() => {
    signOut(() => {
      router.push("/");
    });
  }, [router, signOut]);
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <a className={styles.logo}>
            <Image src="/logo.svg" width="32" height="32" alt="Logo" />
            <span className={styles.appName}>Your application</span>
          </a>
        </Link>
      </div>
      <div className={styles.right}>
        <SignedOut>
          <Link href="/sign-in">Sign in</Link>
        </SignedOut>
        <SignedIn>
          <button onClick={handleSignout}>Sign out</button>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
