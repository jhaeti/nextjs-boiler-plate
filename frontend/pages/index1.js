import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Layout } from "../components/Layout";
import Items from "../components/Items";
import { wrapper } from "../redux/store";
import { getItems } from "../redux/actions/itemAction";

class Index1 extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <div>{/* <Items /> */}</div>
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

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(getItems());
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: bindActionCreators(getItems, dispatch),
  };
};

export default connect(null, { getItems })(Index1);
