import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={navigateToRegister}>Go to Register</button>
    </div>
  );
}

export default Home;
