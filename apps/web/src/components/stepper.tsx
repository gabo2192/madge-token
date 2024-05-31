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
      name: "Connect your wallet",
      description: "We need to connect your wallet to get started.",
      href: "/",
      status: pathname === "/" ? "current" : "complete",
    },
    {
      name: "Sign in",
      description: "You have to verify a message to sign in.",
      href: "/sign-in",
      status: singInPath(),
    },
    {
      name: "Check eligibility",
      description: "You can check if you are eligible for the airdrop.",
      href: "/check-eligibility",
      status: checkEligibilityPath(),
    },
    {
      name: "Claim $MAD",
      description: "You can claim your $MAD tokens here.",
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
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={step.href}
                  className="group relative flex items-start"
                >
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary group-hover:bg-primary-foreground">
                      <CheckIcon
                        className="h-5 w-5 text-foreground"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </Link>
              </>
            ) : step.status === "current" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-muted"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={step.href}
                  className="group relative flex items-start"
                  aria-current="step"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-foreground">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-primary">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </Link>
              </>
            ) : step.status === "error" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-muted"
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
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-muted"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={step.href}
                  className="group relative flex items-start"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-foreground group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-muted" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
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
