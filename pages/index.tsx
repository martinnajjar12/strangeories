import { MongoClient } from 'mongodb';
import Story from '../components/Story';

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://martin:abcabcabc@cluster0.wt32o.mongodb.net/strangeories?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
  );

  const db = client.db();

  const strangeoriesCollection = db.collection('strangeories');

  const strangeories = await strangeoriesCollection.find().toArray();

  client.close();

  return {
    props: {
      strangeStories: strangeories.map(strangeStory => ({
        title: strangeStory.title,
        description: strangeStory.description,
        id: strangeStory._id.toString(),
        imageUrl: strangeStory.imageUrl,
        author: strangeStory.author,
      })),
    },
  };
}

interface strangeStoriesObj {
  title: string;
  description: string;
  id: string;
  imageUrl: string;
  author: string;
}

export default function Home({
  strangeStories,
}: {
  strangeStories: Array<strangeStoriesObj>;
}) {
  return strangeStories.map(strangeStory => (
    <Story
      key={strangeStory.id}
      title={strangeStory.title}
      description={strangeStory.description}
      imageUrl={strangeStory.imageUrl}
      author={strangeStory.author}
    />
  ));
}
