import React, { useState } from "react";
import Left from "../subpages/Left";
import GetUserDetails from "../functions/GetUserDetails";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/mentorcalendar.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const HodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [isTodayReportClicked, setTodayReportClicked] = useState(false);

  const { userDetails } = GetUserDetails();

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split("T")[0];
    await sendDateToServer(formattedDate);
  };

  const sendDateToServer = async (formattedDate) => {
    try {
      const result = await fetch(
        `http://localhost:3050/api/hod/report/date/${userDetails.year}/${userDetails.department}/${userDetails.batch}/${formattedDate}`
      );
      console.log("RESULT ", result);
      if (result.ok) {
        const res = await result.json();
        setStudents(res);
        console.log("Students received from backend:", res); // Logging received data
      }
      console.log("Date sent successfully:", formattedDate);
    } catch (error) {
      console.error("Error sending date to server:", error);
    }
  };

  const handleDownload = (sectionKey) => {
    const content = document.getElementById(`table-to-download-${sectionKey}`); // Use a unique identifier

    if (!content) {
      console.error("Table element not found!");
      return;
    }

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`table_content_${sectionKey}.pdf`);
    });
  };

  // const [isSectionClicked, setSectionClicked] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});

  const handleTodaysReportClick = () => {
    setTodayReportClicked(!isTodayReportClicked);
  };

  const handleSectionClick = (sectionKey) => {
    // Toggle the visibility state for the clicked section
    setSectionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [sectionKey]: !prevVisibility[sectionKey],
    }));
  };

  const todayReportClass = {
    display: isTodayReportClicked ? "block" : "none",
  };
  let sno = 1; // Counter for serial numbers
  const filteredSections = Object.keys(students).filter((key) => key !== "_id");

  return (
    <>
      {" "}
      {userDetails ? (
        <div>
          <Left
            iconBg1=""
            iconText1=""
            iconBg2=""
            iconText2=""
            iconBg3=""
            iconText3=""
            iconBg4="#3D3B40"
            iconText4="white"
            iconBg5=""
            iconText5=""
            iconBg6=""
            iconText6=""
            menu1="Dashboard"
            menu2={
              userDetails.category === "student"
                ? "Leave Form"
                : userDetails.category === "hod"
                ? "Leaveform"
                : "Attendance"
            }
            menu3="Edit"
            menu4="Calendar"
            menu5="Settings"
            menu6={userDetails.category === "mentor" ? "Leave Form" : ""}
            link1="/"
            link2={
              userDetails.category === "student"
                ? "/leaveform"
                : userDetails.category === "hod"
                ? "/leaveform-hod"
                : "/attendance"
            }
            link3={
              userDetails.category === "student"
                ? "/edit"
                : userDetails.category === "hod"
                ? "/edit"
                : "/edit"
            }
            link4={
              userDetails.category === "student"
                ? "/student-calendar"
                : userDetails.category === "hod"
                ? "/hod-calendar"
                : "/mentor-calendar"
            }
            link5={
              userDetails.category === "student"
                ? "/settings"
                : userDetails.category === "hod"
                ? "/settings"
                : "/settings"
            }
            link6={
              userDetails.category === "student"
                ? "/student-leaveform"
                : userDetails.category === "hod"
                ? "/hod-leaveform"
                : "/leaveform-mentor"
            }
          />
          {/* <div className="calendar-right">
            <h1 style={{ paddingTop: "50px" }}>Student Attendance Report</h1>
            <div className="calendar-mentor">
              {" "}
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="custom-calendar"
              />
            </div>

            <div
              className="home-view-today-report"
              onClick={handleTodaysReportClick}
            >
              <p>View Today Report</p>
            </div>
            <div className="home-today-report" style={todayReportClass}>
              <button onClick={handleDownload} className="home-download-table">
                Download PDF
              </button>
              <div id="table-to-download">
                <table className="home-today-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Section</th>
                      <th>Roll No</th>
                      <th>Present?</th>
                    </tr>
                    {students.map((item) => (
                      <tr key={item._id}>
                        <td>{sno++}</td>
                        <td>{item.name}</td>
                        <td>{item.department}</td>
                        <td>{item.section}</td>
                        <td>{item.rollNo}</td>
                        {item.presentStatus === "yes" ? (
                          <td style={{ backgroundColor: "rgb(146, 255, 132)" }}>
                            Present
                          </td>
                        ) : (
                          <td style={{ backgroundColor: "rgb(254, 158, 158)" }}>
                            Absent
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
          <div className="home-right">
            <h1 style={{ paddingTop: "50px" }}>Student Attendance Report</h1>
            <div className="calendar-mentor">
              {" "}
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="custom-calendar"
              />
            </div>
            <div
              className="home-view-today-report"
              onClick={handleTodaysReportClick}
            >
              <p>View Today Report</p>
            </div>

            {filteredSections.map((sectionKey) =>
              Array.isArray(students[sectionKey]) ? (
                <div className="home-today-report" style={todayReportClass}>
                  <div
                    className="home-view-section-report"
                    onClick={() => handleSectionClick(sectionKey)}
                  >
                    <p>Section {sectionKey}</p>
                  </div>
                  <div
                    className="home-section"
                    style={{
                      display: sectionVisibility[sectionKey] ? "block" : "none",
                    }}
                  >
                    <button
                      onClick={() => handleDownload(sectionKey)}
                      className="home-download-table"
                    >
                      Download PDF
                    </button>
                    <div id={`table-to-download-${sectionKey}`}>
                      <table className="home-today-table">
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Section</th>
                          <th>Roll No</th>
                          <th>Present?</th>
                        </tr>

                        {students[sectionKey].map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.department}</td>
                            <td>{item.section}</td>
                            <td>{item.rollNo}</td>
                            {item.presentStatus === "yes" ? (
                              <td
                                style={{
                                  backgroundColor: "rgb(146, 255, 132)",
                                }}
                              >
                                Present
                              </td>
                            ) : (
                              <td
                                style={{
                                  backgroundColor: "rgb(254, 158, 158)",
                                }}
                              >
                                Absent
                              </td>
                            )}
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                // enter any text here
                <h1>hi</h1>
              )
            )}
          </div>
        </div>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );
};

export default HodCalendar;
