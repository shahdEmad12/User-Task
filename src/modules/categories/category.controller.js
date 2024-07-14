import Category from "../../../DB/models/categories.model.js";
import { APIFeatures } from '../../utils/api-features.js'

// ........................ add categories ................................
export const addCategory = async (req, res, next) => {
    // Get user ID from authenticated user
    const {_id} = req.authUser
    // Get category name from request body
    const {name} = req.body
    
    // check if category already exists
    const categoryExists =  await Category.findOne({name})
    if(categoryExists) return next(new Error('category already exists', {cause: 400}))
    
    // Create a new category
    const category = await Category.create({name, userID: _id})
    if(!category) return next(new Error('adding category failed', {cause: 500}))
    // Return success response
    return res.status(201).json({message:'category added successfully',category})
}

// ........................ update category ................................
export const updateCategory = async (req, res, next) => {
    // Get user ID from authenticated user
    const {_id} = req.authUser
    // Get category name from request body
    const {name} = req.body
    // Get category ID from request parameters
    const {categoryId} = req.params

    // check if name already exists
    const nameExists =  await Category.findOne({name})
    if(nameExists) return next(new Error('name already exists', {cause: 400}))

    // Update the category with the provided name
    const updatedCategory = await Category.findByIdAndUpdate({ _id: categoryId, userID: _id}, {name}, {new: true})
    if(!updateCategory) return next(new Error('updating category failed', {cause: 500}))

    // Return success response
    return res.status(201).json({message:'category updated',updatedCategory})
}

// ........................ delete category ................................

export const deleteCategory = async (req, res, next) => {
    //Get user ID from authenticated user
    const {_id} = req.authUser
    // Get category ID from request parameters
    const {categoryId} = req.params

    //check existance of category
    const isCategoryExists = await Category.findById({_id:categoryId})
    if(!isCategoryExists) return next(new Error('category does not exist', {cause:404}))

    // Delete the category with the provided ID and user ID
    const deletedCategory = await Category.findByIdAndDelete({userID:_id, _id: categoryId})
    if(!deletedCategory) return next(new Error('deleting failed', {cause:400}))
    // Return success response
    return res.status(201).json({message:'category deleted', deletedCategory})
}

// ........................ get specific category ................................

export const getCategory = async (req, res, next) => {
    // Get user ID from authenticated user
    const {_id} = req.authUser
    // Get category ID from request parameters
    const {categoryId} = req.params
    // Find the category in the database based on user ID and category ID
    const category = await Category.findOne({userID: _id, _id: categoryId})
    if(!category) return next(new Error('category not found', {cause:400}))
    // If category is found, return a 200 status with the category data
    return res.status(200).json({message:'done', category})
}

//................................. list categories .................................
export const getAllCategories = async (req, res, next) => {
    // Get user ID from authenticated user
    const {_id} = req.authUser
    // destruct data from query
    const {page, size} = req.query
    const features = new APIFeatures(req.query, Category.find({userID:_id})).pagination({page, size})
    // get all products
    const categories = await features.mongooseQuery
    // Return success response with the fetched categories
    res.status(200).json({ success: true, message: 'categories fetched successfully', data: categories })
}

//................................. filter categories .................................
export const filterCategory = async (req, res, next) => {
    // Get user ID from authenticated user
    const {_id} = req.authUser
    // destruct data from query
    const query = req.query
    const features = new APIFeatures(req.query, Category.find({userID:_id})).filter(query)
    // get all products
    const categories = await features.mongooseQuery
    // Return success response with the fetched categories
    res.status(200).json({ success: true, message: 'categories fetched successfully', data: categories })
}

// ................................. sort categories .................................
export const sortCategories = async (req, res, next) => {
    // Get user ID from authenticated user
    const { _id } = req.authUser;
    // destruct data from query
    const { sort } = req.query;
    // Create APIFeatures instance
    const features = new APIFeatures(req.query, Category.find({ userID: _id })).sort(); // Apply sorting
    // Retrieve sorted categories from database
    const categories = await features.mongooseQuery;
    // Return success response with the sorted categories
    res.status(200).json({ success: true, message: 'categories sorted successfully', data: categories });
}