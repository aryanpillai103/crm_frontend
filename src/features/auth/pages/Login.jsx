import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Always import

export default function LoginPage() {
  const navigate = useNavigate();
  const [isFedCMSupported, setIsFedCMSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports FedCM
    setIsFedCMSupported(
      'IdentityCredential' in window && 
      'credentials' in navigator && 
      typeof navigator.credentials.get === 'function'
    );
  }, []);

  const initFedCM = async () => {
    try {
      const credential = await navigator.credentials.get({
        identity: {
          providers: [{
            configURL: 'https://accounts.google.com/config',
            clientId: '965125291501-o76lr25271viptuuke3jv27ia1kl0llk.apps.googleusercontent.com',
            nonce: crypto.randomUUID(),
          }]
        }
      });

      if (credential && credential.token) {
        await handleGoogleToken(credential.token);
      }
    } catch (error) {
      console.error('FedCM Error:', error);
      // Fallback will automatically happen since we show both options
    }
  };

  const handleGoogleToken = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log('Google token decoded:', decodedToken);

      const response = await axios.post('http://localhost:3000/auth/google/callback', {
        token
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Google login failed:', error);
      let errorMessage = 'Google login failed. Please try again.';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.';
      }
      
      alert(errorMessage);
    }
  };

  const handleTraditionalGoogleLogin = async (googleData) => {
    await handleGoogleToken(googleData.credential);
  };

  return (
    <GoogleOAuthProvider clientId="965125291501-o76lr25271viptuuke3jv27ia1kl0llk.apps.googleusercontent.com">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            CRM Dashboard Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-6 grid grid-cols-1 gap-3">
              {/* FedCM Button - shown only when supported */}
              {isFedCMSupported && (
                <button
                  onClick={initFedCM}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <img className="h-5 w-5 mr-2" src="https://www.google.com/favicon.ico" alt="Google" />
                  Continue with Google (FedCM)
                </button>
              )}

              {/* Traditional Google Login - always shown as fallback */}
              <GoogleLogin
                onSuccess={handleTraditionalGoogleLogin}
                onError={() => {
                  console.log('Google Login failed');
                  alert('Google authentication failed. Please try again or use another method.');
                }}
                useOneTap={!isFedCMSupported} // Only auto-show if FedCM not supported
                auto_select={!isFedCMSupported}
                size="large"
                width="350"
                theme="filled_blue"
                text="continue_with"
                shape="rectangular"
                logo_alignment="left"
              />
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}