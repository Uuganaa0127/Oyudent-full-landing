import { useState, useEffect } from "react";

function AccountDetails({ data }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Load data into form state on mount/update
  useEffect(() => {
    if (data) {
      setForm({
        ...form,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        country: data.country || "0", // default option value
      });
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    console.log("Saving profile:", form);
    // call API to update profile
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("Changing password:", form);
    // call API to change password
  };

  return (
    <form>
      <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block mb-2.5">
              First Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none"
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block mb-2.5">
              Last Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none"
            />
          </div>
        </div>
{/* 
        <div className="mb-5">
          <label htmlFor="country" className="block mb-2.5">
            Country/Region <span className="text-red">*</span>
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full bg-gray-1 rounded-md border border-gray-3 py-3 pl-5 pr-9 outline-none"
          >
            <option value="0">Australia</option>
            <option value="1">America</option>
            <option value="2">England</option>
          </select>
        </div> */}

        <button
          type="submit"
          onClick={handleSubmitProfile}
          className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md"
        >
          Save Changes
        </button>
      </div>

      <p className="text-custom-sm mt-5 mb-9">
        This will be how your name will be displayed in the account section and in reviews.
      </p>

      <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
        Password Change
      </p>

      <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
        <div className="mb-5">
          <label htmlFor="oldPassword" className="block mb-2.5">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2.5">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="confirmNewPassword" className="block mb-2.5">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none"
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
