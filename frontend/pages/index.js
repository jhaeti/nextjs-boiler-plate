import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Layout } from "../components/Layout";
import axios from "axios";
import Items from "../components/Items";
import { getItems } from "../redux/actions/itemAction";
import { loadUser } from "../redux/actions/userAction";

class Index extends Component {
  componentDidMount() {
    this.props.getItems();
    this.props.loadUser();
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <Items />
        </div>
        <style jsx>{`
          .container {
            flex-direction: column;
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
