import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ZodError, z } from "zod";

const pokemonInfoSchema = z.object({
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
      }),
    })
  ),
});

type PokemonInfo = z.infer<typeof pokemonInfoSchema>;

export function Pokemon(): JSX.Element {
  const [data, setData] = useState<PokemonInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        // console.log(response.data);
        const parsedResult = pokemonInfoSchema.parse(response.data);
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
  }, [name]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pokemon</h1>

      <div className="pokemon">
        <div className="link-card">
          <div>{name}</div>
          <img src={data.sprites.front_default} alt="poke img" />
        </div>
        <div className="type-flex">
          {data.types.map((typesTab, index) => {
            return (
              <Link
                key={index}
                className="type-box"
                to={`/type/${typesTab.type.name}`}
              >
                {typesTab.type.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
