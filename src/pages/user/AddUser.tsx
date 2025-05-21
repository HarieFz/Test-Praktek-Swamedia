/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL_POST, JWT } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataProps {
  name: string;
  gender: string;
  email: string;
  status: string;
}

const initialValues = {
  name: "",
  gender: "",
  email: "",
  status: "active",
};

export default function AddUser() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValues: React.SetStateAction<any>
  ) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createData = async (data: DataProps) => {
    try {
      const apiUrl = `${BASE_URL_POST}/users`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      };
      const payload = {
        name: data.name,
        gender: data.gender,
        email: data.email,
        status: data.status,
      };

      const response = await axios.post(apiUrl, payload, options);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    createData(values);
  };

  return (
    <div className="max-w-6xl w-full mx-auto my-5">
      <div className="flex justify-start mb-10">
        <button
          className="border border-blue-500 rounded-xl px-5 py-3 text-blue-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Kembali
        </button>
      </div>

      <h1 className="font-medium text-3xl text-center mb-8">Form Tambah User</h1>

      <form className="max-w-[500px] w-full mx-auto flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border p-3 rounded-lg"
            onChange={(e) => handleChangeValue(e, setValues)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gender">
            Jenis Kelamin <span className="text-xs">(male/female)</span>
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            className="border p-3 rounded-lg"
            onChange={(e) => handleChangeValue(e, setValues)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="border p-3 rounded-lg"
            onChange={(e) => handleChangeValue(e, setValues)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            className="border p-3 rounded-lg"
            onChange={(e) => handleChangeValue(e, setValues)}
            disabled
          />
        </div>
        <button className="bg-blue-500 rounded-xl px-5 py-3 text-white cursor-pointer my-5" onClick={handleCreate}>
          Tambah
        </button>
      </form>
    </div>
  );
}
