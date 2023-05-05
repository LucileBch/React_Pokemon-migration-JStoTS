import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Types = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
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
      {data.map((types) => {
        return <Link to={`/type/${types.name}`}>{types.name}</Link>;
      })}
    </div>
  );
};

export default Types;
