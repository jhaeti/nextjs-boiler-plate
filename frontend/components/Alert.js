import { connect } from "react-redux";
import { clearMsg } from "../redux/actions/userAction";

const Alert = (props) => {
  const { msg, clearMsg } = props;
  console.log(msg);
  return (
    msg && (
      <div className="container">
        <div className="msg">
          {msg}
          <div
            onClick={() => {
              clearMsg();
            }}
            className="x"
          >
            x
          </div>
        </div>
        <style jsx>{`
          .container {
            justify-content: flex-end;
          }
          .msg {
            background: rgba(0, 255, 0, 0.4);
            padding: 1rem 0rem 1rem 1.5rem;

            margin-top: 1rem;
            color: green;
            position: absolute;
            z-index: 2;
            cursor: pointer;
          }
          .x {
            display: inline;
            padding: 1rem 1.5rem;
            color: #f00;
            opacity: 0.7;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    msg: state.auth.msg,
  };
};

export default connect(mapStateToProps, { clearMsg })(Alert);
