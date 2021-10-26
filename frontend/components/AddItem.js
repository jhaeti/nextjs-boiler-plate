import { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../redux/actions/itemAction";

const AddItem = ({ isAuthenticated, addItem }) => {
    const [item, setItem] = useState("");

    const handleChange = (e) => {
        setItem(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(item);
        setItem("");
    };

    return (
        <div className="add-item">
            <div className="container">
                <form className="add-item__form" onSubmit={handleSubmit}>
                    <input
                        disabled={!isAuthenticated}
                        className="add-item__input"
                        onChange={handleChange}
                        type="text"
                        name="item"
                        placeholder="Item name"
                        value={item}
                    />
                    <button className="add-item__submit-button">
                        <img
                            src="/icons/plus.svg"
                            alt="Add item Icon"
                            className="add-item__icon"
                        />
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { addItem })(AddItem);
