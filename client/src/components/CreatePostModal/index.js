import React from 'react';
import { Button, Modal, TextareaAutosize, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import FileBase64 from 'react-file-base64'

import { modalState$ } from '../../redux/selectors'
import useStyles from './styles'
import { createPost, hideModal } from '../../redux/actions';

export default function CreatePostModal() {
    const { isShow } = useSelector(modalState$)

    const classes = useStyles()
    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        title: '',
        content: '',
        attachment: ''
    })

    const onClose = React.useCallback(() => {
        dispatch(hideModal())
    }, [dispatch])

    const onSubmit = React.useCallback(() => {
        console.log('[state]', state)
        dispatch(createPost.createPostRequest(state))
        setState({
            title: '',
            content: '',
            attachment: ''
        })
    }, [state, dispatch])

    const body = (
        <div className={classes.paper} id='simple-modal-title'>
            <h2>Create new post</h2>
            <form noValidate autoComplete='off' className={classes.form}>
                <TextField
                    className={classes.title}
                    required
                    label='title'
                    value={state.title}
                    onChange={(e) => setState({ ...state, title: e.target.value })}
                />
                <TextareaAutosize
                    className={classes.textarea}
                    minRows={10}
                    maxRows={15}
                    placeholder='Content...'
                    value={state.content}
                    onChange={(e) => setState({ ...state, content: e.target.value })}
                />
                <FileBase64
                    accept='image/*'
                    multiple={false}
                    type='file'
                    value={state.attachment}
                    onDone={({ base64 }) => setState({ ...state, attachment: base64 })}
                />
                <div className={classes.footer}>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                        fullWidth
                        onClick={onSubmit}
                    >
                        {`Create`}
                    </Button>
                </div>
            </form>
        </div>
    )
    return (
        <div>
            <Modal open={isShow} onClose={onClose}>
                {body}
            </Modal>
        </div>
    )
}