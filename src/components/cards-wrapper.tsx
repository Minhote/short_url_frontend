import LINKCARD from "@/components/link-card";
import { useURLS } from "@/context/cards-context";

export default function CardsWrapper() {
  const { data } = useURLS();
  return (
    <div className="flex justify-between flex-wrap gap-2 items-center">
      {data.map(({ id, daysToExpire, urlComplete, urlShorty }) => (
        // Modificar esteticamente esta cards
        <LINKCARD
          key={id}
          daysToExpire={daysToExpire}
          urlComplete={urlComplete}
          urlShorty={urlShorty}
        ></LINKCARD>
      ))}
    </div>
  );
}
