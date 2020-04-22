import React, { Component } from "react";
import { MdSearch, MdTouchApp, MdVerifiedUser } from "react-icons/md";
import "./styles/Features.scss";
class Features extends Component {
  render() {
    return (
      <section className="features">
        <h2 className="features__heading">Why Us?</h2>
        <ul className="features__list">
          <li className="features__item">
            <span className="features__icon">
              <MdSearch />
            </span>
            <h3 className="features__secondary-heading">Easy to use</h3>
            <p className="features__description">
              We provide an easy platfrom to search for courses and tutors by
              filters such as name, city, and education institution.
            </p>
          </li>
          <li className="features__item">
            <span className="features__icon">
              <MdTouchApp />
            </span>
            <h3 className="features__secondary-heading">
              Choose Certain Topic
            </h3>
            <p className="features__description">
              You can study a whole course or choose to study and pay for
              specific topics in a certain course.
            </p>
          </li>
          <li className="features__item">
            <span className="features__icon">
              <MdVerifiedUser />
            </span>
            <h3 className="features__secondary-heading">Secure</h3>
            <p className="features__description">
              All the payments will be completely secured and encrypted.
            </p>
          </li>
        </ul>
      </section>
    );
  }
}

export default Features;
