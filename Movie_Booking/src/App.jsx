import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { renderRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes()}
        {/*Localhost :5173 */}
        {/* <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="list-movie" element={<ListMoviePage />} />
        </Route>*/}

        {/*Localhost :5173/admin - AdminTemplate */}
        {/*<Route path="admin" element={<AdminTemplate />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="add-user" element={<AddUserPage />} />
        </Route>*/}

        {/*<Route path="auth" element={<AuthPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
