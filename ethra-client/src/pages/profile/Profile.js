import React, { Component } from "react";
import Country from "components/form/InputCountry";
import "components/form/Form.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      qualifications: "",
      phone: "",
      city: "",
      country: "",
      loading: true,
      error: false,
      errorText: "",

    };
 
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    try {
      const profile = await axios.get(`http://localhost:8000/${role}/${id}`);
      const user =
        role === "tutor" ? profile.data.data[role] : profile.data.data;
      this.setState({ ...user, confirmPassword: "", loading: false, role });
    } catch (err) {
      console.log(err);
      // console.log(err.responese.data.message);
    }
  };

  submit = async (evt) => {
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    try {
      evt.preventDefault();
      console.log(role, id);
      await axios.patch(`http://localhost:8000/${role}/${id}/update-me`, {
        ...this.state,
        role,
      });
      this.props.history.goBack();
    } catch (err) {
      const { message } = err.response.data;
      if (message === "The old password is wrong") {
        return this.setState({ errorText: message, error: true });
      }
      if (message.toLowerCase().includes("matched")) {
        this.setState({
          errorText: "The passwords are not matched",
          error: true,
        });
      }
    }
  };
  handleCountryChange = (country) => {
    this.setState({ country: country });
  };

  handleCityChange = (city) => {
    this.setState({ city: city });
  };

  handleChangeInput = (evt) => {
    const { id, value } = evt.target;
    this.setState({ [id]: value });
  };
  render() {
    const {
      name,
      email,
      city,
      phone,
      qualifications,
      country,
      role,
      oldPassword,
      newPassword,
      confirmPassword,
      loading,
      error,
    } = this.state;
    if (loading) {
      return <LoadingSpinner />;
    }
    let tutorAdditionalContent;
    if (role === "tutor") {
      tutorAdditionalContent = (
        <div>
          <label className="profile-form__label" htmlFor="phone">
            phone:
          </label>
          <PhoneInput
            className="profile-form__input"
            country={"sa"}
            value={phone}
            onChange={(phone) => this.setState({ phone })}
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
            onChange={this.handleChangeInput}
            value={qualifications}
            name="qualifications"
            id="qualifications"
            className="profile-form__input"
          />
        </div>
      );
    }
    return (
      <div className="profile">
       
        <form className="profile-form">
          <label className="profile-form__label" htmlFor="name">
            name:
          </label>
          <input
            className="profile-form__input"
            type="text"
            id="name"
            value={name}
            onChange={this.handleChangeInput}
            required
          />

          <label className="profile-form__label" htmlFor="email">
            Email:
          </label>
          <input
            className="profile-form__input"
            type="email"
            value={email}
            onChange={this.handleChangeInput}
            id="email"
            required
          />
          <label className="profile-form__label" htmlFor="oldPassword">
            Old Password:
          </label>
          <input
            className="profile-form__input"
            type="password"
            value={oldPassword}
            onChange={this.handleChangeInput}
            id="oldPassword"
            required
          />
          <label className="profile-form__label" htmlFor="newPassword">
            New password
          </label>
          <input
            className="profile-form__input"
            type="password"
            value={newPassword}
            onChange={this.handleChangeInput}
            id="newPassword"
            required
          />
          <label className="profile-form__label" htmlFor="confirmPassword">
            Confirm password:
          </label>
          <input
            className="profile-form__input"
            type="password"
            value={confirmPassword}
            onChange={this.handleChangeInput}
            id="confirmPassword"
            required
          />
          {tutorAdditionalContent}
          <input
            className="profile-form__submit"
            type="submit"
            value="Save"
            onClick={this.submit}
          />
          {error ? (
            <div className="form__fail-alert">{this.state.errorText}.</div>
          ) : null}
        </form>
   
      </div>
    );
  }
}
