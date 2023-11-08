import { IoMdPersonAdd } from "react-icons/Io";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8 h-screen">
        <h1 className="font-semibold text-center text-lg md:text-2xl">
          Bienvenue sur le dashboard de l&apos;admin, vous pouvez :
        </h1>
        <Link to="/admin/add-consultant">
          <button className="btn btn-primary">
            <IoMdPersonAdd className="text-2xl" />
            Ajouter un consultant
          </button>
        </Link>
      </div>
    </>
  );
}
