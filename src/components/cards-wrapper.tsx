import LINKCARD from "@/components/link-card";
import { useURLS } from "@/context/cards-context";

export default function CardsWrapper() {
  const { data } = useURLS();

  if (data.length > 0)
    return (
      <div className="cards_grid px-20 py-10 bg-background">
        {data.map(
          ({ id, days_to_expire, url_complete, short_id, short_url }) => {
            return (
              <LINKCARD
                key={id}
                days_to_expire={days_to_expire}
                url_complete={url_complete}
                short_url={short_url}
                short_id={short_id}
              />
            );
          }
        )}
      </div>
    );
}
