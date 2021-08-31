import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

const TitleBar = ({name}) => {
    return (
        <div>
            <p className='name'>{name}</p>
            <LoginButton />
        </div>
    )
}

export default TitleBar