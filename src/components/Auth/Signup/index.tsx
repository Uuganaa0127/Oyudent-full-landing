"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { signUpUser } from "@/utils/api"; // ✅ Import API function

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    register: "",
    email: "",
    phone: "",
    password: "",
    passwordMatch: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validate input fields before submission
  const validateInputs = () => {
    const registerRegex = /^[A-Za-zА-Яа-яҮүӨө]{2}\d{8}$/;
    const phoneRegex = /^\d{8}$/; // 🔥 Exactly 8 digits
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!registerRegex.test(formData.register)) {
      return "Регистер 2 үсэг + 8 тоо байх ёстой. (Жишээ: AB12345678)";
    }
    if (!phoneRegex.test(formData.phone)) {
      return "Утасны дугаар 8 оронтой байх ёстой.";
    }
    if (formData.password.length < 8) {
      return "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Имэйл хаяг зөв оруулна уу. (Жишээ: example@example.com)";
    }
    if (formData.password !== formData.passwordMatch) {
      return "Нууц үг тохирохгүй байна.";
    }
    return null; // ✅ No errors
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const validationError = validateInputs();
    if (validationError) {
      setMessage(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await signUpUser(formData);
      const x = response.json();
      console.log(x);

      setMessage("Бүртгэл амжилттай хийгдлээ! 🎉");
    } catch (error: any) {
      setMessage(error.message || "Бүртгэл амжилтгүй боллоо.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Breadcrumb title={"Signup"} pages={["Signup"]} /> */}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Бүртгүүлэх
              </h2>
              <p>Та мэдээллээ оруулна уу</p>
            </div>

            <div className="mt-5.5">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="lastname" className="block mb-2.5">
                    Овог <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Овог оруулна уу"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="firstname" className="block mb-2.5">
                    Нэр <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Нэр оруулна уу"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="register" className="block mb-2.5">
                    Регистер <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="register"
                    id="register"
                    placeholder="AB12345678"
                    value={formData.register}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="phone" className="block mb-2.5">
                    Утасны дугаар <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="88887777"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="phone" className="block mb-2.5">
                    И-мэйл хаяг <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="Email"
                    placeholder="john.doe@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Нууц үг <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="passwordMatch" className="block mb-2.5">
                    Нууц үгээ давтна уу <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="passwordMatch"
                    id="passwordMatch"
                    placeholder="Re-type your password"
                    value={formData.passwordMatch}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none duration-200 focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                  {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
                </button>

                {message && (
                  <p className="text-center text-red-600 mt-4">{message}</p>
                )}

                <p className="text-center mt-6">
                  Та өөрийн бүртгэлтэй юу?
                  <Link
                    href="/signin"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    Нэвтрэх
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
