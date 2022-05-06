import { useState } from "react";
import "./App.css";
import { Home } from "./screens/home";
import { Info } from "./screens/info";

function App() {
  const [selectedPokemon, setSelectedPokeman] = useState(null);

  if (!selectedPokemon) {
    return <Home onSelectedPokemon={setSelectedPokeman} />;
  }

  return (
    <Info pokemon={selectedPokemon} close={() => setSelectedPokeman(null)} />
  );
}

export default App;
