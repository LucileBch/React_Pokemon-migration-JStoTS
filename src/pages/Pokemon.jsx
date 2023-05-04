import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Pokemon = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
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
      <div>{name}</div>
      <img src={data.sprites.front_default} alt="poke img" />
      <div>
        {data.types.map((typesTab) => {
          return (
            <Link to={`/type/${typesTab.type.name}`}>{typesTab.type.name}</Link>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
