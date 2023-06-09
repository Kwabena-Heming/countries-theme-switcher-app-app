import { useContext } from "react";
import { Country } from "../types";
import CountryCard from "../components/CountryCard";
import expand from "../assets/images/expand-more.svg";
import chevronDark from "../assets/images/chevronDark.svg";
import { useState, useEffect } from "react";
import "../assets/css/csspages/mainpage.scss";
import { ThemeContext } from "../context/themeContext";
import { CountryContext } from "../context/countryContext";

const MainPage = () => {
  // const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const { theme } = useContext(ThemeContext);
  const { countries, setCountries } = useContext(CountryContext);

  const continents = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // fetching for the Api
  useEffect(() => {
    function getCountries() {
      fetch("https://restcountries.com/v3.1/all").then((response) => {
        response.json().then((data) => {
          setCountries(data);
        });
      });
    }
    getCountries();
  }, [setCountries]);

  // filtering for selected continents
  const getFilteredCountries = (): Country[] => {
    return (
      countries?.filter(
        (country) =>
          country.continents[0].includes(selectedContinent) &&
          country.name.official.toLowerCase().includes(search)
      ) || []
    );
  };

  // selected Continent
  const selectContinent = (continent: string) => {
    setSelectedContinent(continent);
    setShow(false);
  };

  return (
    <div className="hero">
      <div className="app container">
        <div className="filter">
          <div className="search">
            <input
              type="text"
              name="search"
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-drop">
            <div className="filter-label" onClick={() => setShow(!show)}>
              <p>{selectedContinent || "Filter by Region"} </p>
              <img src={theme === "light" ? expand : chevronDark} alt="" />
            </div>
            {/* shows continent dropdown */}
            <div className={`continents ${show ? "show" : ""}`}>
              {/* maps through the continents and listens to the event handler */}
              {continents.map((continent, index) => (
                <p key={index} onClick={() => selectContinent(continent)}>
                  {continent}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="countries" onBlur={() => setShow(false)}>
          {getFilteredCountries().map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
