docker stop pokemon-server
docker rm pokemon-server

docker build -t pokemon-server-ecr-repo ./server/.

docker run -p 8001:3000 \
-e PORT=3000 \
-e POKEMON_URL=https://pokeapi.co/api/v2/pokemon \
-e POKEMON_FRONT_IMAGE_PREFIX=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon \
--name pokemon-server \
-d \
pokemon-server-ecr-repo


