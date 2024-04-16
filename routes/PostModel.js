const mongoose = require("mongoose")
const PostSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("Post", PostSchema)