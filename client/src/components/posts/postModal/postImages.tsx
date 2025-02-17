import { Media } from "../../../types/posts";

const PostImages = ({ media }: { media: Media[] }) => {
  return (
    <div className="w-full">
      <img
        src={media[0].url}
        className="aspect-square object-cover size-full"
      />
    </div>
  );
};

export default PostImages;
