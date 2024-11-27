import LINKCARD from "@/components/link-card";
import { useURLS } from "@/context/cards-context";

export default function CardsWrapper() {
  const { data } = useURLS();

  return (
    <div className="flex justify-between flex-wrap gap-2 items-center">
      {data.map(({ id, days_to_expire, url_complete, url_shorty }) => {
        return (
          // Modificar esteticamente esta cards
          <LINKCARD
            key={id}
            days_to_expire={days_to_expire}
            url_complete={url_complete}
            url_shorty={url_shorty}
          ></LINKCARD>
        );
      })}
    </div>
  );
}
