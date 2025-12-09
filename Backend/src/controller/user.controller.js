import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body; 

        if(!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
        if(existingUser) {
            return res.status(409).json({ message: 'User with this email or username already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });


    } catch (error) 
    {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    // Login logic to be implemented
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User Not Found'});
        }
        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // console.error(password)
            return res.status(401).json({ message: 'Invalid Password' });

        }

        res.status(200).json({ message: 'Login successful' ,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }   
}

const logoutUser = async (req, res) => {
    // Logout logic to be implemented
    try {
        // For stateless JWT, logout can be handled on client side by deleting token
        const {email} = req.body;
        const user  = await User.findOne({email});   

        if(!user){
            return res.status(401).json({message:'User Not Found'});
        }

        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Server error' });
    }
} 
export { registerUser,
    loginUser,
    logoutUser,
 };
