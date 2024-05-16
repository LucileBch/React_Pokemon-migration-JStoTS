import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export function Header(): JSX.Element {
  return (
    <div className="header">
      <Link to={"/"}>
        <img alt="logo de pokemon" src={logo} />
      </Link>
      <div className="right-header">
        <Link to={"/pokemons"}>Pokemons</Link>
        <Link to={"/types"}>Types</Link>
      </div>
    </div>
  );
}

export default Header;
