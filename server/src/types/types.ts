
export interface User {
  id: string;
  username: string;
  profile_picture: string;
}


export interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: Date;
  postId: string;
}

export interface Post {
  id: string;
  caption: string;
  image_url: string;
  likes: number;
  author_username: string;
  author: {
    username: string;
    profile_picture: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}



export type TypeUserData = {
  id: string
  username: string;
  password: string;
  email: string;
  fullName: string;
}
