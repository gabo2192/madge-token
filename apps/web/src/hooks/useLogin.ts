import { getCsrfToken, signIn } from "next-auth/react";
import { useCallback } from "react";
import { useAccount, useSignMessage } from "wagmi";

// A simple demo React hook for managing login state
function useLogin() {
  const { signMessageAsync } = useSignMessage();

  const { address } = useAccount();

  const login = useCallback(async (redirect?: string) => {
    try {
      const csrf = await getCsrfToken();
      if (!address || !csrf) {
        return;
      }
      const message = `Sign this message to sign in to the app ${csrf}`;

      const signature = await signMessageAsync({ message });
      await signIn("credentials", {
        message: message,
        redirect: false,
        signature: signature,
        callbackUrl: redirect,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { login };
}

export default useLogin;
