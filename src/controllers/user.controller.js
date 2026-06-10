import User from "../models/user.model.js";



export const getUserData = async (req, res) => {
    try {
        const id = req.id;
        
        const user = await User.findById(id).select("-password");
        
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}
