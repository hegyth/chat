import React from "react";
import "./globalScss/App.scss";
import AuthUserPage from "./pages/AuthUserPage";
import CreateChatPage from "./pages/CreateChatPage";
import { useAppSelector } from "./redux/store";

function App() {
  const { idInstance, apiTokenInstance } = useAppSelector(
    (state) => state.authData.authenticationData
  );

  return (
    <React.Fragment>
      {apiTokenInstance && idInstance ? <CreateChatPage /> : <AuthUserPage />}
    </React.Fragment>
  );
}

export default App;
