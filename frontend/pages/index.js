import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Layout } from "../components/Layout";
import axios from "axios";
import Items from "../components/Items";
import { getItems } from "../redux/actions/itemAction";
import { loadUser } from "../redux/actions/userAction";

class Index extends Component {
  static async getInitialProps() {
    const res = await axios.get("http://localhost:5000/api/items");
    const data = await res.data;
    return {
      items: data,
    };
  }

  componentDidMount() {
    this.props.loadUser();
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
            margin: 0 auto 50px auto;
          }
          // Larger Screens
          @media only screen and (max-width: 1440px) {
            .container {
              width: 80%;
              margin-bottom: 50px;
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

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: bindActionCreators(getItems, dispatch),
    loadUser: bindActionCreators(loadUser, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Index);
