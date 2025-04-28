"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api";

type AttendanceRecord = {
  id: string;
  createdAt: string;
  type: string;
  office: {
    name: string;
  };
};

export default function SendTimeHr() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error" | "">("");
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchAttendance();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          console.error("❌ Geolocation error:", err);
        }
      );
    }
  }, []);

  const fetchAttendance = async () => {
    try {
      const data = await apiRequest("timesheet", "GET");
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const submitTime = async (type: "in" | "out") => {
    if (isSubmitting || !location.latitude || !location.longitude) return;
    setIsSubmitting(true);

    const formData = { lat: location.latitude, long: location.longitude, type };

    try {
      await apiRequest("timesheet", "POST", formData);
      setPopupType("success");
      setPopupMessage(`🟢 Time ${type.toUpperCase()} submitted successfully!`);
      fetchAttendance();
    } catch (error) {
      setPopupType("error");
      setPopupMessage(`❌ Failed to submit Time ${type.toUpperCase()}.`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 3000);
    }
  };

  const openPopup = (date: string) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
  };

  const groupByMonth = (records: AttendanceRecord[]) => {
    const months: { [key: string]: AttendanceRecord[] } = {};
    records.forEach((rec) => {
      const month = new Date(rec.createdAt).toLocaleString("default", { year: "numeric", month: "long" });
      if (!months[month]) months[month] = [];
      months[month].push(rec);
    });
    return months;
  };

  const toggleMonth = (month: string) => {
    setOpenMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const attendanceByMonth = groupByMonth(attendance);

  return (
    <div className="p-6 flex flex-col items-center gap-6 text-black mt-10">
      {/* Check In / Out Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => submitTime("in")}
          className="bg-green-500 hover:bg-green-600 text-grey font-bold py-2 px-6 rounded w-full"
          disabled={isSubmitting}
        >
          Check In
        </button>
        <button
          onClick={() => submitTime("out")}
          className="bg-blue-500 hover:bg-blue-600 text-grey font-bold py-2 px-6 rounded w-full"
          disabled={isSubmitting}
        >
          Check Out
        </button>
      </div>

      {/* Attendance List */}
      <div className="w-full max-w-4xl mt-8">
        {Object.keys(attendanceByMonth).length > 0 ? (
          Object.entries(attendanceByMonth).map(([month, records]) => (
            <div key={month} className="mb-6">
              {/* Month Header */}
              <button
                onClick={() => toggleMonth(month)}
                className="w-full flex justify-between items-center bg-gray-200 px-6 py-3 rounded-lg font-semibold shadow text-black hover:bg-gray-300"
              >
                <span>{month}</span>
                <span>{openMonths[month] ? "▲" : "▼"}</span>
              </button>

              {/* Records Table */}
              {openMonths[month] && (
                <div className="overflow-x-auto mt-2 border rounded-lg shadow text-black">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 text-black">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase">Office</th>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-grey divide-y divide-gray-200 text-black">
                      {records.map((rec) => (
                        <tr key={rec.id}>
                          <td className="px-6 py-4 greyspace-nowrap">{new Date(rec.createdAt).toLocaleString()}</td>
                          <td className="px-6 py-4 greyspace-nowrap capitalize">{rec.type}</td>
                          <td className="px-6 py-4 greyspace-nowrap">{rec.office?.name}</td>
                          <td className="px-6 py-4 greyspace-nowrap">
                            <button
                              onClick={() => openPopup(rec.createdAt)}
                              className="bg-red-500 hover:bg-red-600 text-grey font-bold py-1 px-3 rounded text-xs"
                            >
                              Request Change
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-black">No attendance records available.</p>
        )}
      </div>

      {/* Request Change Popup */}
      {showPopup && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-grey p-8 rounded-lg w-96 shadow-lg relative text-black">
            <h3 className="text-xl font-bold mb-4">Request Change</h3>
            <p className="mb-4">Date: {new Date(selectedDate).toLocaleString()}</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your reason here..."
              rows={4}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-grey font-semibold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Success/Error Notification */}
      {popupMessage && (
        <div className="fixed bottom-4 right-4 flex items-center justify-center z-50">
          <div
            className={`px-6 py-3 rounded-lg text-grey font-semibold shadow-lg ${
              popupType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popupMessage}
          </div>
        </div>
      )}
    </div>
  );
}
