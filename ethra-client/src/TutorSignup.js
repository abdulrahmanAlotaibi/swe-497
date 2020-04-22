import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Country from "./components/Country";
class TutorSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      qualifications: "",
      country: "",
      city: ""
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleFormChange(evt) {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleCountryChange(country) {
    this.setState({ country: country });
  }

  handleCityChange(city) {
    this.setState({ city: city });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const role = "tutor";
    const { name, email, password, confirmPassword, qualifications, phone, city } = this.state;

    try {
      this.props.createAccount({
        role,
        name,
        email,
        password,
        qualifications,
        confirmPassword,
        phone,
        city
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  render() {
    console.log("🍎🍎🍎", this.state);
    const { country, city } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {/* <label className="form__label" htmlFor="username">
          Username:
        </label>
        <input
          className="form__input"
          type="text"
          id="username"
          name="username"
          onChange={this.handleFormChange}
          required
        /> */}

        <label className="form__label" htmlFor="name">
          Full Name:
        </label>
        <input
          className="form__input"
          type="name"
          id="name"
          name="name"
          onChange={this.handleFormChange}
          required
        />

        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className="form__input"
          type="email"
          id="email"
          name="email"
          onChange={this.handleFormChange}
          required
        />

        <label className="form__label" htmlFor="password">
          Password:
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          name="password"
          onChange={this.handleFormChange}
          required
        />
        <label className="form__label" htmlFor="password-confirm">
          Confirm password:
        </label>

        <input
          className="form__input"
          type="password"
          id="password-confirm"
          name="confirmPassword"
          onChange={this.handleFormChange}
          required
        />
        <label className="form__label" htmlFor="phone">
          Phone Number:
        </label>
        <PhoneInput
        
          inputClass="form__input"
          country={"sa"}
          value={this.state.phone}
          onChange={phone => this.setState({ phone })}
        />
        <Country
          country={country}
          city={city}
          handleCountryChange={this.handleCountryChange}
          handleCityChange={this.handleCityChange}
        />
        <label className="form__label" htmlFor="qualifications">
          Qualifications
        </label>
        <input
          type="text"
          onChange={this.handleFormChange}
          name="qualifications"
          id="qualifications"
          className="form__input"
        />
        {/* TODO: ADD CITY INPUT */}
        <input className="form__submit" type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default TutorSignup;
