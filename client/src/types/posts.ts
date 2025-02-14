
interface User {
    id: string;
    username: string;
    profile_picture: string;
  }
  
  interface Media {
    url: string;
    type: "image" | "video";
  }
  
  interface Comment {
    user: string;
    text: string;
    timestamp: string;
  }
  
  export interface Post {
    id: string;
    user: User;
    caption: string;
    media: Media[];
    likes: number;
    comments: Comment[];
    hashtags: string[];
    location: string;
    timestamp: string;
    type: "image" | "video";
  }