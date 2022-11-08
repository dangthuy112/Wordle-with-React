import { useState } from "react"

const useModal = () => {
    const [currentModal, setCurrentModal] = useState('welcome');

    return { currentModal, setCurrentModal };
}

export default useModal