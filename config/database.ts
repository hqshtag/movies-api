import mongoose from 'mongoose'



export default async () => {
  const URL =
    process.env.MONGODB_URL as string;
  try {
    const connection = await mongoose.connect(URL)
    console.log(`Connected to MONGODB`);
    return connection
  } catch (e: any) { //https://stackoverflow.com/questions/69422525/
    console.error(`MONGODB Error: ${e.toString()}`)
    throw e
  }
}
