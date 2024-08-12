import { useState } from "react";
import axios from "axios";
import app from "../../firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userIdCard, setUserIdCard] = useState(null);
   const navigate = useNavigate()
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setPhoto(downloadURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const userId = JSON.parse(atob(accessToken.split(".")[1])).user._id;
    if (!photo) {
      console.log("Photo is required.");
      return;
    }

    const formData = {
      name,
      age,
      photo,
      userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/userIdCard/create-user-id-card",
        formData
      );
      console.log("User ID card created:", response.data);
      setUserIdCard(response.data.userIdCard);
      navigate("user-id")
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <>
      <div className="w-full mt-20 mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="gap-6 p-4 w-[400px] rounded-lg bgGradient shadow-lg flex items-center justify-center flex-col"
        >
          <h4 className="text-white font-bold text-lg ">ID Genrator</h4>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-none outline-none py-1 px-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="border-none outline-none py-1 px-3 rounded-lg"
          />
          <div className="w-full flex items-center justify-center">
            <label className="flex w-[340px] flex-col items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-600 hover:text-white">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.5 5.5a4.5 4.5 0 00-9 0H2.5A2.5 2.5 0 000 8v8a2.5 2.5 0 002.5 2.5h15A2.5 2.5 0 0020 16v-8a2.5 2.5 0 00-2.5-2.5h-4zm-4.5-3a3 3 0 013 3v2H9V5.5a3 3 0 013-3zm7 15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 012 16V8a1.5 1.5 0 011.5-1.5H7v2.5a1 1 0 001 1h4a1 1 0 001-1V6.5h4.5A1.5 1.5 0 0118 8v8z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="hidden border-none outline-none py-1 px-3 rounded-lg"
              />
            </label>
          </div>

          <button type="submit" className="bg-violet-500 rounded-lg w-[340px] py-1 px-3">PrintCard</button>
        </form>
      </div>

      {userIdCard && (
        <div>
          <h3>ID Card Generated:</h3>
          <p>Name: {userIdCard.name}</p>
          <p>Age: {userIdCard.age}</p>
          <img
            src={userIdCard.photo}
            alt="User ID"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </>
  );
};

export default Home;
