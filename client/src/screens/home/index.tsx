import { HomeGrid } from "../../components/HomeGrid";
import { HomeHeader } from "../../components/HomeHeader";

export const Home = (props: HomeProps) => {
  const { onSelectedPokemon } = props;

  return (
    <>
      <HomeHeader />
      <HomeGrid onSelectedPokemon={onSelectedPokemon} />
    </>
  );
};

interface HomeProps {
  onSelectedPokemon: (pokemon: any) => void;
}
