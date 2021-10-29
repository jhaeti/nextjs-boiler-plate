import { connect } from "react-redux";
import Item from "./Item";

const Items = ({ items }) => {
    return items.map((item) => <Item key={item._id} item={item} />);
};

const mapStateToProps = (state) => {
    return {
        items: state.item.items,
    };
};

export default connect(mapStateToProps, null)(Items);
