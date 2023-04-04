import { useUserContext } from "../components/UserContext";
import AddUser from "../components/AddUser";
import AddIr from "../components/AddIr";
import Navigation from "../components/Navigation";

const DashboardPage = () => {
  const { user, logout } = useUserContext();

  if (!user) {
    return (
      <>
        <Navigation />
        <div>Please log in to access the dashboard.</div>
      </>
    );
  }

  return (
    <div>
      <Navigation />
      {user.userRole === "admin" ? (
        <>
          <AddUser />
          <AddIr />
        </>
      ) : (
        <AddIr />
      )}
    </div>
  );
};

export default DashboardPage;

