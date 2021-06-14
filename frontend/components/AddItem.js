import { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../redux/actions/itemAction";

const AddItem = (props) => {
  const [item, setitem] = useState("");

  const handleChange = (e) => {
    setitem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addItem(item);
    setitem("");
  };

  const { isAuthenticated } = props;
  return (
    <div className="bg">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            disabled={!isAuthenticated}
            className="name-input"
            onChange={handleChange}
            type="text"
            name="item"
            placeholder="Item name"
            value={item}
          />
          <button className="submit">ADD</button>
        </form>
      </div>
      <style jsx>{`
        .container {
          justify-content: flex-end;
          padding: 0 1.2rem;
        }
        form {
          display: flex;
        }
        form > * {
          margin-top: 10px;
          border-radius: 3px;
          padding: 0.8rem 1.5rem;
          height: 3rem;
        }
        .name-input {
          color: #000;
          background: hsl(0, 0%, 85%);
          flex: 3.5;
        }

        .submit {
          margin: 10px;
          flex: 1.5;
          color: #fff;
          background: hsl(0, 0%, 30%);
          border: 2px solid transparent;
          font-size: 1rem;
          transition: all ease-in 0.2s;
        }

        .submit:hover {
          border: 2px solid hsl(0, 0%, 20%);
          background: hsla(0, 0%, 20%, 0.3);
          color: hsl(0, 0%, 20%);
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addItem })(AddItem);
