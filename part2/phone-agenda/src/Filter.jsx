const Filter = ({ filter, handelFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handelFilterChange} />
    </div>
  );
};

export default Filter;
