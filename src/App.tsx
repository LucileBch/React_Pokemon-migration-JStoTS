import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import { Header } from "./components";
import { Home, Pokemons, Types, Type, Pokemon } from "./pages";

function App(): JSX.Element {
  return (
    <Router>
      <div className="container">
        <Header />

        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route path="/pokemon/:name" element={<Pokemon />} />
            <Route path="/type/:element" element={<Type />} />
            <Route path="/pokemons" element={<Pokemons />} />
            <Route path="/types" element={<Types />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
