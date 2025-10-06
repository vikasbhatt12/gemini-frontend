import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { login } from "../features/auth/authSlice";

// Zod schema for OTP validation
const OTPSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "Must be digits only"),
});

function OtpPage() {
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Retrieve the phone number passed from the previous page
  const fullPhoneNumber = location.state?.fullPhoneNumber;
  if (!fullPhoneNumber) {
    // Redirect back to auth if no phone number is present
    navigate("/auth");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(OTPSchema),
  });

  const onSubmit = (data) => {
    setFormLoading(true);
    console.log("Verifying OTP:", data.otp);

    setTimeout(() => {
      const isOtpCorrect = true;

      if (isOtpCorrect) {
        toast.success("Login successful!");

        // Dispatch login action to Redux
        dispatch(login({ phone: fullPhoneNumber }));

        // Save a dummy auth token to localStorage
        localStorage.setItem("authToken", "dummy-jwt-token-for-gemini-clone");

        // Navigate to the dashboard
        navigate("/");
      } else {
        toast.error("Invalid OTP. Please try again.");
        setFormLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Enter OTP</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            A 6-digit code was sent to <br />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {fullPhoneNumber}
            </span>
          </p>
        </div>
        <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm p-6 space-y-4">
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="123456"
              maxLength="6"
              {...register("otp")}
              className="text-center text-2xl tracking-[0.5em]"
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={formLoading}>
            {formLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OtpPage;
