import DeleteButton from "./DeleteButton";

const Item = ({ item }) => {
  return (
    <div className="bg">
      <div className="container">
        <div className="item">
          <h3>{item.name}</h3> <DeleteButton id={item._id} />
          <style jsx>{`
            .item {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 5px;
            }
            h3 {
              margin: 20px;
              display: block;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Item;