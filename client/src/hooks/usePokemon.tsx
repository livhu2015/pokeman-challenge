import axios from "axios";
import { useCallback, useState } from "react";

enum Defaults {
  BASE_URL = "http://localhost:8001/poke-service",
}

export const usePokemon = (id: string) => {
  const [pokemon, setPokemon] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${Defaults.BASE_URL}/get/pokemon/${id}`;

  const load = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get(url);
    setPokemon(data);
    setIsLoading(false);
  }, [url]);

  return { pokemon, load, isLoading };
};
