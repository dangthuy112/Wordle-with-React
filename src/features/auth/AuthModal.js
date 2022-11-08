import { useState } from 'react'
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register'

export default function AuthModal({ setIsLoggedIn, setIsGuest }) {
    const [currentModal, setCurrentModal] = useState('welcome');
    let displayModal;

    switch (currentModal) {
        case 'welcome':
            displayModal = <Welcome setCurrentModal={setCurrentModal}
                setIsLoggedIn={setIsLoggedIn} setIsGuest={setIsGuest} />
            break;
        case 'login':
            displayModal = <Login setCurrentModal={setCurrentModal}
                setIsLoggedIn={setIsLoggedIn} />
            break;
        case 'register':
            displayModal = <Register setCurrentModal={setCurrentModal} />
            break;
        default:
            displayModal = <p>Error</p>
    }

    return (
        <div>
            {displayModal}
        </div >
    )
}
