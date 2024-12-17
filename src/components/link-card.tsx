import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponseGetData } from "@/types";
import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useURLS } from "@/context/cards-context";
import { toast } from "sonner";

export default function LINKCARD({
  days_to_expire,
  url_complete,
  short_url,
  short_id,
}: Omit<ResponseGetData, "id">) {
  const { updateExpirationTimeById } = useURLS();
  if (days_to_expire > 0) {
    return (
      <Card className="max-w-md overflow-hidden rounded-xl shadow-md shadow-secondary-100 hover:shadow-lg hover:shadow-secondary-200 transition-shadow duration-300 ease-in-out border-none">
        <CardHeader className="whitespace-nowrap bg-primary">
          <CardTitle className="text-background text-lg font-semibold tracking-wide">
            Url Complete
          </CardTitle>
          <CardDescription className="w-48 overflow-hidden overflow-ellipsis text-background/80">
            {url_complete}
          </CardDescription>
        </CardHeader>
        <CardContent className="my-2">
          <h2 className="font-semibold text-txt text-xl">URL Shorty</h2>
          <a
            href={`${short_url}`}
            target="_blank"
            className="underline text-txt-500"
          >
            {short_url}
          </a>
        </CardContent>
        <CardFooter>
          <p className="font-medium text-sm text-txt">
            Dias restantes para que expire :{" "}
            <a className="font-semibold">{days_to_expire}</a>
          </p>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className="max-w-md overflow-hidden rounded-xl shadow-md shadow-error-100 dark:shadow-error-300 hover:shadow-lg hover:shadow-error-300 dark:hover:shadow-error-500 transition-shadow duration-300 ease-in-out border-none">
        <CardHeader className="whitespace-nowrap bg-error-500">
          <CardTitle className="text-txt-900 text-lg font-semibold tracking-wide">
            Url Complete
          </CardTitle>
          <CardDescription className="w-48 overflow-hidden overflow-ellipsis text-txt-800">
            **************************
          </CardDescription>
        </CardHeader>
        <CardContent className="my-2">
          <h2 className="font-semibold text-txt text-xl">URL Shorty</h2>
          <p className="underline text-txt-500">************</p>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="font-medium text-sm text-txt">
            Expirado: (Click para restaurar)
          </p>
          <Button
            asChild
            variant="ghost"
            size={"icon"}
            className="hover:bg-transparent h-5 w-5"
            onClick={() => {
              toast.promise(updateExpirationTimeById(short_id), {
                loading: "Loading.......",
                success: () => {
                  return `URL has been renoved`;
                },
                error: "Error",
              });
            }}
          >
            <RefreshCcw width={10} height={10} className="text-txt" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
