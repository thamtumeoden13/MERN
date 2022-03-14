import { PostModel } from "../models/postModel.js"

export const getPosts = async (req, res) => {
    // res.send('POSTS SUCCESS')
    // const post = new PostModel({
    //     title: 'test',
    //     content: 'test'
    // })

    // post.save()

    try {
        const posts = await PostModel.find()
        console.log({ posts })

        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    // res.send('CREATE POSTS SUCCESS')
    try {
        const newPost = req.body
        // const post = PostModel.create(newPost)
        const post = new PostModel(newPost)
        await post.save()

        res.status(201).json(post)
    }
    catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    // res.send('CREATE POSTS SUCCESS')
    try {
        const updatePost = req.body
        const post = await PostModel.findOneAndUpdate({ _id: updatePost._id }, updatePost, { new: true })


        res.status(200).json(post)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}