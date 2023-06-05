import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import { ClientView } from "./client_view";
import { HomeView } from "./home_view";
import { LoginView } from "./login_view";
import { ManagerView } from "./manager_view";
import { PersonalTrainerView } from "./personal_trainer_view/ui/PersonalTrainerView";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// https://reactrouter.com/en/v6.3.0/getting-started/concepts#parent-route  <-  Routing guide
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="manager" element={<ManagerView />} />
          <Route path="personal-trainer" element={<PersonalTrainerView />} />
          <Route path="client" element={<ClientView />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
