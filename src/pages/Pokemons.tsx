import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ZodError, z } from "zod";

const pokemonSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

type Pokemon = z.infer<typeof pokemonSchema>;

export function Pokemons(): JSX.Element {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const parsedResult = pokemonSchema.parse(response.data);
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

  useEffect(() => {
    fetchData();
  }, []);
  if (error) return <div>Error: {error.message}</div>;
  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pokemons</h1>

      <div className="main-div">
        {data.results.map((pokemon, index) => {
          // console.log(pokemon.url.split("/")[6]);
          const url = pokemon.url.split("/")[6];
          return (
            <Link to={`/pokemon/${pokemon.name}`} key={index}>
              <div className="link-card">
                <div>{pokemon.name}</div>
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
