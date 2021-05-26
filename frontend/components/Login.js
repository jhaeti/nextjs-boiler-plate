import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/userAction";
import Router from "next/router";
import Link from "next/link";

const Login = (props) => {
  const [state, setState] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Attempting to Login
  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(state);
    setState({ email: "", password: "" });
    Router.push("/");
  };
  console.log(props.isAuthenticated);
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
              <div className="title-lg">Login</div>
              <div className="eula">
                By logging in you agree to the ridiculously long terms that you
                didn't bother to read
              </div>
            </div>
            <div className="right">
              <form onSubmit={handleSubmit} className="form">
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
                <Link href="/register">
                  <a>Create an account</a>
                </Link>
                <input type="submit" id="submit" value="Submit" />
              </form>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 640px;
          height: 100%;
          align-items: center;
        }
        input[type="email"],
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
            max-height: 300px;
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
export default connect(mapStateToProps, { login })(Login);
