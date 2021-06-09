import { connect } from "react-redux";
import { deleteItem } from "../redux/actions/itemAction";

const DeleteButton = (props) => {
  const { deleteItem, id } = props;
  return (
    <div onClick={() => deleteItem(id)}>
      Delete Item
      <style jsx>{`
        div {
          background: hsl(0, 100%, 30%);
          padding: 0.7rem 1.2rem;
          border-radius: 3px;
          color: #fff;
          border: 2px solid hsl(0, 100%, 30%);
          cursor: pointer;

          transition: all ease-in-out 0.2s;
        }
        div:hover {
          background: hsla(0, 100%, 30%, 0.1);
          color: hsl(0, 100%, 30%);
        }
      `}</style>
    </div>
  );
};

export default connect(null, { deleteItem })(DeleteButton);
