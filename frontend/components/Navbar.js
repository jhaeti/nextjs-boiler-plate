import Link from "next/link";
import { useRouter } from "next/router";
// import Menutoggler from "./Menutoggler";
import { connect } from "react-redux";
import { logout } from "../redux/actions/userAction";

const Navbar = ({ isAuthenticated, logout }) => {
    const isCurrentPage = (path) => {
        const router = useRouter();
        return router.pathname === path ? "active nav__link" : "nav__link";
    };
    return (
        <div className="nav">
            <div className="container">
                <div className="nav__box">
                    <div className="nav__branding">
                        <Link href="/">
                            <a className="nav__logo">LOGO</a>
                        </Link>
                    </div>
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link href="/">
                                <a className={isCurrentPage("/")}>Home</a>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link href="/about">
                                <a className={isCurrentPage("/about")}>About</a>
                            </Link>
                        </li>
                        {!isAuthenticated ? (
                            <>
                                <li className="nav__item">
                                    <Link href="/register">
                                        <a
                                            className={isCurrentPage(
                                                "/register"
                                            )}
                                        >
                                            Register
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav__item">
                                    <Link href="/login">
                                        <a className={isCurrentPage("/login")}>
                                            Login
                                        </a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav__item">
                                <Link href="/login">
                                    <a
                                        className={isCurrentPage("/login")}
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};
export default connect(mapStateToProps, { logout })(Navbar);
