import { fetchAllUrls } from "@/lib/utils";
import { ResponseGetData } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CardDataState = {
  data: ResponseGetData[];
  setData: React.Dispatch<React.SetStateAction<ResponseGetData[]>>;
};

const initialData: CardDataState = {
  data: [],
  setData: () => null,
};

const CardContext = createContext<CardDataState>(initialData);

export default function CardContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cardData, setCardData] = useState<ResponseGetData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllUrls();
        console.log(data);
        setCardData(data);
      } catch (error) {
        console.error(`Error en la peticion App: ${error}`);
      }
    };
    fetchData();
  }, []);

  const value: CardDataState = {
    data: cardData,
    setData: setCardData,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export const useURLS = () => {
  const context = useContext(CardContext);

  if (context === undefined)
    throw new Error("useCardContext debe usarse dentro de CardContextProvider");

  return context;
};
