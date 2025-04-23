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


  useEffect(() => {
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
  
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
  
    const payload = {
      offices: office, // Now it's [{ office: "..." }]
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
              value={form.firstName}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2.5">Last Name <span className="text-red">*</span></label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
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
            value={data.id}
            disabled
            className="input bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Country */}
        <div className="mb-5">
          <label className="block mb-2.5">Country/Region <span className="text-red">*</span></label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="input"
          >
            <option value="0">Australia</option>
            <option value="1">America</option>
            <option value="2">England</option>
          </select>
        </div>

        {/* Office Name */}
        <div className="mb-5">
          <label className="block mb-2.5">Office</label>
          {office.map((item, index) => (
  <div className="mb-5" key={index}>
    <label className="block mb-2.5">Office {index + 1}</label>
    <input
      type="text"
      name={`office-${index}`}
      value={item.office}
      onChange={(e) => handleOfficeChange(index, e)}
      className="input"
    />
  </div>
))}

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
