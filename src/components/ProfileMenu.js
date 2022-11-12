import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { useState } from 'react';

export default function PositionedMenu({ isLoggedIn, setIsLoggedIn, setAuthModalOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenModal = () => {
        setAuthModalOpen(true);
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
                onClick={handleOpenModal}
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
                        onClick={handleClick}
                    >
                        Profile
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
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
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </div>)
            }
        </div>
    )
}
