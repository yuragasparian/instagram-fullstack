export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  id: string;
  profile_picture: string | null;
  follows: string[];
  followers: string[];
  posts: Post[];
  liked: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: Date;
  postId: string;
  post: Post;
}

export interface Post {
  id: string;
  caption: string;
  image_url: string;
  likes: number;
  author_username: string;
  author: {
    username: string;
    profile_picture: string | undefined;
  };
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}
