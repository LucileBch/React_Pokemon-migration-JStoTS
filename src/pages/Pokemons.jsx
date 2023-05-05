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
    <div className="main-div">
      {data.map((pokemon, index) => {
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
  );
};

export default Pokemons;
