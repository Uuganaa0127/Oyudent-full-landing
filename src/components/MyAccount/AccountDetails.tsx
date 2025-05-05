import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api"; // ✅ Import API function

function AccountDetails({ data }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [office, setOffice] = useState([{ office: "" }]);
  const [selectedOfficeId, setSelectedOfficeId] = useState("");
  const [officeData, setOfficeData] = useState([]); // Make it array
  
  useEffect(() => {
    GetOffices()
    if (data) {
      setForm({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        country: data.country || "0",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOfficeChange = (index, e) => {
    const { value } = e.target;
    setOffice((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], office: value };
      return updated;
    });
  };
  const GetOffices = async () => {
    try {
      const res = await apiRequest("office", "GET");
      setOfficeData(res); // Assuming res is an array of office names or objects
    } catch (err) {
      console.log(err,'pizda');
      
      console.error("Error fetching offices:", err);
    }
  };
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
  
    const payload = {
      offices: [selectedOfficeId], // ✅ Send as string in array
    };
  
    const res = await apiRequest(`user/${data?.id}/office`, "PUT", payload);
    console.log("Saved:", res);
  };
  
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("Changing password:", form);
  };

  return (
    <form>
      <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
        {/* Name Fields */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label className="block mb-2.5">First Name <span className="text-red">*</span></label>
            <input
              type="text"
              name="firstName"
              value={form.firstName || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2.5">Last Name <span className="text-red">*</span></label>
            <input
              type="text"
              name="lastName"
              value={form.lastName || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Office ID */}
        <div className="mb-5">
          <label className="block mb-2.5">ID <span className="text-red">*</span></label>
          <input
  type="text"
  name="id"
  value={data?.id ?? ""}
  readOnly
  className="input bg-gray-200 cursor-not-allowed"
/>

        </div>

        <div className="mb-5">
  <label className="block mb-2.5 text-sm font-medium text-gray-700">Select Office</label>
  <select
  name="office"
  value={selectedOfficeId}
  onChange={(e) => setSelectedOfficeId(e.target.value)}
  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150 ease-in-out"
>
  <option value="">-- Select Office --</option>
  {Array.isArray(officeData) &&
    officeData.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name || item.office} (ID: {item.id})
      </option>
    ))}
</select>

</div>
        <button
          type="submit"
          onClick={handleSubmitProfile}
          className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md"
        >
          Save Changes
        </button>
      </div>

      {/* Password Section */}
      <p className="font-medium text-xl sm:text-2xl text-dark mt-10 mb-7">Password Change</p>
      <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
        <div className="mb-5">
          <label className="block mb-2.5">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2.5">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2.5">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            className="input"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md"
        >
          Change Password
        </button>
      </div>
    </form>
  );
}

export default AccountDetails;
