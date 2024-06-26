const mongoose = require("mongoose");

const materialSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"materials name required"]
    },
    technology: {
        type: String,
        required: [true,"materials technology required"]
    },
    colors: [{
        type: String,
        required: [true,"materials colors required"]
    }],
    pricePerGram: {
        type: Number,
        required: [true,"materials pricePerGram required"]
    },
    applicationTypes: [{
        type: String,
        required: [true,"materials applicationTypes required"]
    }],
    imageUrl: {
        type: String,
        required: [true,"materials imageUrl required"]
    }
})

module.exports = mongoose.model("Material",materialSchema);