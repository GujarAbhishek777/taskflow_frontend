import { Routes, Route , Navigate} from "react-router-dom";
import Home from "../components/Home";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Dashboard from "../Dashboard/Dashboard";
import Tasks from "../Dashboard/Tasks";
import Users from "../Dashboard/Users";
import Messages from "../Dashboard/Messages";
import Analytics from "../Dashboard/Analytics";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/analytics" element={<Analytics />} />



      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
