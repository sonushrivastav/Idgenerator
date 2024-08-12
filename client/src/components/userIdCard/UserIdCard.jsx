import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const UserIdCard = () => {
  const { userIdCard, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!userIdCard) {
    return <div>No ID card data available.</div>;
  }
  console.log(userIdCard);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(userIdCard, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${userIdCard.user.name}_IDCard.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <div className="w-full mt-20 mx-auto flex items-center justify-center">
      <div 
          className="gap-6  w-[400px] rounded-lg bgGradient shadow-lg flex items-center justify-center flex-col"
      
      >
      <img
          src={userIdCard?.photo}
          alt="User ID"
          className="w-full h-full rounded-lg object-contain "
        />
        <p className="text-white text-lg">Name : {userIdCard.name}</p>
        <p className="text-white text-lg">Age: {userIdCard.age}</p>
        
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download ID Card
        </button>
      </div>

      </div>
    </>
  );
};

export default UserIdCard;
