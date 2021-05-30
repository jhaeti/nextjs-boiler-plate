import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../redux/actions/userAction";
import Router from "next/router";
import Link from "next/link";

const Register = (props) => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //   Attempting to Register a User
  const handleSubmit = (e) => {
    e.preventDefault();
    props.register(state);
    setState({ email: "", password: "" });
    Router.push("/");
  };
  return (
    <div className="page">
      <div className="container">
        {props.isAuthenticated ? (
          <h3>
            You have already log in your account you have access to all
            oprations on the website.
          </h3>
        ) : (
          <>
            <div className="left">
              <div className="title-lg">Register</div>
              <div className="eula">
                By registering in you gain access to adding items and deleting
                items of your choice
              </div>
            </div>
            <div className="right">
              <form onSubmit={handleSubmit} className="form">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={state.name}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={state.email}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={state.password}
                />
                <Link href="/login">
                  <a>Already have an account</a>
                </Link>
                <input type="submit" id="submit" value="Submit" />
              </form>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        h3 {
          margin: 30px;
        }
        .container {
          width: 640px;
          height: 100%;
          align-items: center;
        }
        input[type="email"],
        input[type="name"],
        input[type="password"] {
          border-bottom: 1px solid #ddd;
        }
        @media (max-width: 767px) {
          .container {
            width: 320px;
            height: 630px;
            flex-direction: column;
            justify-content: center;
          }
          .left {
            height: 100%;
            width: calc(100% - 40px);
            max-height: 250px;
            position: relative;
            top: 10px;
          }
          .right {
            flex-shrink: 0;
            height: 100%;
            width: 100%;
            position: relative;
            top: -10px;
          }
        }
        a {
          color: #fff;
          display: block;
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { register })(Register);
