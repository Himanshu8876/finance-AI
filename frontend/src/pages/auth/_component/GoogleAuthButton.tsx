import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";

interface GoogleAuthButtonProps {
  onSuccess?: (data: any) => void;
}

export const GoogleAuthButton = ({ onSuccess }: GoogleAuthButtonProps) => {
  const handleSuccess = async (credentialResponse: any) => {
    console.log("=== GOOGLE AUTH FLOW START ===");
    
    try {
      const id_token = credentialResponse.credential;

      if (!id_token) {
        toast.error("No ID token received from Google");
        return;
      }

      console.log("Backend URL:", `${import.meta.env.VITE_API_URL}/auth/google`);
      
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        { id_token }
      );

      toast.success("Google login successful!");
      onSuccess?.(res.data);
      
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Failed to sign in with Google");
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
        // Remove width="100%" - it causes the error
      />
    </div>
  );
};