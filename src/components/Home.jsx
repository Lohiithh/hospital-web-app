import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to the Hospital</h1>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:bg-blue-100 transition duration-200 cursor-pointer" onClick={()=>{
            navigate("/opd")
          }}> 
            Manage OPD
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:bg-blue-100 transition duration-200 cursor-pointer">
            Manage Doctors
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:bg-blue-100 transition duration-200 cursor-pointer">
            Manage Pharmacy
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:bg-blue-100 transition duration-200 cursor-pointer">
            Manage Admission
          </div>
        </div>
      </div>
    );
  }
  