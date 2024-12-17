import { fetchAllUrls, updateUrlById } from "@/lib/utils";
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
  updateExpirationTimeById: (id: string) => Promise<void>;
};

const initialData: CardDataState = {
  data: [],
  setData: () => null,
  updateExpirationTimeById: async () => {},
};

const CardContext = createContext<CardDataState>(initialData);

export default function CardContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cardData, setCardData] = useState<ResponseGetData[]>([]);

  const updateExpirationTimeById = async (id: string) => {
    try {
      const updatedData = await updateUrlById(id);
      setCardData((prev) => {
        const newData = prev.map((item) =>
          item.id === updatedData.id ? updatedData : item
        );
        return newData;
      });
    } catch (error) {
      console.error(
        `Error en la actualización de fecha de expiración: ${error}`
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllUrls();
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
    updateExpirationTimeById: updateExpirationTimeById,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export const useURLS = () => {
  const context = useContext(CardContext);

  if (context === undefined)
    throw new Error("useCardContext debe usarse dentro de CardContextProvider");

  return context;
};
