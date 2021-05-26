import Link from "next/link";
import Menutoggler from "./Menutoggler";
import { Component } from "react";

class Navbar extends Component {
  // handleScroll = (e) => {
  //   console.log(123);
  //   //   let element = e.target;
  //   //   if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  //   //     // do something at end of scroll
  //   //     console.log("Scrolling");
  //   //   }
  // };
  render() {
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
            <li>
              <Link href="/register">
                <a>Register</a>
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
            color: #fff;
          }

          .container {
            width: 1366px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
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

          // LapTops Screens
          @media only screen and (max-width: 1440px) {
            .container {
              width: 80%;
            }
          }

          // Mobile version
          @media only screen and (max-width: 767px) {
            .container {
              width: 90%;
            }
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
  }
}
export default Navbar;
