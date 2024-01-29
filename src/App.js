import { Routes, Route } from "react-router-dom";
import CreatePost from "./Website/CreatePost/CreatePost";
import Home from "./Website/Home/Home";
import "./style.scss";
import Login from "./Website/Login/login";
import RequireAuth from "./Website/Login/RequiredAuth";
import UpdatePost from "./Website/UpdatePost/UpdatePost";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
