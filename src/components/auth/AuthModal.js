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
            displayModal = <Login setCurrentModal={setCurrentModal} />
            break;
        case 'register':
            displayModal = <Register setCurrentModal={setCurrentModal} />
            break;
    }

    return (
        <div>
            {displayModal}
        </div >
    )
}
