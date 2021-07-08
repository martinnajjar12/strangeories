import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://martin:abcabcabc@cluster0.wt32o.mongodb.net/strangeories?retryWrites=true&w=majority',
      { useUnifiedTopology: true },
    );

    const db = client.db();

    const strangeoriesCollection = db.collection('strangeories');

    const result = await strangeoriesCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'Story was inserted!' });
  }
};

export default handler;
