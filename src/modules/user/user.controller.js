import User from '../../../DB/models/user.model.js'
import bcrypt from 'bcrypt'


//................................update user....................................
/**
 * destructuring data from req.body
 * destructuring data from req.authUser
 * Checking if email is duplicated
 * update user data
 * return success response
*/
export const updateUser = async (req,res,next)=>{
    // destructuring data from req.body
    const{name, email} = req.body
    // destructuring data from req.authUser
    const{_id} = req.authUser

    // Checking if email is duplicated
    const isEmailOrPhoneDuplicated = await User.findOne({email});
    if (isEmailOrPhoneDuplicated) return next(new Error('email is duplicated', { cause: 409 }));

    //update user data
    const userUpdateData = await User.findByIdAndUpdate(_id, {name, email}, {new: true})

    if(!userUpdateData) return next(new Error('updating failed', {cause:400}))
    // return success response
    return res.status(200).json({message:'updated successfully', userUpdateData})
}

//................................update password....................................
/**
 * destructuring data from req.body
 * destructuring data from req.authUser
 * creating a variable contains data from req.authUser
 * comparing hash password
 * if exists return error
 * hash the new password
 * update user password
 * return success response
*/
export const updatePassword = async (req,res,next)=>{
    // destructuring data from req.body
    const{password} = req.body
    // destructuring data from req.authUser
    const{_id} = req.authUser
    //creating a variable contains data from req.authUser
    const user = req.authUser
    //comparing hash password
    const isPasswordExists = bcrypt.compareSync(password, user.password)
    if(isPasswordExists) return next(new Error('password already exists', {cause:400}))

    //hash the new password
    const hashedPass = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    //update password
    const userUpdatePass = await User.findByIdAndUpdate(_id, {password:hashedPass}, {new: true})
    if(!userUpdatePass) return next(new Error('updating failed', {cause:400}))
    // return success response
    return res.status(200).json({message:'updated successfully', userUpdatePass})
}

//................................delete user ....................................
/**
 * destructuring data from req.authUser
 * delete user data
 * return success response
*/
export const deleteUser = async (req,res,next)=>{
    // destructuring data from req.authUser
    const{_id} = req.authUser

    //delete user data
    const deleting = await User.findByIdAndDelete(_id)
    if(!deleting) return next(new Error('deleting failed', {cause:400}))
    // return success response
    return res.status(200).json({message:'deleting successfully'})
}

//............................. get user profile ..............................
export const getUser = async (req, res, nest) => {
    //destructuring data from req.authUser
    const {_id} = req.authUser
    //get user data
    const user = await User.findById(_id)
    // return success response
    return res.status(200).json({message:'get user successfully', user})
}