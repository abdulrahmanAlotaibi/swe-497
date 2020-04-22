import React, { Component } from "react";
import { Route, Redirect, Switch, Router, withRouter } from "react-router-dom";
import "./styles/App.scss";
import Header from "./Header";
import Features from "./Features";
import SectionSignup from "./SectionSignup";
import Footer from "./Footer";
import Search from "./Search";
import Profile from "./Profile";
import Admin from "./Admin";
import Signup from "./Signup";
import Signin from "./Signin";
import CoursePage from "./CoursePage";
import ContactUs from "./ContactUs";
import Cart from "./Cart";
import CreateCourse from "./CreateCourse";
import DashboardTutor from "./DashboardTutor";
import StudentProfile from "./StudentProfile";
import TutorProfile from "./TutorProfile";
import Hero from "./components/Hero";
import VisitorTutorProfile from "./VisitorTutorProfile";
import StudentCourses from "./StudentCourses";
import StudentTopics from "./StudentsTopics";
import StreamCreate from "./streams/StreamCreate";
import StreamDashboard from "./streams/StreamDashboard";
import CourseModefication from "./CourseModefication";
import CommentPage from "./CommentPage";
import TopicPage from "./TopicPage";
import Topics from "./Topics";
import CreateTopic from "./CreateTopic";
import TopicModification from "./TopicModification";
import ShowVideo from "./ShowVideo";
import Subscription from "./Subscription";

export const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: false,
      token: "",
      role: "tutor",
      name: "omar",
      isBaned: false,
      id: "",
    };
  }
  // componentDidMount() {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   this.setState({ token });
  // }
  // componentDidUpdate() {
  //   const token = JSON.parse(window.localStorage.getItem("token"));
  //   console.log(">>", window.localStorage.getItem("token"));
  //   // if (this.state.token !== token) this.setState({ token });
  // }

  componentDidMount() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    this.setState({ token: token });
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          updateToken: (newToken) => {
            window.localStorage.setItem("token", JSON.stringify(newToken));

            this.setState({
              token: newToken,
            });
          },
          updateId: (id) => this.setState({ id }),
          updateRole: (newRole) => {
            window.localStorage.setItem("role", JSON.stringify(newRole));
            this.setState({ role: newRole });
          },
          resetAccount: () => {
            window.localStorage.clear();

            this.setState({
              token: "",
              role: "",
              name: "",
              isBaned: false,
              id: "",
            });
          },
          updateAccount: (newToken, newRole, newUserName, isBaned, id) => {
            window.localStorage.setItem(
              "account",
              JSON.stringify({
                token: newToken,
                role: newRole,
                name: newUserName,
                isBaned,
                id,
              })
            );

            this.setState({
              token: newToken,
              role: newRole,
              name: newUserName,
              isBaned,
              id,
            });
          },
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyProvider>
          <Route
            exact
            path="/"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Hero />
                    <Features />
                    <SectionSignup />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path={`/comment/:id`}
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      <Header context={context} />
                      <CommentPage context={context} {...props} />
                      <Footer />
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />

          <Route
            exact
            path="/subscribe/:id"
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      {/* <Header context={context} /> */}
                      <Subscription context={context} {...props} />
                      {/* <Footer /> */}
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />
    
    

          <Route
            exact
            path="/search"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Search context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/course-modification/:id"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <CourseModefication {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/topic-modification/:id"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <TopicModification {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            path="/visitor-tutor-profile/"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <VisitorTutorProfile context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/edit-profile"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Profile {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/contact-us"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <ContactUs context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/signup"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Signup context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/signin"
            render={props => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Signin {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/course/:id"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <CoursePage {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/topic/:id"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <TopicPage {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/dashboard-tutor"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <DashboardTutor context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/create-topic"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <CreateTopic {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/tutor-profile"
            render={() => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <TutorProfile context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/my-courses"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <StudentCourses context={context} {...props} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/my-topics"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <StudentTopics context={context} {...props} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />

          <Route
            exact
            path="/student-profile"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <StudentProfile context={context} {...props} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/admin"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Admin {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/create-course"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <CreateCourse {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
         
          <Route
            exact
            path="/cart"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Cart {...props} context={context} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
          <Route
            exact
            path="/my-courses/:id"
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      <Header context={context} />
                      <ShowVideo {...props} context={context} />
                      <Footer />
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />

          <Route
            exact
            path="/my-topics/:id"
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      <Header context={context} />
                      <ShowVideo {...props} context={context} />
                      <Footer />
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />

          <Route
            exact
            path={`/course-manager/:id`}
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      <Header context={context} />
                      <StreamDashboard {...props} context={context} />
                      <Footer />
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />
          <Route
            exact
            path={`/topic-manager/:id`}
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      <Header context={context} />
                      <StreamDashboard {...props} context={context} />
                      <Footer />
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />

          <Route
            exact
            path={`/streams/:id/post`}
            render={(props) => {
              return (
                <MyContext.Consumer>
                  {(context) => (
                    <>
                      <Header context={context} />
                      <StreamCreate {...props} />
                      <Footer />
                    </>
                  )}
                </MyContext.Consumer>
              );
            }}
          />

          <Route
            exact
            path="/topics"
            render={(props) => (
              <MyContext.Consumer>
                {(context) => (
                  <>
                    <Header context={context} />
                    <Topics {...props} />
                    <Footer />
                  </>
                )}
              </MyContext.Consumer>
            )}
          />
        </MyProvider>
      </div>
    );
  }
}

export default withRouter(App);
