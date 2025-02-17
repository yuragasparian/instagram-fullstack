import { Comment } from "./../../../../types/posts";

const CommentsBody = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className=" h-[55%] w-full overflow-y-scroll no-scrollbar scroll-m-0">
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <p className="my-5 text-sm">
              <span className="font-semibold">{comment.username} </span>
              {comment.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsBody;
