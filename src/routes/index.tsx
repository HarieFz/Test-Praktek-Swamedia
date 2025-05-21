import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import AddUser from "../pages/user/AddUser";

export default function SetupRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="add" element={<AddUser />} />
      </Route>
    </Routes>
  );
}
