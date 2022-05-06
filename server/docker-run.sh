docker run -p 3002:3000 \
-e PORT=3000 \
-e POKEMON_URL=https://pokeapi.co/api/v2/pokemon \
-e POKEMON_FRONT_IMAGE_PREFIX=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon \
pokemon-server-ecr-repo
