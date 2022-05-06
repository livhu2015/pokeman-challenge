import axios from "axios";
import { useCallback, useState } from "react";

enum Defaults {
  BASE_URL = "http://localhost:3000/poke-service/",
}

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${Defaults.BASE_URL}/get/pokemons`;

  const load = useCallback(
    async (page: number) => {
      setIsLoading(true);
      const { data } = await axios.get(url + "?page=" + page);
      setPokemons((p) =>
        p.concat(data.filter((v: any) => !p.some((pp) => pp.id === v.id)))
      );
      setIsLoading(false);
    },
    [url]
  );

  return { pokemons, load, isLoading };
};
