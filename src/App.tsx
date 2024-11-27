import { ModeToggle } from "@/components/mode-toggle";
import { URLForm } from "@/components/url-form";
import CardsWrapper from "@/components/cards-wrapper";

function App() {
  return (
    <>
      <div className="h-dvh">
        <header className="flex justify-between items-center bg-secondary p-4">
          <p className="text-3xl font-bold tracking-wider text-txt">Shorty</p>
          <ModeToggle />
        </header>
        <div className="flex flex-col gap-3 items-center h-[60dvh] justify-center">
          <h1 className="font-bold text-2xl text-text dark:text-secondary">
            Introduce your URL
          </h1>
          <p className="font-semibold text-lg text-txt-700">
            We will return a shorty
          </p>
          <URLForm />
        </div>
        <CardsWrapper />
      </div>
    </>
  );
}

export default App;
