import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ open: openProp = false, title = '', description = '', onAccept, onReject }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(openProp);
    }, [openProp]);

    const handleClose = () => {
        if (onReject) {
            onReject()
        }
    };

    const handleAccept = () => {
        if (onAccept) {
            onAccept()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={handleClose} autoFocus>{`Bỏ Qua`}</Button>
                <Button onClick={handleAccept}>
                    {`Đồng ý`}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog