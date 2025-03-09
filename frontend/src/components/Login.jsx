import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            const res = await axios.post(`${import.meta.ev.VITE_BASE_URL}/auth/google-login`, { token: credential });
            localStorage.setItem('token', res?.data?.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleFailure = () => {
        console.error("Google Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="flex justify-center items-center h-screen">
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
