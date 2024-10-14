import { useSelector } from 'react-redux'
import { useLocation , Navigate , Outlet} from 'react-router-dom'
function RequireAuth({ allowedRoles }){
    // use selector is used to take out data from state
    const { isLoggedIn, role} = useSelector((state)=>state.auth)
    const location = useLocation()
    console.log(allowedRoles,role);

    return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
        <Outlet/>
    ) : isLoggedIn && (<Navigate to="/:loginn"/>)
}
export default RequireAuth