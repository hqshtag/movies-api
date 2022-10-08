import mongoose, { MongooseError } from 'mongoose'

export default async () => {
  const URL =
    process.env.MONGODB_URI ||
    'mongodb+srv://admin:root@coster.weyyk07.mongodb.net/movies?retryWrites=true&w=majority'
  try {
    await mongoose.connect(URL)
    console.log(`Connected to MONGODB`)
  } catch (e: any) { //https://stackoverflow.com/questions/69422525/
    console.error(`MONGODB Error: ${e.toString()}`)
    throw e
  }
}
