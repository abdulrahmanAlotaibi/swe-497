import React, { Component } from "react";
import { Route, Redirect, Switch, Router, withRouter } from "react-router-dom";
import "App.scss";
import Header from "components/header/Header";
import Features from "pages/home/Features";
// import SectionSignup from "pages/signup/SectionSignup";
import Footer from "components/footer/Footer";
import Search from "pages/search/Search";
import Profile from "pages/profile/Profile";
import Admin from "pages/adminDashboard/Admin";
import Signup from "pages/signup/Signup";
import Signin from "pages/signin/Signin";
import CoursePage from "pages/courseDetails/CoursePage";
import ContactUs from "pages/contactUs/ContactUs";
import Cart from "pages/cart/Cart";
import CreateCourse from "pages/course/CreateCourse";
import DashboardTutor from "pages/tutorDashboard/DashboardTutor";
import StudentProfile from "pages/profile/StudentProfile";
import TutorProfile from "pages/profile/TutorProfile";
import Hero from "pages/home/Hero";
import VisitorTutorProfile from "pages/profile/VisitorTutorProfile";
import StudentCourses from "pages/course/StudentCourses";
import StudentTopics from "pages/topic/StudentsTopics";
// import StreamCreate from "streams/StreamCreate";
// import StreamDashboard from "streams/StreamDashboard";
import CourseModefication from "pages/course/CourseModefication";
import CommentPage from "pages/commentDetails/CommentPage";
import TopicPage from "pages/topic/TopicPage";
import Topics from "pages/topic/Topics";
import CreateTopic from "pages/topic/CreateTopic";
import TopicModification from "pages/topic/TopicModification";
import ShowVideo from "pages/videoDetails/ShowVideo";
import Subscription from "components/subscription/Subscription";
import Home from "pages/home/Home";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002333",
    },
    secondary: {
      main: "#40D5A1",
    },
  },
  typography: {
    fontSize: "1.6rem",
  },
});

export const MyContext = React.createContext();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <MyContext.Consumer>
              {(context) => (
                <>
                  <Home />
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
          render={(props) => (
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
                    {/* <StreamDashboard {...props} context={context} /> */}
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
                    {/* <StreamDashboard {...props} context={context} /> */}
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
                    {/* <StreamCreate {...props} /> */}
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
      </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
