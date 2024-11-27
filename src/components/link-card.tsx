import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardData } from "@/types";

export default function LINKCARD({
  days_to_expire,
  url_complete,
  url_shorty,
}: Omit<CardData, "id">) {
  if (days_to_expire > 0) {
    return (
      <Card className="w-64">
        <CardHeader className="w-6 overflow-hidden whitespace-nowrap">
          <CardTitle>Url Complete</CardTitle>
          <CardDescription className="overflow-ellipsis">
            {url_complete}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2>URL Shorty</h2>
          <a href={url_shorty} target="_blank">
            {url_shorty}
          </a>
        </CardContent>
        <CardFooter>
          <p>Dias restantes para que expire : {days_to_expire}</p>
        </CardFooter>
      </Card>
    );
  }
}
