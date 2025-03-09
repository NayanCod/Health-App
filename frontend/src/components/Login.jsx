import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/google-login`,
        { token: credential }
      );
      localStorage.setItem("token", res?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <img src="../../public/starting.png" className="w-88 mx-auto" />
        <blockquote className="text-center w-[75%] mb-16 text-gray-300">
        &#10077; Your mental health matters—take time to rest, heal, and grow. You are stronger than you think, and you are never alone &#10078;
        </blockquote>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure}/>
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default Login;
