import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Attendance from "./pages/Attendance";
import Edit from "./pages/Edit";
import LeaveForm from "./pages/LeaveForm";
import LeaveFormMentor from "./mentor/LeaveFormMentor";
import LeaveFormHod from "./hod/LeaveFormHod";
import MentorCalendar from "./mentor/MentorCalendar";
import Settings from "./pages/Settings";
import StudentCalendar from "./student/StudentCalendar";
import HodCalendar from "./hod/HodCalendar";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/mentor-calendar" element={<MentorCalendar />} />
        <Route path="/leaveform" element={<LeaveForm />} />
        <Route path="/leaveform-mentor" element={<LeaveFormMentor />} />
        <Route path="/leaveform-hod" element={<LeaveFormHod />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/student-calendar" element={<StudentCalendar />} />
        <Route path="/hod-calendar" element={<HodCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
