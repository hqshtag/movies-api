import { NextFunction, Request, Response } from "express"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorHandler = (
  err: { status: any },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.error('----- An error happened -----')
  console.error(err)

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500)

    // A limited amount of information sent in production
    if (process.env.NODE_ENV !== 'DEV') res.json('An Error Occured')
    else
      res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
  }
}
