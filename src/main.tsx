import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import PersonChat from "./components/PersonChat/PersonChat.tsx";
import "./globalScss/index.scss";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:chatId" element={<PersonChat />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
