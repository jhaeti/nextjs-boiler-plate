import { connect } from "react-redux";
import { clearMsg } from "../redux/actions/userAction";

const Alert = (props) => {
  const { msg, clearMsg } = props;

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
        {setTimeout(() => clearMsg(), 3000)}
        <style jsx>{`
          .container {
            justify-content: flex-end;
          }
          .msg {
            background: hsl(131, 60%, 81%);
            padding: 1rem 0rem 1rem 1.5rem;

            margin-top: 1rem;
            color: hsl(131, 50%, 21%);
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
