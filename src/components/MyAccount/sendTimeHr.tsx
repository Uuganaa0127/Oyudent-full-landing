import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { apiRequest } from "@/utils/api"; // ✅ Your API helper

const La = L;

export function sendTimeHr() {
  type AttendanceRecord = {
    id: string;
    createdAt: string;
    type: string;
    office: {
      name: string;
    };
  };

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    getAccountData();
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("📍 Current Location:", latitude, longitude);
        },
        (err) => {
          console.error("❌ Geolocation error:", err);
          setError("Location access denied or unavailable.");
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  const getAccountData = async () => {
    try {
      const data1 = await apiRequest("timesheet", "GET");
      setAttendance(data1);
    } catch (err) {
      console.error("Fetching error:", err);
    }
  };

  const sendTime = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = {
      lat: data.latitude,
      long: data.longitude,
      type: "in",
    };

    try {
      await apiRequest("timesheet", "POST", formData);
      setPopupType("success");
      setPopupMessage("🟢 Time IN submitted successfully!");
      getAccountData();
    } catch (err) {
      console.error("POST error:", err);
      setPopupType("error");
      setPopupMessage("❌ Failed to submit Time IN.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 3000);
    }
  };

  const sendOutTime = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = {
      lat: data.latitude,
      long: data.longitude,
      type: "out",
    };

    try {
      await apiRequest("timesheet", "POST", formData);
      setPopupType("success");
      setPopupMessage("🟢 Time OUT submitted successfully!");
      getAccountData();
    } catch (err) {
      console.error("POST error:", err);
      setPopupType("error");
      setPopupMessage("❌ Failed to submit Time OUT.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 3000);
    }
  };

  const openPopup = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4 text-black mt-0 md:mt-10 sm:mt-50">
      <div className="flex flex-col w-full max-w-md gap-2">
        <button
          onClick={() => sendTime(location)}
          className="bg-green-500 text-black px-4 py-2 rounded w-full hover:border-2 border-black"
        >
          Ирсэн
        </button>
        <button
          onClick={() => sendOutTime(location)}
          className="bg-blue-500 text-black px-4 py-2 rounded w-full hover:border-2 border-black"
        >
          Явсан
        </button>
      </div>

      {attendance.length > 0 ? (
        <div className="w-full max-w-lg border p-4 rounded shadow text-black">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Your Attendance for Last Month
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-black text-black">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="border border-black px-4 py-2">Date</th>
                  <th className="border border-black px-4 py-2">Type</th>
                  <th className="border border-black px-4 py-2">Office</th>
                  <th className="border border-black px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-black">
                    <td className="border border-black px-4 py-2">
                      {new Date(record.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-black px-4 py-2">
                      {record.type}
                    </td>
                    <td className="border border-black px-4 py-2">
                      {record.office?.name}
                    </td>
                    <td className="border border-black px-4 py-2">
                      <button
                        className="bg-red-500 text-black px-2 py-1 rounded hover:border-2 border-black"
                        onClick={() => openPopup(record.createdAt)}
                      >
                        Request Change
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-black">No attendance records available.</p>
      )}

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center text-black">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Request Change for {selectedDate}
            </h3>
            <textarea
              className="w-full p-2 border rounded mb-4 text-black"
              placeholder="Enter your reason"
            ></textarea>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-black px-4 py-2 rounded"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button className="bg-green-500 text-black px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Popup message */}
      {popupMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center text-black">
          {/* <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 ${
            popupType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        > */}
          <a>
          {popupMessage}

          </a>
        {/* </div> */}
          </div>
        </div>
      )}
      {/* {!popupMessage && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 ${
            popupType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {popupMessage}
        </div>
      )} */}
    </div>
  );
}

export default sendTimeHr;
