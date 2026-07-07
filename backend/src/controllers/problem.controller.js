import {Problem} from "../models/problem.model.js";
import httpStatus from "http-status";

const createProblem = async(req,res)=>{
    console.log(createProblem);
    try{

        const problem = await Problem.create(req.body);

        res.status(httpStatus.CREATED).json({
            success:true,
            problem
        });

    }catch(error){
        res.status(httpStatus.error).json({
            success:false,
            message:error.message
        });
    }
}

const getAllProblems = async(req,res)=>{
    try{

        const problems = await Problem.find();

        res.status(httpStatus.OK).json({
            success:true,
            problems
        });

    }catch(error){

        res.status(httpStatus.error).json({
            success:false,
            message:error.message
        });

    }
}

const getProblemById = async(req,res)=>{
    try{

        const problem = await Problem.findById(req.params.id);

        if(!problem){
            return res.status(404).json({
                success:false,
                message:"Problem not found"
            });
        }

        res.status(httpStatus.OK).json({
            success:true,
            problem
        });

    }catch(error){

        res.status(httpStatus.error).json({
            success:false,
            message:error.message
        });

    }
}

const updateProblem = async(req,res) =>{
    try{
        const problem = await Problem.findByIdAndUpdate(req.params.id , req.body,{
            new:true
        });

        res.status(httpStatus.OK).json({
            success:true,
            problem
        });
        

    }catch(err){
        res.status(httpStatus.error).json({
            success:false,
            message:error.message
        });
    }
}

const deleteProblem = async(req,res) =>{
    try{
        const problem = await Problem.findByIdAndDelete(req.params.id);

        res.status(httpStatus.OK).json({
            success:true,
            message:"Deleted successfully"
        });
        

    }catch(err){
        res.status(httpStatus.error).json({
            success:false,
            message:error.message
        });
    }
}

export { createProblem , getAllProblems , getProblemById , updateProblem , deleteProblem};