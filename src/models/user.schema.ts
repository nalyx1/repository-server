import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        password: {
            type: String,
            required: true,
        },
        myRepositories: [
            {
                type: String,
            },
        ],
        favoritesRepositories: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', userSchema);
