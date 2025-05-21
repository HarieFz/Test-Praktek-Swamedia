import { useEffect, useState } from "react";
import { API_KEY, BASE_URL_GET } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface DataProps {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataProps[]>();

  const fetchData = async () => {
    try {
      const apiUrl = `${BASE_URL_GET}/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(apiUrl, options);
      setData(response.data?.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl w-full mx-auto my-5">
      <div className="flex justify-end mb-10">
        <button className="bg-blue-500 rounded-xl px-5 py-3 text-white cursor-pointer" onClick={() => navigate("/add")}>
          Tambah
        </button>
      </div>

      <h1 className="font-medium text-3xl text-center mb-8">Berita Terkini</h1>

      <div className="grid grid-cols-3 gap-5">
        {data?.map((item) => (
          <div className="border rounded-2xl p-5">
            <p className="font-medium">{item.title}</p>
            <p className="text-xs mb-2">{item.author}</p>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
