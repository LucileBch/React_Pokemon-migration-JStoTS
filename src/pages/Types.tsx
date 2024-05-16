import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ZodError, z } from "zod";

const pokemonTypeSchema = z.object({
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

type PokemonTypes = z.infer<typeof pokemonTypeSchema>;

export function Types(): JSX.Element {
  const [data, setData] = useState<PokemonTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const parsedResult = pokemonTypeSchema.parse(response.data);
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
      <h1>Types</h1>
      <div className="all-type">
        {data.results.map((types, index) => {
          return (
            <Link className="type-box" to={`/type/${types.name}`} key={index}>
              {types.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
