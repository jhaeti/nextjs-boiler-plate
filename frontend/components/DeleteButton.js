import { connect } from "react-redux";
import { deleteItem } from "../redux/actions/itemAction";

const DeleteButton = (props) => {
  const { deleteItem, id } = props;
  return (
    <div onClick={() => deleteItem(id)}>
      Delete Item
      <style jsx>{`
        div {
          background: red;
          padding: 0.7rem 1.2rem;
          border-radius: 3px;
          color: #fff;
          border: 2px solid #f00;
          cursor: pointer;

          transition: all ease-in-out 0.2s;
        }
        div:hover {
          background: rgba(255, 0, 0, 0.1);
          color: red;
          border: 2px solid red;
        }
      `}</style>
    </div>
  );
};

export default connect(null, { deleteItem })(DeleteButton);
