import { Country } from '../types';
import { Link } from 'react-router-dom';
import '../assets/css/csscomponents/countrycard.scss';

interface CountryCardProps {
  country: Country
}
export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link to={`/${country.cca3}/details`}>
      <div className="country">
        <img className="country__flag" src={country.flags.png} alt={country.flags.alt} />
        <div className="country__description">
          <h4>{country.name.official}</h4>
          <p>
            <span>Population:</span> {country.population}
          </p>
          <p>
            <span>Region:</span> {country.region}
          </p>
          <p>
            <span>Capital:</span> {country.capital}
          </p>
        </div>
      </div>
    </Link>
  );
}
