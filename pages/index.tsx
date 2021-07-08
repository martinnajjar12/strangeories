import { connectToDatabase } from '../util/mongodb';
import Story from '../components/Story';

interface strangeStoriesObjMongo {
  title: string;
  description: string;
  _id: string;
  imageUrl: string;
  author: string;
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const strangeoriesCollection = db.collection('strangeories');

  const strangeories: Array<strangeStoriesObjMongo> =
    await strangeoriesCollection.find().toArray();

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
