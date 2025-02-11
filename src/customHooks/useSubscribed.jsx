import { ask_user_details } from "../Utils/Apis";

export default function useSubscribed() {

    
   const fetchdata=async()=>{
    const response = await fetch(ask_user_details, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
         // "Set-Cookie":

        },
      });

      const data=await response.text()
    //  console.log(data)
   }
   fetchdata()

  
}
