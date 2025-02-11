import { logout } from "./authslice";

const TokenExpirationMiddleware=(store)=>(next)=>(action)=>{
    if(action.type==='auth/login')
    {
        const expirationTime=50*60*1000;
        setTimeout(()=>{
            store.dispatch(logout())
            window.location.href="/signup"
        },expirationTime)

    }

    return next(action)

}

export default TokenExpirationMiddleware