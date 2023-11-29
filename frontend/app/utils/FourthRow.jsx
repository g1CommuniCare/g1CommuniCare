import React, { useState, useEffect } from "react";

const FourthRow = ({
  firstTitle = "",
  secondTitle = "",
  handleChange = () => {},
}) => {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (value) => {
    const isValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      );
    setIsPasswordValid(isValid);
  };

  const validateConfirmPassword = (value, passwordValue) => {
    const isValid = value === passwordValue;
    setIsConfirmPasswordValid(isValid);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    handleChange(e);
    setFormData({ ...formData, password: value });
    validatePassword(value);

    // If confirm password is present, validate it as well
    if (formData.confirmPassword) {
      validateConfirmPassword(formData.confirmPassword, value);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    handleChange(e);
    setFormData({ ...formData, confirmPassword: value });
    validateConfirmPassword(value, formData.password);
  };

  useEffect(() => {
    // When password changes, re-validate confirm password
    validateConfirmPassword(formData.confirmPassword, formData.password);
  }, [formData.password]);

  return (
    <div className="flex gap-8 w-[688px] mt-2">
      <div className="flex flex-col">
        <label htmlFor="passwordId">{firstTitle}</label>
        <input
          type="password"
          id="passwordId"
          name="password"
          onChange={handlePasswordChange}
          className={`peer relative w-[455px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border px-4 text-sm placeholder-transparent outline-none transition-all ${
            isPasswordValid
              ? "border-slate-200 focus:border-emerald-500"
              : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
          } autofill:bg-white invalid:text-pink-500 invalid:focus:border-pink-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
          required
        />
        {!isPasswordValid && (
          <small className="text-pink-500 mt-2 ">
            It must be a combination of minimum 8 uppercase and lowercase
            letters, numbers, and symbols.
          </small>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPasswordId">{secondTitle}</label>
        <input
          type="password"
          id="confirmPasswordId"
          name="confirmPassword"
          onChange={handleConfirmPasswordChange}
          className={`peer relative w-[455px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border px-4 text-sm placeholder-transparent outline-none transition-all ${
            isConfirmPasswordValid
              ? "border-slate-200 focus:border-emerald-500"
              : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
          } autofill:bg-white invalid:text-pink-500 invalid:focus:border-pink-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
          required
        />
        {!isConfirmPasswordValid && (
          <small className="text-pink-500 mt-2">Passwords do not match.</small>
        )}
      </div>
    </div>
  );
};

export default FourthRow;
