import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/userAction";
import Link from "next/link";

const Login = ({ login }) => {
    const [state, setState] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // Attempting to Login
    const handleSubmit = (e) => {
        e.preventDefault();
        login(state);
    };
    return (
        <div className="col col--center col-fill-between">
            <div className="container">
                <div className="row row--center">
                    <div className="login-box absolute-center">
                        <div className="login-box__left pl--4 pr--4 pt--8 pb--8">
                            <h2 className="heading-primary heading-primary--bold mb--4">
                                Login
                            </h2>
                            <p className="paragraph paragraph--sm">
                                By logging in you agree to the ridiculously long
                                terms that you didn't bother to read
                            </p>
                        </div>
                        <div className="login-box__right pl--4 pr--4 pt--3 pb--3">
                            <form
                                onSubmit={handleSubmit}
                                className="login-box__form"
                            >
                                <label
                                    htmlFor="email"
                                    className="login-box__label"
                                >
                                    Email
                                </label>
                                <input
                                    className="login-box__input"
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={state.email}
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className="login-box__label mt--2"
                                >
                                    Password
                                </label>
                                <input
                                    className="login-box__input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={state.password}
                                    required
                                />
                                <Link href="/register">
                                    <a className="login-box__link mt--2">
                                        Create an account
                                    </a>
                                </Link>
                                <input
                                    className="login-box__submit mt--3"
                                    type="submit"
                                    id="submit"
                                    value="Submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { login })(Login);
