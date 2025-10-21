import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/auth/authSlice"; // adjust path
import { toast } from "sonner";

interface GoogleAuthButtonProps {
  /**
   * Callback fired after successful login
   * Receives server response (user data & token)
   */
  onSuccess?: (data: any) => void;
}

export const GoogleAuthButton = ({ onSuccess }: GoogleAuthButtonProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse: any) => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      const id_token = credentialResponse?.credential;

      if (!id_token) {
        toast.error("No ID token received from Google");
        setLoading(false);
        return;
      }

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
        id_token,
      });

      const data = res.data;

      // Update Redux state
      dispatch(
        setCredentials({
          accessToken: data.token,
          expiresAt: data.expiresAt,
          user: {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            profilePicture: data.user.profilePicture,
          },
          reportSetting: null,
        })
      );

      // Call parent callback for toast/redirect
      onSuccess?.(data);

    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        text="continue_with"
        shape="rectangular"
        size="large"
      />
    </div>
  );
};
