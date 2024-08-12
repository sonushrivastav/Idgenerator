import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
const UserIdCard = () => {
    const { userIdCard, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!userIdCard) {
    return <div>No ID card data available.</div>;
  }
  return (
    <>
            <div className="w-full mt-20 mx-auto flex items-center justify-center">
            <h3>ID Card Details:</h3>
      <p>Name: {userIdCard.name}</p>
      <p>Age: {userIdCard.age}</p>
      <img
        src={userIdCard?.photo}
        alt="User ID"
        style={{ maxWidth: "100%" }}
      />
      {/* <button onClick={handleDownload} className="bg-blue-500 text-white py-2 px-4 rounded">
        Download ID Card
      </button> */}
      </div>
    </>
  )
}

export default UserIdCard
