import { useState } from 'react'
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register'

export default function AuthModal({ setIsLoggedIn, authModalOpen, setAuthModalOpen }) {
    const [currentModal, setCurrentModal] = useState('welcome');
    let displayModal;

    switch (currentModal) {
        case 'welcome':
            displayModal = <Welcome setCurrentModal={setCurrentModal} setIsLoggedIn={setIsLoggedIn}
                authModalOpen={authModalOpen} setAuthModalOpen={setAuthModalOpen} />
            break;
        case 'login':
            displayModal = <Login setCurrentModal={setCurrentModal} setIsLoggedIn={setIsLoggedIn}
                authModalOpen={authModalOpen} setAuthModalOpen={setAuthModalOpen} />
            break;
        case 'register':
            displayModal = <Register setCurrentModal={setCurrentModal} authModalOpen={authModalOpen}
                setAuthModalOpen={setAuthModalOpen} />
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
