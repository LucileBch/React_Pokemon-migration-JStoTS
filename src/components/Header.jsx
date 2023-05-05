import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/pokemon"}>Pokemon</Link>
      <Link to={"/type"}>Type</Link>
    </div>
  );
};

export default Header;
