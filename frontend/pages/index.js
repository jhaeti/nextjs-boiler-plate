import React, { Component } from "react";
import { Layout } from "../components/Layout";
import axios from "axios";
import Items from "../components/Items";

export default class index extends Component {
  static async getInitialProps() {
    const res = await axios.get("http://localhost:5000/api/items");
    const data = await res.data;
    return {
      items: data,
    };
  }
  render() {
    const { items } = this.props;
    return (
      <Layout>
        <div className="container">
          <div>
            <Items items={items} />
          </div>
        </div>
        <style jsx>{`
          .container {
            width: 1366px;
            margin: 0 auto;
          }
          // Larger Screens
          @media only screen and (max-width: 1440px) {
            .container {
              width: 80%;
            }
          }
          // Mobile version
          @media only screen and (max-width: 600px) {
            .container {
              width: 90%;
            }
          }
        `}</style>
      </Layout>
    );
  }
}
