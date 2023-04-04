// components/Navigation.tsx
import { useRouter } from "next/router";
import Link from "next/link";
import { useUserContext } from "./UserContext";

const Navigation = () => {
  const { user, logout } = useUserContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    if (router.pathname !== "/index") {
      router.push("/login");
    }else{
        router.reload();
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white ">
          <Link href="/index">
            <div className="font-semibold text-2xl">Informáticas Revolucionarias</div>
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <>
              <div className="text-white flex items-center space-x-2">
                <span>{user.firstName} {user.lastName}</span>
                <span>({user.userRole})</span>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                onClick={() => router.push("/dashboard")}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
