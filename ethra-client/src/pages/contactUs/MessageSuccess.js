import React from "react";
import "./index.scss";
import { IoMdCheckmark } from "react-icons/io";
export default function MessageSuccess() {
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
