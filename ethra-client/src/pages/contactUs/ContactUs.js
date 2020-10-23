import React, { Component } from "react";
import axios from "axios";
import { IoMdCheckmark } from "react-icons/io";
import "components/form/Form.scss";
import "./ContactUs.scss";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      subject: "",
      message: "",
      isSumbit: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  componentDidMount() {
    console.log("⏰", this.props.context.state);
  }
  handleFormChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, message } = this.state;
    const body = { name, email, message };
    try {
      const res = await axios.options(`http://localhost:8000/contact-us`, body);
      console.log("Ⓜ", res);

      this.setState({ isSumbit: true });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { email, subject, message, isSumbit } = this.state;

    if (isSumbit) {
      return (
        <section className="message-success-section">
          <div className="message-success">
            <h2 className="message-success__primary-heading">
              Your Message has been sent.
            </h2>
            <h3 className="message-success__secondary-heading">
              Our Team will reach soon!
            </h3>
            <IoMdCheckmark className="message-success__icon" />
          </div>
        </section>
      );
    }

    return (
      <section className="form-section">
        <h1 className="form-section__heading">Contact Us</h1>

        <div className="form-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <label className="form__label" htmlFor="email">
              Email:
            </label>
            <input
              className="form__input"
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={this.handleFormChange}
            />
            <label className="form__label" htmlFor="subject">
              Subject:
            </label>
            <input
              className="form__input"
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={this.handleFormChange}
            />

            <label className="form__label" htmlFor="message">
              Message:
            </label>
            <textarea
              className="form__message"
              name="message"
              id="message"
              cols="30"
              rows="10"
              value={message}
              onChange={this.handleFormChange}
            ></textarea>
            <button className="form__submit">Send</button>
          </form>
        </div>
      </section>
    );
  }
}

export default ContactUs;
