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
  };

  return (
    <div className="bg">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            className="name-input"
            onChange={handleChange}
            type="text"
            name="item"
            placeholder="Input Item name"
            value={item}
          />
          <button className="submit">Add Item</button>
        </form>
      </div>
      <style jsx>{`
        .bg {
          background: #444;
        }
        .container {
          padding-top: 1.2rem;
          padding-bottom: 1.2rem;
        }
        form {
          display: flex;
        }
        form > * {
          margin: 5px;
        }
        .name-input {
          padding: 1.5rem;
          color: gba(200, 200, 200, 1);
          background: rgba(200, 200, 200, 0.1);
          border: 2px solid rgba(200, 200, 200, 1);
          border-radius: 3px;
          flex: 3.5;
        }

        .submit {
          flex: 1.5;
          font-size: 1rem;
          color: #333;
          background: #3af;
          border: #3af;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default connect(null, { addItem })(AddItem);
