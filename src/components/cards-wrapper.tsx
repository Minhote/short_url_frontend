import LINKCARD from "@/components/link-card";
import { useURLS } from "@/context/cards-context";

export default function CardsWrapper() {
  const { data } = useURLS();
  if (data.length > 0)
    return (
      <div className="cards_grid px-20 py-10 bg-background">
        {data.map(({ id, days_to_expire, url_complete, url_shorty }) => {
          return (
            <LINKCARD
              key={id}
              days_to_expire={days_to_expire}
              url_complete={url_complete}
              url_shorty={url_shorty}
            />
          );
        })}
      </div>
    );
}
