export interface User {
  id: string;
  username: string;
  password: string;
  profilePicture: string;
  bio?: string;
  createdAt: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  authorId: string;
  authorUsername?: string;
  authorProfilePicture?: string;
  createdAt: number;
  updatedAt: number;
  votes: Record<string, 'up' | 'down'>;
  score: number;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  users: User[];
  register: (username: string, password: string, profilePicture: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userId: string, updates: Partial<Omit<User, 'id' | 'password'>>) => void;
}

export interface PostsState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'score'>) => void;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  vote: (postId: string, userId: string, voteType: 'up' | 'down') => void;
}