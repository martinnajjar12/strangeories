import Story from '../components/Story';
import axios from 'axios';
import { strangeStoriesObj, strangeStoriesObjRails } from '../typeScriptInterfaces';

export async function getServerSideProps() {
  const response = await axios.get(
    'https://strangeories.herokuapp.com/api/v1/stories',
  );
  const strangeories: Array<strangeStoriesObjRails> = response.data;

  return {
    props: {
      strangeStories: strangeories.map(strangeStory => ({
        title: strangeStory.title,
        description: strangeStory.description,
        id: strangeStory.id,
        imageUrl: strangeStory['image_url'],
        author: strangeStory.author,
        likes: strangeStory.likes,
        dislikes: strangeStory.dislikes,
      })),
    },
  };
}

export default function Home({
  strangeStories,
}: {
  strangeStories: Array<strangeStoriesObj>;
}) {
  return strangeStories.map(strangeStory => (
    <Story
      id={strangeStory.id}
      key={strangeStory.id}
      title={strangeStory.title}
      description={strangeStory.description}
      imageUrl={strangeStory.imageUrl}
      author={strangeStory.author}
      likes={strangeStory.likes}
      dislikes={strangeStory.dislikes}
    />
  ));
}
