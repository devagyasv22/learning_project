import { Post } from "../models/post.models.js";

// create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPost = new Post({ name, description, age });
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getposts = async (req, res) => {  
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export { createPost,getposts };