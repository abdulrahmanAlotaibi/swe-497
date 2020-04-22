import React, { Component } from "react";

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to
// keep file size down
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", city: "" };
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  // selectCountry(val) {}
  handleCountryChange(val) {
    this.props.handleCountryChange(this.state.country);
    // this.setState(oldState => {

    //   return { country: val };
    // });
  }
  handleCityChange(val) {
    this.props.handleCityChange(this.state.city);
    // this.setState(() => {
    //   return { city: val };
    // });
  }

  // selectRegion(val) {
  //   this.setState({ city: val });
  // }

  render() {
    console.log(CountryRegionData);

    const { country, city } = this.props;
    return (
      <div>
        <CountryDropdown
          className="form__input form__input--country"
          value={country}
          onChange={val => this.props.handleCountryChange(val)}
        />
        <RegionDropdown
          className="form__input form__input--country"
          country={country}
          value={city}
          onChange={val => this.props.handleCityChange(val)}
        />
      </div>
    );
  }
}
export default Country;
