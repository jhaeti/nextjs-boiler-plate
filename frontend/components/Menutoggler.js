import { useState } from "react";
import Link from "next/link";

const Menutoggler = () => {
  const [rotate, rotateBtn] = useState(false);
  return (
    <div>
      <div
        onClick={() => rotateBtn(!rotate)}
        className={`lines ${rotate ? "menu-rotate" : ""}`}
      >
        <div className={`line ${rotate ? "rotate" : ""}`}></div>
        <div className={`line ${rotate ? "rotate" : ""}`}></div>
        <div className={`line ${rotate ? "rotate" : ""}`}></div>
      </div>
      <ul className={`${rotate ? "show" : ""}`}>
        <li>
          <Link href="/">
            <a onClick={() => rotateBtn(!rotate)}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a onClick={() => rotateBtn(!rotate)}>About</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a onClick={() => rotateBtn(!rotate)}>Login</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .lines {
          z-index: 1000;
          position: fixed;
          right: 0;
          top: 0;
          width: 60px;
          height: 60px;
          transition: 0.5s all ease-in;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background: #333;
          border-radius: 50%;
        }

        .menu-rotate {
          transition: 0.5s all ease-in;
          transform: rotate(180deg);
        }

        .line {
          width: 28px;
          height: 3px;
          background: #fff;
          margin-bottom: 5px;
          transition: 0.5s all ease-in;
          border-radius: 5px;
        }

        .rotate {
          transition: 0.5s all ease-in;
        }
        .rotate:nth-child(1) {
          width: 15px;
          transform: translate(-9px, 4px) rotate(-45deg);
        }
        .rotate:nth-child(3) {
          width: 15px;
          transform: translate(-9px, -4px) rotate(45deg);
        }

        ul {
          position: fixed;
          top: 0;
          right: 0;
          background: #333;
          width: 250px;
          padding: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 20;
          transform: translateX(250px);
          transition: 0.5s all ease-in;
          z-index: 50;
        }

        ul.show {
          top: 0;
          transform: translateX(5px);
          transition: 0.5s all eas-in;
        }
        li {
          list-style: none;
          marign: 0 auto;
          padding: 20px;
          text-align: center;
          width: 100%;
          background: red;
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Menutoggler;
