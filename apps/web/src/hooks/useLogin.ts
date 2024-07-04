import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAccount, useSignMessage } from "wagmi";

interface Props {
  redirect?: string;
  address?: `0x${string}`;
}

function useLogin() {
  const { signMessageAsync } = useSignMessage();

  const { address: addr } = useAccount();
  const router = useRouter();

  let address = addr;

  const login = useCallback(async ({ address: _address, redirect }: Props) => {
    if (!address) {
      address = _address;
    }
    try {
      const csrf = await getCsrfToken();

      if (!csrf || !address) {
        return;
      }
      const message = `Sign this message to sign in to the app ${csrf}`;

      const signature = await signMessageAsync({ message });
      const data = await signIn("credentials", {
        message: message,
        redirect: false,
        signature: signature,
        callbackUrl: redirect,
      });
      if (data?.url) {
        router.push(data.url);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { login };
}

export default useLogin;
