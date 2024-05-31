"use client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Stepper() {
  const pathname = usePathname();
  const singInPath = () => {
    if (pathname === "/sign-in") {
      return "current";
    }
    if (pathname === "/") {
      return "upcoming";
    }
    return "complete";
  };

  const checkEligibilityPath = () => {
    if (pathname === "/not-eligible") {
      return "error";
    }
    if (
      pathname === "/check-eligibility" ||
      pathname === "/claim" ||
      pathname === "/already-claimed" ||
      pathname === "/success"
    ) {
      return "complete";
    }
    return "upcoming";
  };
  const checkClaimPath = () => {
    if (pathname === "/check-eligibility") {
      return "current";
    }
    if (pathname === "/already-claimed" || pathname === "/success") {
      return "complete";
    }
    return "upcoming";
  };

  const steps = [
    {
      name: "Connect wallet to sign-in",
      href: "/",
      status: pathname === "/" ? "current" : "complete",
    },
    {
      name: "You’ll be asked to verify a message to confirm",
      href: "/sign-in",
      status: singInPath(),
    },
    {
      name: "Check eligibility",
      href: "/check-eligibility",
      status: checkEligibilityPath(),
    },
    {
      name: "Claim your $MAD - Network fees apply ",
      href: "/check-eligibility",
      status: checkClaimPath(),
    },
  ];

  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={clsx(
              stepIdx !== steps.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-[#ff9100]"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={step.href}
                  className="group relative flex items-start"
                >
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff9100] group-hover:bg-[#ff9100]-foreground">
                      <CheckIcon
                        className="h-5 w-5 text-foreground"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col h-9 justify-center">
                    <span className="uppercase text-black block">
                      {step.name}
                    </span>
                  </span>
                </Link>
              </>
            ) : step.status === "current" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-black"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={step.href}
                  className="group relative flex items-start"
                  aria-current="step"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#ff9100] bg-foreground">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff9100]" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col h-9 justify-center">
                    <span className="uppercase text-black block">
                      {step.name}
                    </span>
                  </span>
                </Link>
              </>
            ) : step.status === "error" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-black"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                      <Cross2Icon
                        className="h-5 w-5 text-foreground"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="uppercase">{step.name}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-black"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={step.href}
                  className="group relative flex items-start"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-foreground group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-black" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col h-9 justify-center">
                    <span className="uppercase text-black block">
                      {step.name}
                    </span>
                  </span>
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
