import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log("Database Connected"))

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export default connectDB
