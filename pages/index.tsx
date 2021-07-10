import Story from '../components/Story';
import axios from 'axios';

interface strangeStoriesObjRails {
  title: string;
  description: string;
  id: string;
  'image_url': string;
  author: string;
}

export async function getServerSideProps() {
  const response = await axios.get('https://strangeories.herokuapp.com/api/v1/stories')
  const strangeories: Array<strangeStoriesObjRails> = response.data  

  return {
    props: {
      strangeStories: strangeories.map(strangeStory => ({
        title: strangeStory.title,
        description: strangeStory.description,
        id: strangeStory.id,
        imageUrl: strangeStory['image_url'],
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
