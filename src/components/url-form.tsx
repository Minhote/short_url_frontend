"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ResponseSaveUrl, returnFunctionFetch } from "@/types";
import { useURLS } from "@/context/cards-context";
import { apiUrl, getDaysToExpire } from "@/lib/utils";

const urlFormSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
});

export function URLForm() {
  const [disabled, setDisabled] = useState(false);
  const { setData } = useURLS();

  // 1. Define your form.
  const form = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof urlFormSchema>) {
    setDisabled(true);
    try {
      const fecthSaver = async (
        values: Record<string, string>
      ): Promise<returnFunctionFetch> => {
        const f = await fetch(`${apiUrl}/urls/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!f.ok) {
          throw new Error(
            `Error en la solicitud: ${f.status} - ${f.statusText}`
          );
        }
        const resp: ResponseSaveUrl = await f.json();

        const { short_id, original_url, id, expires_at, short_url } = resp;
        // Sacar el dias por expirar
        const daysToExpire = getDaysToExpire(expires_at);

        setData((prevData) => [
          ...prevData,
          {
            id,
            url_complete: original_url,
            days_to_expire: daysToExpire,
            short_id,
            short_url,
          },
        ]);

        setDisabled(false);
        return {
          success: "true",
          message: "Link Guardado y acortado con exito",
          short_url,
        };
      };

      toast.promise(fecthSaver(values), {
        loading: "Loading .....",
        success: (data) => {
          setDisabled(false);
          form.reset();
          return `Link acortado: ${data.short_url}`;
        },
        error: (error) => {
          setDisabled(false);
          form.reset();
          return `${error.message}`;
        },
      });
    } catch (error) {
      console.error("Error al realizar el POST:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-base text-txt dark:text-background">
                Url
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="url here"
                  className="text-txt dark:text-txt-300 focus-visible:ring-secondary"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-txt-500 font-medium tracking-wide">
                Form will return a shorty.
              </FormDescription>
              <FormMessage className="text-red-600 font-bold tracking-wide" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled} className="bg-secondary">
          Submit
        </Button>
      </form>
    </Form>
  );
}
