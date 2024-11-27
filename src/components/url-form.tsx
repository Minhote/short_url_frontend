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
import { returnFunctionFetch, SupabaseCard } from "@/types";
import { useURLS } from "@/context/cards-context";
import { getDaysToExpire } from "@/lib/utils";

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
        const f = await fetch("http://localhost:3000/urls/save", {
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
        const resp: SupabaseCard = await f.json();

        const { short_id, original_url, id, expires_at } = resp;
        // Sacar el dias por expirar
        const daysToExpire = getDaysToExpire(expires_at);

        setData((prevData) => [
          ...prevData,
          {
            id,
            url_complete: original_url,
            url_shorty: `${window.location.origin}/${short_id}`,
            days_to_expire: daysToExpire,
          },
        ]);

        setDisabled(false);
        return {
          success: "true",
          message: "Link Guardado y acortado con exito",
          short_id,
        };
      };

      toast.promise(fecthSaver(values), {
        loading: "Loading .....",
        success: (data) => {
          setDisabled(false);
          return `Link acortado: ${window.location.origin}/${data.short_id}`;
        },
        error: (error) => {
          setDisabled(false);
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
              <FormLabel>Url</FormLabel>
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
