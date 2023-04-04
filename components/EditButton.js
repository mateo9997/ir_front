import { useUserContext } from "./UserContext";
import Link from "next/link";

const EditButton = () => {
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  return (
    <Link href="/edit">
      <button>Edit</button>
    </Link>
  );
};

export default EditButton;
