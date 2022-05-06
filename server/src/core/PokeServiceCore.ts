import axios from "axios";
import { pokemonUrl, pokemonImagePrefix } from "../config/vars";

enum Defaults {
  POKEMON_COUNT = 100
}

class PokeServiceCore {

  private static instance: PokeServiceCore;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PokeServiceCore();
    }
    return this.instance;
  }

  private constructor() {

  }

  public async getPokemons(page = 0){
    try{
      const url = `${pokemonUrl}?limit=${Defaults.POKEMON_COUNT}&offset=${Defaults.POKEMON_COUNT * page}`;
      console.log({url})
      const { data ,statusText } = await axios.get(url);

      const { results , count } = data;

      return results.map(this.convertPokemon);
    }catch(err) {

    }
  }

  public async getPokemon(id:string){
    try{
      const { data ,statusText } = await axios.get(`${pokemonUrl}/${id}`);
      console.log({data ,statusText})
      const { results , count } = data;

      return this.convertFullPokemon(data);
    }catch(err){

    }
  }

  private convertPokemon(pokemon: {name:string,url:string}){
    const all = pokemon.url.split('/')
    const id = all[all.length - 2]

    return {
      id,
      name: pokemon.name,
      url: pokemon.url,
      frontImg: `${pokemonImagePrefix}/${id}.png`
    }
  }

  private convertFullPokemon(pokemon: any){
    console.log({pokemon})

    return pokemon
  }
}


export const pokeServiceCore = PokeServiceCore.getInstance();
