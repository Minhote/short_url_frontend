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
  daysToExpire,
  urlComplete,
  urlShorty,
}: Omit<CardData, "id">) {
  if (daysToExpire > 0) {
    return (
      <Card className="w-64">
        <CardHeader className="w-6 overflow-hidden whitespace-nowrap">
          <CardTitle>Url Complete</CardTitle>
          <CardDescription className="overflow-ellipsis">
            {urlComplete}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2>URL Shorty</h2>
          <p>{urlShorty}</p>
        </CardContent>
        <CardFooter>
          <p>Dias restantes para que expire : {daysToExpire}</p>
        </CardFooter>
      </Card>
    );
  }
}
