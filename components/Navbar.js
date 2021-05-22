import Link from "next/link";
import Menutoggler from "./Menutoggler";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbranding">
          <Link href="/">
            <a>LOGO</a>
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
        <div className="toggle-btn">
          <Menutoggler />
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 60px;
          width: 100%;
          background: #333;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          width: 80%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        ul {
          display: flex;
        }

        ul li {
          margin: 0 10px;
          list-style: none;
        }

        a {
          text-decoration: none;
          color: #fff;
        }

        .toggle-btn {
          display: none;
        }
        // Mobile version
        @media only screen and (max-width: 600px) {
          .toggle-btn {
            display: block;
          }
          ul {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
