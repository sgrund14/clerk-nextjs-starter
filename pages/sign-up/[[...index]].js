import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useCallback } from "react";

export const getServerSideProps = async (context) => {
  console.log("SIGN UP PAGE GET SERVER SIDE PROPS RUN");
  return { props: {} };
};

const SignUpPage = () => {
  const router = useRouter();
  const { signUp, setSession } = useSignUp();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [showTokenInput, setShowTokenInput] = useState(false);

  const onEmailSubmit = useCallback(async () => {
    try {
      await signUp?.create({
        emailAddress: email,
      });
      await signUp?.prepareEmailAddressVerification();
      setShowTokenInput(true);
    } catch (e) {
      console.log(e.errors[0].message);
    }
  }, [email, signUp]);

  const onTokenSubmit = useCallback(async () => {
    try {
      const newSignUp = await signUp?.attemptEmailAddressVerification({
        code: token,
      });
      if (newSignUp.createdUserId) {
        await setSession?.(newSignUp.createdSessionId);
        router.push("/user");
      }
    } catch (e) {
      console.log(e);
    }
  }, [token, router, signUp, setSession]);

  return (
    <div>
      <input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {showTokenInput && (
        <>
          <p>Temporary login code sent to {email}</p>
          <input label="Login code" value={token} onChange={(e) => setToken(e.target.value)} />
        </>
      )}
      <button onClick={showTokenInput ? onTokenSubmit : onEmailSubmit}>
        {showTokenInput ? "Continue with login code" : "Continue with email"}
      </button>
      <Link href="/sign-in">Go To Sign In</Link>
    </div>
  );
};

export default SignUpPage;
