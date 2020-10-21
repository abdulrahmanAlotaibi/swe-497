import React, { Component } from "react";
// import "components/course/CoursePage.scss";
import { Link } from "react-router-dom";
import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getRatingJSX } from "util/helpers";
import StripeCheckout from "react-stripe-checkout";
class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      videos: [],
      tutor: "",
      reviews: [],
      selectedVideo: "",
      loading: true,
      authError: false,
      isMember: false
    };
    this.getInfo = this.getInfo.bind(this);
    this.renderCourseOptions = this.renderCourseOptions.bind(this);
  }

  async componentDidMount() {
    await this.getInfo();
    this.getMembership();
  }
  handleToken = async (token, addresses) => {
    const cachedToken = JSON.parse(window.localStorage.getItem("token"));

    try {
      const response = await axios.post(
        "http://localhost:8000/stripe/api/checkout-session",
        { token, price: this.state.course.price, courses: [this.state.course] },
        {
          headers: { authorization: `Bearer ${cachedToken}` }
        }
      );
      this.props.history.push("/my-courses");
      // const { status } = response.data;
      // if (status === "success") {
      //   toast("Success! Check email for details", { type: "success" });
      // } else {
      //   toast("Something went wrong", { type: "error" });
      // }
    } catch (err) {
      console.log(err.message);
    }
  };
  getMembership = async () => {
    const { course } = this.state;
    if (!localStorage.getItem("account")) {
      return;
    }
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    if (role === "admin") {
      this.setState({ isMember: true });
      return;
    }
    if (role === "tutor") {
      if (id === course.tutor) {
        this.setState({ isMember: true });
        return;
      }
      this.setState({ isMember: false });
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8000/student/${id}`, {
        // headers: { authorization: `Bearer ${token}` },
      });

      const studentCoursesId = res.data.data.courses;
      const member = studentCoursesId.find(courseId => courseId === course._id);
      console.log(member);
      if (member) {
        this.setState({ isMember: true });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  async getInfo() {
    // Get URL
    const url = window.location.href.split("/");
    const id = url[4];
    try {
      const res = await axios.get(`http://localhost:8000/course/${id}`);
      const { course, tutor, videos, reviews } = res.data.data;
      course.img = `http://localhost:8000/${course.img}`;
      for (let i = 0; i < videos.length; i++) {
        videos[i].content = `http://localhost:8000/${videos[i].content}`;
      }
      this.setState({
        course,
        tutor,
        videos,
        reviews,
        loading: false,
        selectedVideo: videos.length > 0 ? videos[0].content : null
      });
    } catch (e) {
      console.log("Error", e.message);
    }
  }

  handleFreeVideo = i => {
    this.setState({ selectedVideo: i, authError: false });
  };

  handlePaidVideo = async i => {
    const { course } = this.state;
    if (!localStorage.getItem("account")) {
      return;
    }
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    if (role === "tutor") {
      if (course.tutor === id) {
        return this.setState({ selectedVideo: i, authError: false });
      }
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8000/student/${id}`, {
        // headers: { authorization: `Bearer ${token}` },
      });

      console.log(res.data.data.courses);
      console.log(id);

      const studentCoursesId = res.data.data.courses;
      const member = studentCoursesId.find(courseId => courseId === course._id);
      console.log(member);
      if (member) {
        this.setState({ selectedVideo: i, authError: false });
      } else {
        this.setState({ authError: true });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  addToCart = async () => {
    try {
      const { course } = this.state;
      const token = JSON.parse(window.localStorage.getItem("token"));
      await axios.post(
        `http://localhost:8000/course/5e91c89aace5580e535ce80b/add-to-cart`,
        null,
        { headers: { authorization: `Bearer ${token}` } }
      );
      this.props.history.push("/cart");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  renderCourseOptions() {
    if (!localStorage.getItem("account")) {
      return (
        <Link to="/signin" className="course-page-info__buy-course-btn">
          Sign In
        </Link>
      );
    }
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    console.log(token);
    const { isMember, course } = this.state;
    if (isMember) {
      if (role === "student") {
        return (
          <Link
            to={`/my-topics/${course._id}`}
            className="course-page-info__buy-course-btn"
          >
            Go to Topic
          </Link>
        );
      } else {
        return (
          <Link
            to={`/my-courses/${course._id}`}
            className="course-page-info__buy-course-btn"
          >
            Go to Topic
          </Link>
        );
      }
    }
    if (token && role === "student") {
      return (
        <>
          <span className="course-page-info__price">{`${course.price} SR`}</span>{" "}
          <button
            className="course-page-info__add-to-cart-btn"
            onClick={this.addToCart}
          >
            Add to cart
          </button>
          <div
            style={{
              margin: "2rem auto",
              width: "50%",
              textAlign: "center"
            }}
          >
            <StripeCheckout
              stripeKey="pk_test_U8jQFnCO1xQIuYClxSYZg3cy00aH73XkQu"
              token={this.handleToken}
              amount={course.price * 100}
              name={course.name}
              currency="SAR"
              billingAddress
              shippingAddress
            />
          </div>
        </>
      );
    }
    if (token && role === "tutor") {
      return <div></div>;
    }
    if (!token) {
      return (
        <Link to="/signin" className="course-page-info__buy-course-btn">
          Sign In
        </Link>
      );
    }
  }

  render() {
    const {
      _id,
      name,
      price,
      category,
      img,
      description,
      institution,
      startDate,
      chapters,
      rating
    } = this.state.course;
    const {
      videos,
      loading,
      selectedVideo,
      authError,
      isRating,
      ratingNumber,
      isMember
    } = this.state;
    if (loading) {
      return <LoadingSpinner />;
    }
    const renderedReviews = this.state.reviews.map(review => (
      <li className="reviews__item">
        <div className="reviews__info">
          <span className="reviews__author">{review.student}</span>
          <span className="reviews__comment">{review.text}</span>
          <div className="reviews__rating">{getRatingJSX(review.rating)}</div>
        </div>
      </li>
    ));
    const renderedVideos = videos.map((video, i) => {
      if (i <= 1) {
        return (
          <li
            key={video._id}
            onClick={this.handleFreeVideo.bind(this, video.content)}
          >
            {video.title}
          </li>
        );
      }
      return (
        <li
          key={video._id}
          onClick={this.handlePaidVideo.bind(this, video.content)}
        >
          {video.title}
        </li>
      );
    });
    const renderedSyllable = chapters.map(el => (
      <ul className="course-page-syllable__chapter">
        <span className="course-page-syllable__chapter-name">{el.value}</span>
        {el.topics.map(c => (
          <span className="course-page-syllable__topic"> - {c.value}</span>
        ))}
      </ul>
    ));

    let day = startDate.split("-")[2];
    day = `${day.split("")[0]}${day.split("")[1]}`;
    // const rendereimgdReviews = this.state.reviews.map(review => (
    //   <li className="reviews__item">
    //     {/* <div className="reviews__img-container">
    //               <img src="/img/p1.jpg" className="reviews__img" />
    //               </div> */}
    //     <div className="reviews__info">
    //       <span className="reviews__author">{review.student}</span>
    //       <span className="reviews__comment">{review.text}</span>
    //       <div className="reviews__rating">{getRatingJSX(review.rating)}</div>
    //     </div>
    //   </li>
    // ));

    return (
      <section className="course-page">
        <div className="course-page-info-container">
          <div className="course-page-info">
            <div className="course-page-info__course-card">
              <img src={img} alt="course" className="course-page-info__img" />
              {/* {isMember ? (
                <Link
                  to={`/my-courses/${_id}`}
                  className="course-page-info__buy-course-btn"
                >
                  Go to Topic
                </Link>
              ) : (
                <>
                  <span className="course-page-info__price">{`${price} SR`}</span>{" "}
                  <button
                    className="course-page-info__add-to-cart-btn"
                    onClick={this.addToCart}
                  >
                    Add to cart
                  </button>
                  <div
                    style={{
                      margin: "2rem auto",
                      width: "50%",
                      textAlign: "center"
                    }}
                  >
                    <StripeCheckout
                      stripeKey="pk_test_U8jQFnCO1xQIuYClxSYZg3cy00aH73XkQu"
                      token={this.handleToken}
                      amount={price * 100}
                      name={name}
                      currency="SAR"
                      billingAddress
                      shippingAddress
                    />
                  </div>
                </>
              )} */}
              {this.renderCourseOptions()}
            </div>
            <h1 className="course-page-info__primary-heading">{name}</h1>
            <h2 className="course-page-info__secondary-heading"></h2>
            <div className="course-page-info__rating-container">
              {/* <div className="reviews__rating">{renderedStars}</div> */}
            </div>
            <div className="course-page-info__meta">
              <Link
                to={`/visitor-tutor-profile/${this.state.tutor._id}`}
                className="course-page-info__author"
              >
                {this.state.tutor.name}
              </Link>
              <span className="course-page-info__category">
                {this.state.tutor.phone}
              </span>
              <span className="course-page-info__date"></span>
              <span className="course-page-info__category">
                Catagory: {category}
              </span>
              <span className="course-page-info__institution">
                institution: {institution}
              </span>
              <span className="course-page-info__desc">
                Description: {description}
              </span>
              <div>
                <span>
                  Start Date:{" "}
                  {`${day}/${startDate.split("-")[1]}/${
                    startDate.split("-")[0]
                  }`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <section className="course-page-syllable-section">
          <div className="course-page-syllable">
            <h2 className="course-page-syllable__primary-heading">Syllable</h2>
            <ul className="course-page-syllable__chapter-list">
              {renderedSyllable}
            </ul>
          </div>
        </section>
        {this.state.videos.length > 0 ? (
          <section>
            <div className="videos">
              <div className="videos__options">
                <ul className="videos__list">{renderedVideos}</ul>
              </div>
              <div className="videos__selected-video">
                {/* <h1 className="video__name">{video.title}</h1> */}
                {authError ? (
                  <div>Go to pay</div>
                ) : (
                  <video key={uuidv4()} className="video__player" controls>
                    <source src={`${selectedVideo}`} />
                  </video>
                )}
              </div>
            </div>
          </section>
        ) : null}
        <section className="reviews">
          <h2 className="reviews__primary-heading">Reviews</h2>
          <ul className="reviews__list">{renderedReviews}</ul>
        </section>
      </section>
    );
  }
}

export default TopicPage;
