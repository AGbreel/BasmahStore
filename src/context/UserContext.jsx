import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {

    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [userRole, setUserRole] = useState(null);

    async function getUserDetails(userId) {
        try {
            let { data } = await axios.get(`https://basmah-lyn.runasp.net/api/Users/${userId}`);
            setUserDetails(data.data);
            setUserRole(data.data.role);
            
        } catch (err) {
            console.log(err);
        }
    }

  useEffect(() => {
    if(localStorage.getItem("userToken") && localStorage.getItem("userId")) {
      setUserData(localStorage.getItem("userToken"));
      setUserId(localStorage.getItem("userId"));
      getUserDetails(localStorage.getItem("userId"));
    }
  }, [])


    return <UserContext.Provider value={{ userRole, userDetails, userData, setUserData, userId, setUserId, getUserDetails }}>
        {children}
    </UserContext.Provider>
}