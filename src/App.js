// JSX
// ㄴ Javascript XML

import { RouterProvider } from "react-router-dom";
import router from "./router";
// import BookList from "./components/BookList";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
