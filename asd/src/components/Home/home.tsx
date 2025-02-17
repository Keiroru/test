import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={navigateToRegister}>Go to Register</button>
      <button onClick={navigateToLogin}>Go to Login</button>
    </div>
  );
}

export default Home;
