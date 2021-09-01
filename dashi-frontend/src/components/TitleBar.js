import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { useAuth0 } from "@auth0/auth0-react"

const TitleBar = ({name}) => {
    const { user, isAuthenticated } = useAuth0()
    
    const titlebarLogin = () => {
        if (isAuthenticated){
            return <LogoutButton />
        }
        return <LoginButton />
    }
    
    return (
        <div>
            <p className='name'>{name}</p>
            {titlebarLogin()}
        </div>
    )
}

export default TitleBar