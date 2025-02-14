type TPostInfo = {
    likes:number
    username:string
    caption:string
}

const PostInfo = ({likes, username, caption}:TPostInfo) => {
  return (
    <div className="px-4">
          <p className="font-semibold">{likes + " "}likes</p>
          <p>
            <span className="font-bold">{username} </span>
            {caption.split(" ").map((word, index) => {
              if (word.startsWith("#")) {
                return (
                  <span key={index} className="text-blue-500">
                    {word}{" "}
                  </span>
                );
              }
              return word + " ";
            })}
          </p>
        </div>
  )
}

export default PostInfo