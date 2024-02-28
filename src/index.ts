import 'express-async-errors';
import express , {Request,Response} from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from './routes/authRoutes/auth';
import merchantRoutes from './routes/merchantRoutes/onboarding'
import connectDB from './config/database';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors'
import morgan from 'morgan'
import ApiRoute from './routes'

//* Initialization *//
//.................................................................../
const PORT = process.env.PORT || 8140;



//* Express and Third party Middleware *//
//.................................................................../
app.use(express.json())
app.use(cors())
app.use(morgan('dev'));



//* Routes and API Declaration *//
//.................................................................../
app.use('/api/v1',ApiRoute)
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/merchant',merchantRoutes)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, World!');
});





//* MongoDB Connection *//
//.................................................................../
connectDB()


//! Alert: Error Handler must in Last,Then it's worked
//* Custom Async Error handler Middleware *//
app.use(errorHandler)


//< Running Server
//.................................................................../
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}/`)});
