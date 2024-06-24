"use client";
import config from "@/app/config";
import { MadgeCoin__factory } from "@/typechain-types";
import { Button } from "@components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/form";
import { Input } from "@components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useReadContract, useWriteContract } from "wagmi";
import { z } from "zod";

const formSchema = z.object({
  value: z.number().positive().int(),
});

export function Balance() {
  const { data: session } = useSession();
  const { writeContractAsync } = useWriteContract();

  const { data: tokenBalance, isLoading: isLoadingBalance } = useReadContract({
    abi: MadgeCoin__factory.abi,
    address: config.tokenContract,
    functionName: "balanceOf",
    args: [session?.user.pubkey as `0x${string}`],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
    },
  });
  const tBalance = Number(tokenBalance) / 10 ** 8;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.value > tBalance) {
      form.setError("value", {
        message: "Value exceeds total balance",
      });
      return;
    }

    await writeContractAsync({
      abi: MadgeCoin__factory.abi,
      address: config.tokenContract,
      functionName: "approve",
      args: [config.casinoContract, BigInt(data.value * 10 ** 8)],
    });
  }

  if (isLoadingBalance) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="flex flex-row gap-4 mb-4 items-center mt-4">
        <h3 className="text-2xl">Total Balance</h3>
        <p className="text-xl">{tBalance.toLocaleString()} $MAD</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="value"
            render={({ field, fieldState }) => (
              <FormItem className="px-4">
                <FormLabel>Add Game Balance</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    {...field}
                    type="number"
                    onChange={(event) => {
                      form.setValue("value", Number(event.target.value));
                    }}
                  />
                </FormControl>

                {fieldState.error && (
                  <p className="text-destructive text-xs">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4 mt-4 justify-center">
            <Button
              disabled={form.getValues("value") === 0}
              className="text-2xl h-10"
              type="submit"
              variant="default"
            >
              Add Balance
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
