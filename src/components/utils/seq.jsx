let lastId = 0;
const prefix = "id";
export default newId = () => {
  lastId++;
  return `${prefix}${lastId}`;
};
