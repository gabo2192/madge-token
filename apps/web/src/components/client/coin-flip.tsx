"use client";
import { Logo } from "@/assets/logo";
import { useUserContext } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function CoinFlip() {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const { balance, setBalance } = useUserContext();
  const { toast } = useToast();

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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const result = Math.random() > 0.5 ? 1 : 0;

    setTimeout(() => {
      setLoading(false);
      setCurrent(result);
      if (result === data.option) {
        setBalance(balance + data.value * 0.96);
        toast({
          title: "You won!",
          description: `You won ${data.value + data.value * 0.96} $MAD!`,
        });
      } else {
        setBalance(balance - data.value);
        toast({
          title: "You lost!",
          description: `You lost ${data.value} $MAD!`,
          variant: "destructive",
        });
      }
    }, 3000);
  }

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="h-80 w-80 [perspective:800px]">
          <div
            className={cn(
              "relative h-full w-full rounded-full ring-1 [transform-style:preserve-3d]",
              {
                "animate-spinhorizon": loading,
              }
            )}
          >
            <div
              className={cn(
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
              className={cn(
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col pb-10 gap-4 items-center"
        >
          <FormField
            control={form.control}
            name="option"
            defaultValue={0}
            render={({ field }) => (
              <FormItem className="flex items-center mt-8 gap-3 justify-center">
                <div className="flex flex-col">
                  <FormLabel>Heads</FormLabel>
                  <span className="text-xs text-brand font-semibold">
                    {!Boolean(field.value)
                      ? form.getValues("value") * 0.96
                      : -form.getValues("value")}
                  </span>
                </div>
                <Switch
                  {...field}
                  onChange={() =>
                    form.setValue("option", Number(!Boolean(field.value)))
                  }
                />
                <div className="flex flex-col">
                  <FormLabel>Tails</FormLabel>
                  <span className="text-xs text-red-500 font-semibold">
                    {Boolean(field.value)
                      ? form.getValues("value") * 0.96
                      : -form.getValues("value")}
                  </span>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            defaultValue={0}
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center justify-center ">
                <FormLabel htmlFor="bet">Bet:</FormLabel>
                <Input
                  {...field}
                  type="number"
                  className="bg-background/80 max-w-24"
                  onChange={(event) => {
                    form.setValue("value", Number(event.target.value));
                    form.clearErrors();
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
          <Button type="submit" className="px-10" disabled={balance === 0}>
            Play
          </Button>
        </form>
      </Form>
    </>
  );
}
