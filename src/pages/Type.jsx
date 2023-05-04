import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Type = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { element } = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/type/${element}`
    );
    console.log(response.data);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div>Chargement</div>
  ) : (
    <div>
      <div>{data.name}</div>
      <div>
        {data.pokemon.map((pokemon, index) => {
          return (
            <Link to={`/pokemon/${pokemon.pokemon.name}`}>
              {pokemon.pokemon.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Type;
