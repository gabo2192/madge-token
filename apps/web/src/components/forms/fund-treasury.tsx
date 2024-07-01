"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import config from "@/lib/contracts-config";
import { MadgeCasino__factory, MadgeCoin__factory } from "@/typechain-types";
import { TreasuryDB } from "@/types/treasury";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useReadContract, useWriteContract } from "wagmi";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";

interface Props {
  treasury: TreasuryDB;
}

export function FundTreasuryForm({ treasury }: Props) {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    value: z.number().gt(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
    },
  });

  const { writeContractAsync } = useWriteContract();
  const { data } = useReadContract({
    abi: MadgeCasino__factory.abi,
    address: config.casinoContract,
    functionName: "treasuries",
    args: [
      treasury.owner_address as `0x${string}`,
      treasury.token_address as `0x${string}`,
    ],
  });
  console.log({ data });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const value = data.value * 10 ** 8;
    try {
      await writeContractAsync({
        abi: MadgeCoin__factory.abi,
        address: treasury.token_address as `0x${string}`,
        functionName: "approve",
        args: [config.casinoContract, BigInt(value)],
      });
      await writeContractAsync({
        abi: MadgeCasino__factory.abi,
        address: config.casinoContract,
        functionName: "fundTreasury",
        args: [treasury.token_address as `0x${string}`, BigInt(value)],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col pb-10 gap-4  mt-2 p-4 "
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bet">
                  Add Balance: {treasury.token_ticker}
                </FormLabel>
                <Input
                  {...field}
                  type="text"
                  className="bg-background/80 "
                  placeholder="Madge Coin"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    form.setValue("value", value);
                  }}
                  onTouchStart={() => {
                    form.clearErrors("value");
                  }}
                />
              </FormItem>
            )}
          />

          {form.formState.errors.value && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.value.message}
            </p>
          )}
          <Button
            type="submit"
            className="px-10"
            disabled={form.formState.disabled || loading}
          >
            Fund Treasury
          </Button>
        </form>
      </Form>
    </>
  );
}
