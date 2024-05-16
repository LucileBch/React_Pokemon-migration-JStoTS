import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ZodError, z } from "zod";

const pokemonInTypeSchema = z.object({
  //   damage_relations: z.object({}),
  //   game_indices: z.array(z.object({})),
  //   generation: z.object({}),
  //   id: z.number(),
  //   move_damage_class: z.object({}),
  //   moves: z.array(z.object({})),
  name: z.string(),
  //   names: z.array(z.object({})),
  //   past_damage_relations: z.array(z.object({})),
  pokemon: z.array(
    z.object({
      pokemon: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
});

type PokemonsInType = z.infer<typeof pokemonInTypeSchema>;

export function Type(): JSX.Element {
  const [data, setData] = useState<PokemonsInType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  const { element } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${element}`
        );
        const parsedResult = pokemonInTypeSchema.parse(response.data);
        setData(parsedResult);
        setLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(new Error("Zod Error !"));
        } else {
          setError(new Error("An error occurred !"));
        }
      }
    };
    fetchData();
  }, [element]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Type : {data.name}</h1>
      <div className="main-div">
        {data.pokemon.map((pokemon, index) => {
          // console.log(pokemon.pokemon.url.split("/")[6]);
          const url = pokemon.pokemon.url.split("/")[6];
          return (
            <Link to={`/pokemon/${pokemon.pokemon.name}`} key={index}>
              <div className="link-card">
                <div> {pokemon.pokemon.name}</div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                  alt=""
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
