import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { useState } from 'react';

export default function PositionedMenu({ isLoggedIn, setIsLoggedIn, setAuthModalOpen, setStatModalOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenAuthModal = () => {
        setAuthModalOpen(true);

    }
    const handleOpenStatModal = () => {
        setStatModalOpen(true);
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logOut);
        setIsLoggedIn(false);
        handleClose();
    }

    return (
        <div>
            {!isLoggedIn ? <Button sx={{ backgroundColor: '#1565c0', color: 'white' }}
                onClick={handleOpenAuthModal}
            >
                Sign In
            </Button>
                :
                (<div>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{ backgroundColor: '#1565c0', color: 'white' }}
                        onClick={handleClick}
                    >Profile</Button>
                    <Menu id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        <MenuItem onClick={handleOpenStatModal}>Stats</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </div>)
            }
        </div>
    )
}
