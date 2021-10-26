import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../redux/actions/userAction";
import Link from "next/link";

const Register = ({ register }) => {
    const [state, setState] = useState({ name: "", email: "", password: "" });
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    //   Attempting to Register a User
    const handleSubmit = (e) => {
        e.preventDefault();
        register(state);
    };
    return (
        <div className="col col--center col-fill-between">
            <div className="container">
                <div className="row row--center">
                    <div className="register-box absolute-center">
                        <div className="register-box__left pl--4 pr--4 pt--8 pb--8">
                            <h2 className="heading-primary heading-primary--bold mb--4">
                                Register
                            </h2>
                            <p className="paragraph paragraph--sm">
                                By registering in you gain access to adding
                                items and deleting items of your choice
                            </p>
                        </div>
                        <div className="register-box__right pl--4 pr--4 pt--3 pb--3">
                            <form
                                onSubmit={handleSubmit}
                                className="register-box__form"
                            >
                                <label
                                    className="register-box__label"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="register-box__input"
                                    type="name"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    value={state.name}
                                    required
                                />
                                <label
                                    className="register-box__label mt--2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="register-box__input"
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={state.email}
                                    required
                                />
                                <label
                                    className="register-box__label mt--2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="register-box__input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={state.password}
                                    required
                                />
                                <Link href="/login">
                                    <a className="register-box__link mt--2">
                                        Already have an account
                                    </a>
                                </Link>
                                <input
                                    className="register-box__submit mt--3"
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

export default connect(null, { register })(Register);
