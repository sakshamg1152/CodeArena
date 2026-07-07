import { Schema } from "mongoose";
import mongoose from "mongoose";

const submissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      enum: ["cpp", "java", "python", "javascript"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Runtime Error",
        "Compilation Error",
      ],
      required: true,
    },

    runtime: {
      type: Number, 
      default: 0,
    },

    memory: {
      type: Number, 
      default: 0,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
    input: {
        type: String
    },

    output: {
        type: String
    },
    expectedOutput: {
        type: String
    },
    passedTestCases: {
        type: Number,
        default: 0
    },

    totalTestCases: {
        type: Number,
        default: 0
    },
    },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission" , submissionSchema);
export { Submission };