import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./RoutesConfig";
import Home from "../pages/Home";
import Classroom from "../pages/Classroom";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student";
import Subjects from "../pages/Subjects";
import NotFound from "../pages/404";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.Home} element={<Home />} />
      <Route path={ROUTES.Classes} element={<Classroom />} />
      <Route path={ROUTES.Teacher} element={<Teacher />} />
      <Route path={ROUTES.Student} element={<Student />} />
      <Route path={ROUTES.Subjects} element={<Subjects />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default WebRoutes;
