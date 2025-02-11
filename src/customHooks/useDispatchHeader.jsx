import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeforbusiness, changeForDevPage, changeSuperchip } from "../ReduxStateManagement/user"

export default function useDispatchHeader() {
  
    const dispatch=useDispatch()

    useEffect(()=>{

        dispatch(changeForDevPage(false))

        dispatch(changeforbusiness(false))
        dispatch(changeSuperchip(false))

      },[])
}
