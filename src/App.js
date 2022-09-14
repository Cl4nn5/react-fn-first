import "./App.css";

function App() {
  let list = ["hiyo", "hello", "안녕"];
  const renderList = list.map((item) => {
    return <li>{item}</li>;
  });

  return (
    <div>
      <ul>{renderList}</ul>
    </div>
  );
}

export default App;
