import { Schema } from "mongoose";
import mongoose from "mongoose";

const problemSchema = new Schema({
    title: String,

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"]
    },

    description: String,

    functionName: {
        type: String,
        required: true
    },
    driverCode: {
        type: String,
        required: true
    },
    starterCode: {
        cpp: String,
        java: String,
        python: String
    },
    examples: [
        {
            input: String,
            output: String,
            explanation: String
        }
    ],

    constraints: [String],

    tags: [String],

    testCases: [
        {
            input: String,
            output: String
        }
    ],

    // Add this for future support
    returnType: {
        type: String,
        default: "int"
    }

});

const Problem = mongoose.model("Problem", problemSchema);

export { Problem };