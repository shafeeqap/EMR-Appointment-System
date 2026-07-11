import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const useAuthRestore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedOut } = useSelector((state) => state.auth);
  
  const [refreshToken] = useRefreshTokenMutation();
  
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshUser = async () => {
      if (user || isLoggedOut) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await refreshToken().unwrap();

        if (res?.accessToken && res?.user) {
          dispatch(
            setCredentials({
              user: res.user,
              accessToken: res.accessToken,
            })
          );
        } else {
          console.warn("Refresh response missing accessToken or user");
        }
      } catch (error) {
        console.log("No active session", error);
      } finally {
        setIsLoading(false);
      }
    };

    refreshUser();
  }, []);

  return isLoading;
};

export default useAuthRestore;
