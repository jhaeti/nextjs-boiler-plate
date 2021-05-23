const Items = ({ items }) => {
  return items.map((item) => <h3 key={item._id}>{item.name}</h3>);
};

export default Items;
