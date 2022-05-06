import { useCallback, useEffect } from "react";
import { InfoTabs } from "../../components/InfoTabs";
import { Loader } from "../../components/Loader";
import { usePokemon } from "../../hooks/usePokemon";

export const Info = (props: InfoProps) => {
  const {
    pokemon: { id },
    close,
  } = props;
  const { isLoading, load, pokemon } = usePokemon(id);

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    load();
  }, []);

  if (isLoading || !pokemon) {
    return <Loader />;
  }

  const {
    sprites: { front_default, back_default, front_shiny },
  } = pokemon;
  const abilities = pokemon.abilities.map((a: any) => a.ability.name);
  const stats = pokemon.stats.map((a: any) => a.stat.name);
  const items = pokemon.held_items.map((a: any) => a.item.name);

  return (
    <>
      <div className="grid px-20 py-5 place-items-end">
        <button
          onClick={handleClose}
          className="font-black text-4xl text-red-600"
        >
          X
        </button>
      </div>
      <div className="flex place-items-center">
        <div className="grid mx-20 flex-1 place-items-center p-2 shadow-lg rounded-md">
          <img src={front_shiny} className="h-40 w-auto" />
          <h4 className=" text-4xl font-semibold px-20 py-2">{pokemon.name}</h4>
        </div>
      </div>
      <div className="flex flex-1 place-items-center p-10">
        <div className="flex-1 place-items-center">
          <div className="w-1/3 m-1 p-3 opacity-70 hover:opacity-100">
            <h4 className="text-3xl">Weight</h4>
            <h4 className="text-primary text-7xl font-black">
              {pokemon.weight}
              <span className="text-black text-xl font-base">hectograms</span>
            </h4>
          </div>
        </div>
        <div className="flex-1 grid place-items-center p-3 opacity-70 hover:opacity-100">
          <div>
            <h4 className="text-3xl">Height</h4>
            <h4 className="text-accent text-7xl font-black justify-center">
              {pokemon.height}
              <span className="text-black text-xl font-base">decimetres</span>
            </h4>
          </div>
        </div>
        <div className="flex-1 place-items-center">
          <div className="w-1/3 m-1 mx-auto p-3 opacity-70 hover:opacity-100">
            <h4 className="text-3xl">Moves</h4>
            <h4 className="text-secondary text-7xl font-black">
              {pokemon.moves?.length || 0}{" "}
              <span className="text-black text-xl font-base"></span>
            </h4>
          </div>
        </div>
      </div>
      <InfoTabs abilities={abilities} items={items} stats={stats} />
      <img
        src={back_default}
        className="select-none -z-10 h-96 opacity-10 right-2 bottom-1/2 w-auto flex-initial mx-20 absolute"
        alt=""
      />
      <img
        src={front_default}
        className="select-none -z-10 h-96 opacity-10 bottom-1/2 w-auto flex-initial mx-20 absolute"
        alt=""
      />
    </>
  );
};
interface InfoProps {
  pokemon: any;
  close: () => void;
}
