import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import bcrypt from 'bcryptjs';
import type { AuthState, PostsState } from './types';

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      register: async (username: string, password: string, profilePicture: string) => {
        const users = get().users;
        if (users.some(u => u.username === username)) {
          return false;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          id: crypto.randomUUID(),
          username,
          password: hashedPassword,
          profilePicture,
          createdAt: Date.now(),
        };

        set(state => ({
          users: [...state.users, newUser]
        }));
        return true;
      },
      login: async (username: string, password: string) => {
        const user = get().users.find(u => u.username === username);
        if (!user) return false;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return false;

        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });
        return true;
      },
      logout: () => set({ user: null }),
      updateProfile: (userId: string, updates: Partial<Omit<User, 'id' | 'password'>>) => {
        set(state => ({
          users: state.users.map(user =>
            user.id === userId ? { ...user, ...updates } : user
          ),
          user: state.user && state.user.id === userId
            ? { ...state.user, ...updates }
            : state.user
        }));
      },
    }),
    { name: 'auth-storage' }
  )
);

export const usePosts = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      addPost: (post) =>
        set((state) => ({
          posts: [
            {
              ...post,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
              votes: {},
              score: 0,
            },
            ...state.posts,
          ],
        })),
      deletePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
      updatePost: (postId, updates) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, ...updates, updatedAt: Date.now() }
              : post
          ),
        })),
      vote: (postId, userId, voteType) =>
        set((state) => {
          const post = state.posts.find((p) => p.id === postId);
          if (!post) return state;

          const currentVote = post.votes[userId];
          const newVotes = { ...post.votes };

          if (currentVote === voteType) {
            delete newVotes[userId];
          } else {
            newVotes[userId] = voteType;
          }

          const score = Object.values(newVotes).reduce(
            (acc, vote) => acc + (vote === 'up' ? 1 : -1),
            0
          );

          return {
            posts: state.posts.map((p) =>
              p.id === postId ? { ...p, votes: newVotes, score } : p
            ),
          };
        }),
    }),
    { name: 'posts-storage' }
  )
);