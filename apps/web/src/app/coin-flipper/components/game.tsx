"use client";

import config from "@/app/config";
import { MadgeCasino__factory, MadgeCoin__factory } from "@/typechain-types";
import { Button } from "@components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@components/form";
import { Input } from "@components/input";
import { Logo } from "@components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useReadContract,
  useSendTransaction,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { z } from "zod";

interface Props {}

export function Game() {
  const { data: session } = useSession();
  const { data, isLoading, status } = useReadContract({
    abi: MadgeCoin__factory.abi,
    address: config.tokenContract,
    functionName: "allowance",
    args: [session?.user.pubkey as `0x${string}`, config.casinoContract],
  });
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { writeContractAsync } = useWriteContract();
  const { sendTransactionAsync } = useSendTransaction();
  const [requestId, setRequestId] = useState<number | null>(null);

  useEffect(() => {
    console.log({ status });
    if (status === "success") {
      setBalance(Number(data) / 10 ** 8);
    }
  }, [status]);

  useWatchContractEvent({
    address: config.casinoContract,
    abi: MadgeCasino__factory.abi,
    eventName: "CoinFlipResult",
    onLogs(logs) {
      console.log({ logs });
      const userData = logs.find(
        (log) => log.args.user === session?.user.pubkey
      );
      if (userData) {
        const bet = Number(userData.args.betAmount) / 10 ** 8;
        const payout = Number(userData.args.payout) / 10 ** 8;
        const result = userData.args.result;
        setCurrent(result || 0);
        if (result === 0) {
          setHeads((heads) => heads + 1);
        } else {
          setTails((tails) => tails + 1);
        }
        if (userData.args.won) {
          setBalance(balance + payout);
        } else {
          setBalance(balance - bet);
        }
        setRequestId(null);
        setLoading(false);
      }
    },
    args: {
      user: session?.user.pubkey as `0x${string}`,
      requestId: BigInt(requestId || 0),
    },
    enabled: !!requestId,
  });
  const formSchema = z.object({
    value: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .gt(0)
      .lte(balance),
    option: z.number().lte(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      option: 0,
    },
  });
  const chances = 0.96;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { option, value } = values;
      const { data } = await axios.post("/api/coin-flipper", {
        option,
        value,
      });
      console.log({ data });
      const tx = {
        to: config.casinoContract,
        data: data.rawTransaction,
      };
      setRequestId(data.requestId);
      await sendTransactionAsync(tx);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const reset = () => {
    setHeads(0);
    setTails(0);
  };

  if (isLoading) {
    return <>Loading..</>;
  }

  return (
    <>
      <div className="flex flex-row gap-4 mb-4 items-center mt-4">
        <h3 className="text-2xl">Game Balance</h3>
        <p className="text-xl">{balance.toLocaleString()} $MAD</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row mb-4 items-center divide-x-2 divide-black">
            <FormField
              control={form.control}
              name="value"
              render={({ field, fieldState }) => (
                <FormItem className="px-4">
                  <FormLabel>Wager</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      {...field}
                      onChange={(event) => {
                        form.setValue("value", Number(event.target.value));
                        form.clearErrors();
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-black/60">
                    Edit this to update your wagger
                  </FormDescription>
                  {fieldState.error && (
                    <p className="text-destructive text-xs">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option"
              render={({ field, fieldState }) => (
                <FormItem className="px-4">
                  <FormLabel>Head or tails?</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-2">
                      <Button
                        onClick={() => form.setValue("option", 0)}
                        variant={field.value === 0 ? "secondary" : "ghost"}
                        className={clsx("w-full gap-1")}
                        type="button"
                      >
                        <span
                          className={clsx({
                            underline: field.value !== 0,
                          })}
                        >
                          Head
                        </span>
                        <span
                          className={clsx("text-[#FF9100]", {
                            block: field.value === 0,
                            hidden: field.value !== 0,
                          })}
                        >
                          +{form.getValues("value") * chances}
                        </span>
                        <span
                          className={clsx("text-destructive no-underline", {
                            block: field.value === 1,
                            hidden: field.value !== 1,
                          })}
                        >
                          -{form.getValues("value")}
                        </span>
                      </Button>
                      <Button
                        onClick={() => form.setValue("option", 1)}
                        variant={field.value === 1 ? "secondary" : "ghost"}
                        className={clsx("w-full gap-1", {
                          underline: field.value !== 1,
                        })}
                        type="button"
                      >
                        <span
                          className={clsx({
                            underline: field.value !== 1,
                          })}
                        >
                          Tail
                        </span>
                        <span
                          className={clsx("text-[#FF9100]", {
                            block: field.value === 1,
                            hidden: field.value !== 1,
                          })}
                        >
                          +{form.getValues("value") * chances}
                        </span>
                        <span
                          className={clsx("text-destructive", {
                            block: field.value === 0,
                            hidden: field.value !== 0,
                          })}
                        >
                          -{form.getValues("value")}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-black/60">
                    Select heads or tails
                  </FormDescription>
                  {fieldState.error && (
                    <p className="text-destructive text-xs">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center ">
            <div className="h-80 w-80 [perspective:800px]">
              <div
                className={clsx(
                  "relative h-full w-full rounded-full ring-1 [transform-style:preserve-3d]",
                  {
                    "animate-spinhorizon": loading,
                  }
                )}
              >
                <div
                  className={clsx(
                    "bg-neutral-100 rounded-full  flex min-h-full flex-col items-center justify-center [backface-visibility:hidden] ring-1 overflow-hidden border-[#FFD700] border-4",
                    {
                      "[transform:translateZ(0.5rem)]": current === 0,
                      "[transform:rotateY(180deg)]": current === 1,
                    }
                  )}
                >
                  <Logo />
                </div>
                <p className="w-2 [transform:rotateY(90deg)] h-full absolute top-0 "></p>
                <div
                  className={clsx(
                    "absolute inset-0 h-full w-full rounded-full bg-black px-12 text-center text-black border-4 border-[#FFD700]  [backface-visibility:hidden] flex flex-col justify-center ring-1",
                    {
                      "[transform:translateZ(0.5rem)]": current === 1,
                      "[transform:rotateY(180deg)]": current === 0,
                    }
                  )}
                >
                  <p className="text-lg">back</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-4 justify-center">
            <div className="flex flex-row gap-2">
              <h3>Heads</h3>
              <p>{heads}</p>
            </div>
            <div className="flex flex-row gap-2">
              <h3>Tails</h3>
              <p>{tails}</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-4 justify-center">
            <Button
              className="text-2xl h-10"
              disabled={loading || form.getValues("value") === 0}
              type="submit"
              variant="secondary"
            >
              Flip the coin
            </Button>
            <Button
              className="text-2xl h-10"
              type="button"
              disabled={loading || (!heads && !tails)}
              onClick={reset}
              variant="ghost"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
