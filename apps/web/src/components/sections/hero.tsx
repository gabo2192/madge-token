import { Logo } from "@/assets/logo";

export function Hero() {
  return (
    <>
      <h1 className="font-koulen text-6xl text-center">Madge Coin</h1>
      <p className="text-base font-medium text-center text-brand">
        The 1st memecoin on Rootstock.
      </p>
      <div className="flex justify-center">
        <Logo />
      </div>
    </>
  );
}
