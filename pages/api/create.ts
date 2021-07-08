import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../util/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body

    const { db } = await connectToDatabase()

    const strangeoriesCollection = db.collection('strangeories')

    const result = await strangeoriesCollection.insertOne(data)

    res.status(201).json({ message: 'Story was inserted!' })
  }
}

export default handler
