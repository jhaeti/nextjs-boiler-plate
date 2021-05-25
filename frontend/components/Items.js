import { connect } from "react-redux";
import Item from "./Item";

const Items = ({ items }) => {
  return items.map((item) => <Item key={item._id} item={item} />);
};

export default connect((state) => state)(Items);
