import db_connection from '../DB/connection.js'
import { globalResponse } from './middlewares/globalResponse.middleware.js'

import * as routers from './modules/index.routes.js'

export const initiateApp = (app,express) => {
    const port = process.env.port
    app.use(express.json())

    db_connection()
    app.use('/auth', routers.authRouter)
    app.use('/user', routers.userRouter)
    app.use('/task', routers.taskRouter)
    app.use('/category', routers.categoryRouter)

    app.use('*', (req,res,next)=>{
        res.status(404).json({message: 'Not found'})
    })
    
    app.use(globalResponse)
    app.listen(port, ()=> console.log(`server running on ${port}`))
}