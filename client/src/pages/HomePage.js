import React, { useCallback } from "react";
import { Container, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from "react-redux";

import Header from "../components/Header";
import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

import useStyles from './styles'
import { showModal } from "../redux/actions";

function HomePage() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const openCreatePostModal = useCallback(() => {
        dispatch(showModal())
    }, [dispatch])

    return (
        <Container maxWidth="lg" className="">
            <CreatePostModal />
            <Header />
            <PostList />
            <Fab color="primary" className={classes.fab} onClick={openCreatePostModal}>
                <AddIcon />
            </Fab>
        </Container>
    )

}

export default HomePage