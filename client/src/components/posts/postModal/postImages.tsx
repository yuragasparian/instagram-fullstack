const PostImages = ({ image }: { image: string }) => {
  return (
    <div className="">
      <img
        src={image}
        className="aspect-square object-cover size-full max-w-3xl"
      />
    </div>
  );
};

export default PostImages;
