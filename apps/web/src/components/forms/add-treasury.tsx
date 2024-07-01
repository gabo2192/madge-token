"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import config from "@/lib/contracts-config";
import { MadgeCasino__factory } from "@/typechain-types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useWatchContractEvent, useWriteContract } from "wagmi";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";

export function AddTreasury() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [requestId, setRequestId] = useState<number | null>(null);

  const formSchema = z.object({
    tokenAddress: z.string(),
    tokenName: z.string(),
    tokenTicker: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: "",
      tokenName: "",
      tokenTicker: "",
    },
  });
  console.log({ requestId });
  useWatchContractEvent({
    address: config.casinoContract,
    abi: MadgeCasino__factory.abi,
    eventName: "TreasuryCreated",
    onLogs(logs) {
      console.log({ logs });
      const userData = logs.find(
        (log) => log.args.owner === session?.user.pubkey
      );
      if (userData && userData.args.requestId) {
        updateTreasuryStatus(userData.args.requestId);
      }
    },
    args: {
      owner: session?.user.pubkey as `0x${string}`,
      requestId: requestId,
    },
    enabled: !!requestId,
  });

  const { writeContractAsync } = useWriteContract();

  async function updateTreasuryStatus(requestId: number) {
    try {
      await axios.put("/api/coin-flipper/treasury", {
        id: requestId,
        status: "active",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRequestId(null);
      setLoading(false);
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { data: response } = await axios.post<number>(
        "/api/coin-flipper/treasury",
        data
      );

      await writeContractAsync({
        abi: MadgeCasino__factory.abi,
        address: config.casinoContract,
        functionName: "createTreasury",
        args: [response, data.tokenAddress as `0x${string}`],
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2 className="text-center">Add your game token here</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col pb-10 gap-4  mt-4 p-4 border border-slate-700 w-96 mx-auto"
        >
          <FormField
            control={form.control}
            name="tokenName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bet">Token Name:</FormLabel>
                <Input
                  {...field}
                  type="text"
                  className="bg-background/80 "
                  placeholder="Madge Coin"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bet">Token Address:</FormLabel>
                <Input
                  {...field}
                  type="text"
                  className="bg-background/80 "
                  placeholder="0x12345"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenTicker"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bet">Token Symbol:</FormLabel>
                <Input
                  {...field}
                  type="text"
                  className="bg-background/80 "
                  placeholder="$MAD"
                />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="px-10"
            disabled={form.formState.disabled || loading}
          >
            Create Treasury
          </Button>
        </form>
      </Form>
    </>
  );
}
