import Task from "../../../DB/models/task.model.js";
import { APIFeatures } from '../../utils/api-features.js'

// ........................ add tasks ................................
/**
 * destructuring data from req.authUser
 * destructuring data from req.body
 * destructuring data from params
 * create new task
 * return success response
*/
export const addtask = async (req, res, next) => {
    // destructuring data from req.authUser
    const {_id} = req.authUser
    //destructuring data from body
    const {title, type, textTask, listTask, shared, status} = req.body
    //destructuring data from params
    const {categoryID} = req.params
    //creating new task
    const adding = await Task.create({title, type, textTask, listTask, shared, status, userID:_id, categoryID})
    if(!adding) return next(new Error('adding failed', {cause:400}))
    // return success response
    return res.status(200).json({message:'added successfully', adding})
}

//.......................update task............................
/**
 * destructuring data from req.params
 * destructuring data from req.body
 * destructuring data from req.authUser
 * check if task already exists
 * if exists return error
 * update task data
 * return success response
*/
export const updateTask = async(req,res,next)=>{
    // destructuring data from params
    const{taskId}= req.params
    // destructuring data from req.body
    const{title, type, textTask, listTask, shared, status}= req.body
    // destructuring data from req.authUser
    const{_id} = req.authUser

    //check if task already exists
    const isTaskExists = await Task.findById({_id:taskId})
    if(!isTaskExists) return next(new Error('task does not exist', {cause:404}))

    //update task data
    const updateTask= await Task.findOneAndUpdate({ userID:_id},{title, type, textTask, listTask, shared, status}, {new: true})
    if(!updateTask) return next(new Error('updating failed', {cause:400}))
    // return success response
    return res.status(200).json({message:'updated successfully', updateTask})

}

//.......................delete task............................
/**
 * destructuring data from req.params
 * destructuring data from req.authUser
 * check if task exists
 * if not exists return error
 * delete task data
 * return success response
*/
export const deleteTask = async(req,res,next)=>{
    // destructuring data from req.params
    const{taskId}= req.params
    // destructuring data from req.authUser
    const{_id} = req.authUser

    //check existance of task
    const isTaskExists = await Task.findById({_id:taskId})
    if(!isTaskExists) return next(new Error('task does not exist', {cause:404}))

    // delete task data
    const deleteTask= await Task.findOneAndDelete({userID:_id, _id:taskId})
    if(!deleteTask) return next(new Error('deleting failed', {cause:400}))
    // return success response
    return res.status(200).json({message:'deleting successfully', deleteTask})

}


// ........................ get specific task ................................

export const getTask = async (req, res, next) => {
    // destructuring data from req.authUser
    const {_id} = req.authUser
    // destructuring data from req.params
    const {taskId} = req.params
    // Find the category in the database based on user ID and task ID
    const task = await Task.findOne({userID: _id, _id: taskId})
    if(!task) return next(new Error('task not found', {cause:400}))
    // return success response
    return res.status(200).json({message:'done', task})
}

//.........................tasks of one user............................
/**
 * destructuring data from req.authUser
 * find data of a specific userid
 * return success response
*/
export const listTask = async (req,res,next)=>{
    // destructuring data from req.authUser
    const{_id} = req.authUser
    // find data of a specific userid
    const data = await Task.find({userID:_id})
    // return success response
    res.json({
        message:'done',
        data
    })
}

//................................. filter task .................................
export const filtertask = async (req, res, next) => {
    // destructuring data from req.authUser
    const{_id} = req.authUser
    // destruct data from query
    const query = req.query
    // create new APIFeatures instance
    const features = new APIFeatures(req.query, Task.find({userID:_id}))
        .filter(query)
    // get all tasks
    const task = await features.mongooseQuery
    // return success response
    res.status(200).json({ success: true, message: 'task filtered successfully', data: task })
}

//................................. list categories .................................
export const getAllTasks = async (req, res, next) => {
    // destructuring data from req.authUser
    const {_id} = req.authUser
    // destruct data from query
    const {page, size} = req.query
    // create new APIFeatures instance
    const features = new APIFeatures(req.query, Task.find({userID:_id})).pagination({page, size})
    // get all tasks
    const tasks = await features.mongooseQuery
    // return success response
    res.status(200).json({ success: true, message: 'tasks fetched successfully', data: tasks })
}

// ................................. sort tasks .................................
export const sortTasks = async (req, res, next) => {
    // destructuring data from req.authUser
    const { _id } = req.authUser;
    // destruct data from query
    const { sort } = req.query; 
    // create new APIFeatures instance
    const features = new APIFeatures(req.query, Task.find({ userID: _id })).sort(); 
    // get all tasks
    const tasks = await features.mongooseQuery;
    // return success response
    res.status(200).json({ success: true, message: 'tasks sorted successfully', data: tasks });
};
