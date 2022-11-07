import React from 'react'

export default function AuthModal() {
    const [open, setOpen] = useState(true);
    const handleClose = () => { };
    const handleOpen = () => { };
    let currentModal;

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

            </Modal>
        </div >
    )
}
