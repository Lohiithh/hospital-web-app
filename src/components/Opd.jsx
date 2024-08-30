import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientname: '',
    age: '',
    symptoms: '',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients data:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      setPatients((prev) => [...prev, response.data]);
      setShowForm(false); // Hide the form after successful submission
      setFormData({ patientname: '', age: '', symptoms: '' }); // Reset the form
    } catch (error) {
      console.error('Error registering patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className='flex'>
      <div className="p-8 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Patients List</h2>
        <ul className="list-disc pl-5">
          {patients.map((patient) => (
            <li key={patient.id} className="flex items-start mb-4">
              <div className="flex-1">
                <strong>Name:</strong> {patient.patientname} <br />
                <strong>Age:</strong> {patient.age} <br />
                <strong>Symptoms:</strong> {patient.symptoms}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-red-600 cursor-pointer hover:text-red-800 ml-4"
                onClick={() => handleDelete(patient.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center p-8 w-1/2 border-l border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Register New Patient</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        {showForm && (
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="patientname"
                value={formData.patientname}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Symptoms</label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                required
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none ml-5 focus:ring-2 focus:ring-offset-2 focus:ring-blue-50'
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PatientsList;
