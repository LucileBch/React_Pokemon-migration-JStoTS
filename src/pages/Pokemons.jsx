import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    console.log(response.data);
    setData(response.data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div>Chargement</div>
  ) : (
    <div>
      {data.map((pokemon, index) => {
        return (
          <Link to={`/pokemon/${pokemon.name}`} key={index}>
            {pokemon.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Pokemons;
