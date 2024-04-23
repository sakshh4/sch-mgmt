import Classroom from "../assets/classroom";
import Dashboard from "../assets/dashboard";
import Student from "../assets/student";
import Subject from "../assets/subject";
import Teacher from "../assets/teacher";

export const SidebarItems = [
  {
    link: "/",
    Icon: Dashboard,
    title: "Home",
  },
  {
    link: "/classes",
    Icon: Classroom,
    title: "Classes",
  },
  {
    link: "/teachers",
    Icon: Teacher,
    title: "Teachers",
  },
  {
    link: "/students",
    Icon: Student,
    title: "Students",
  },
  {
    link: "/subjects",
    Icon: Subject,
    title: "Subjects",
  },
];
