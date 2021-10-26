import DeleteButton from "./DeleteButton";

const Item = ({ item }) => {
    return (
        <div className="bg">
            <div className="container">
                <div className="item row row--space-between row--v-center">
                    <h3 className="item__text">{item.name}</h3>{" "}
                    <DeleteButton id={item._id} />
                </div>
            </div>
        </div>
    );
};

export default Item;
