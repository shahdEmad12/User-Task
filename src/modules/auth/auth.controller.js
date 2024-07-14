import User from '../../../DB/models/user.model.js'
import sendEmailService from '../services/send-email-services.js'

import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'



// ................................... SignUp API .................................

/**
 * destructuring the required data from the request body
 * check if the user already exists in the database using the email
 * if exists return error email is already exists
 * password hashing
 * create new document in the database
 * return the response
 */
export const signUp = async (req, res, next) => {
    // 1- destructure the required data from the request body 
    const {name, email, password} = req.body

    // 2- check if the user already exists in the database using the email
    const isEmailDuplicated = await User.findOne({ email })
    if (isEmailDuplicated) {
        return next(new Error('Email already exists', { cause: 409 }))
    }
    const usertoken = jwt.sign({ email }, process.env.JWT_SECRET_VERFICATION, { expiresIn: '3m' })
    // 3- send confirmation email to the user
    const isEmailSent = await sendEmailService({
        to: email,
        subject: 'email verification',
        message: `<h1>please verify your email</h1>
        <a href='http://localhost:3000/auth/verify-email?token=${usertoken}'>verify your email</a>`

    })

    // 4- check if email is sent successfully
    if (!isEmailSent) {
        return next(new Error('Email is not sent, please try again later', { cause: 500 }))
    }

    // 5- password hashing
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)

    // 6- create new document in the database
    const newUser = await User.create({ name, email, password: hashedPassword})

    // 7- return the response
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    })
}

//................................... email verify .................................
export const verifyEmail = async (req,res,next)=> {
    // 1- destructure the required data from the request body 
    const {token} = req.query
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_VERFICATION)
    // 2- check if the user already exists in the database using the email
    const user = await User.findOneAndUpdate({email: decodedData.email, isEmailVerified: false}, {isEmailVerified: true}, {new: true})
    if (!user) {
        return next(new Error('User not found', { cause: 404 }))
    }

    res.status(200).json({
        success: true,
        message: 'Email verified successfully, please try to login'
    })
}

// ========================================= SignIn API ================================//

/**
 * destructuring the required data from the request body 
 * get user by email and check if isEmailVerified = true
 * if not return error invalid login credentails
 * if found
 * check password
 * if not return error invalid login credentails
 * if found
 * generate login token
 * updated isLoggedIn = true  in database
 * return the response
 */

export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    // get user by email
    const user = await User.findOne({ email, isEmailVerified: true })
    if (!user) {
        return next(new Error('Invalid login credentails', { cause: 404 }))
    }
    // check password
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return next(new Error('Invalid login credentails', { cause: 404 }))
    }

    // generate login token
    const token = jwt.sign({ email, id: user._id, loggedIn: true }, process.env.JWT_SECRET_LOGIN, { expiresIn: '1d' })
    // updated isLoggedIn = true  in database

    user.isLoggedIn = true
    await user.save()

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: {
            token
        }
    })
}

