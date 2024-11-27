import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthGuard = (): boolean => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("TMDb-Key") !== null;
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [navigate]);

  return localStorage.getItem("TMDb-Key") !== null;
};

export default useAuthGuard;
