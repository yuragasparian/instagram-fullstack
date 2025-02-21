
export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  id: string;
  profile_picture: string | null;
  follows: string[];
  followers: string[];
  liked: string[];
  createdAt: Date;
  messagesSent: Message[]
  messagesRecieved: Message[]
  suggestedPeople: User[]
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  sender?: User;
  receiver?: User;
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
