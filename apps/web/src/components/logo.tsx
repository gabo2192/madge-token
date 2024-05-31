import Image from "next/image";
import logo from "../../public/logo.jpeg";

interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  return (
    <Image
      src={logo}
      alt="Madge Token"
      width={200}
      height={200}
      className={className}
    />
  );
}
