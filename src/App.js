import { useState } from "react";
import "./App.css";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={function (event) {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={`/read/${t.id}`}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(+event.target.id);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  const title = props?.title;
  const body = props?.body;
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="Title" />
        </p>
        <p>
          <textarea name="body" placeholder="Body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "js is ..." },
  ]);
  const [nextId, setNextId] = useState(topics.length + 1);
  let content = null;

  // mode에 따라서 content를 다르게 보여준다.
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB" />;
  } else if (mode === "READ") {
    let title,
      body = null;

    topics
      .filter((t) => t.id === id)
      .map((t) => {
        title = t.title;
        body = t.body;
      });
    content = <Article title={title} body={body} />;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          // topics에 추가
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics, newTopic];
          setTopics(newTopics); // topics 업데이트
          setMode("READ"); // READ로 변경
          setId(nextId); // id 변경
          setNextId(nextId + 1); // nextId 변경
        }}
      ></Create>
    );
  }

  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {/* <Article title="Welcome" body="Hello, WEB"></Article> */}
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        Create Mode
      </a>
    </div>
  );
}

export default App;
