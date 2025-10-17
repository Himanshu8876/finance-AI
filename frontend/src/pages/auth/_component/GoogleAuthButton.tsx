import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";              // <-- add this
import { setCredentials } from "../../../features/auth/authSlice";  // <-- add this (adjust path & action name)

interface GoogleAuthButtonProps {
  onSuccess?: (data: any) => void;
}

export const GoogleAuthButton = ({ onSuccess }: GoogleAuthButtonProps) => {
  const dispatch = useDispatch(); 

  const handleSuccess = async (credentialResponse: any) => {
    
    try {
      const id_token = credentialResponse.credential;

      if (!id_token) {
        toast.error("No ID token received from Google");
        return;
      }      
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        { id_token }
      );

      toast.success("Google login successful!");
      dispatch(setCredentials({
        accessToken: res.data.token,     
        expiresAt: res.data.expiresAt,
        user: {
        id: res.data.user._id,           
        name: res.data.user.name,
        email: res.data.user.email,
        profilePicture: res.data.user.profilePicture,
    },
    reportSetting: null,               
}));


      onSuccess?.(res.data);
      
    } catch (error: any) {
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
      />
    </div>
  );
};
