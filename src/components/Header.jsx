import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to={"/pokemon"}>Pokemon</Link>
      <Link to={"/type"}>Type</Link>
    </>
  );
};

export default Header;
