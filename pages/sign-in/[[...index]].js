import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useCallback } from "react";

export const getServerSideProps = async (context) => {
  console.log("SIGN IN PAGE GET SERVER SIDE PROPS RUN");
  return { props: {} };
};

const SignUpPage = () => {
  const router = useRouter();
  const { signIn, setSession } = useSignIn();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [showTokenInput, setShowTokenInput] = useState(false);

  const onEmailSubmit = useCallback(async () => {
    try {
      await signIn?.create({
        emailAddress: email,
      });
      await signIn?.prepareFirstFactor();
      setShowTokenInput(true);
    } catch (e) {
      console.log(e.errors[0].message);
    }
  }, [email, signIn]);

  const onTokenSubmit = useCallback(async () => {
    try {
      const newSignUp = await signIn?.attemptFirstFactor({
        code: token,
      });
      if (newSignUp.createdUserId) {
        await setSession?.(newSignUp.createdSessionId);
        router.push("/user");
      }
    } catch (e) {
      console.log(e);
    }
  }, [token, router, signIn, setSession]);

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
      <Link href="/sign-up">Go To Sign Up</Link>
    </div>
  );
};

export default SignUpPage;
