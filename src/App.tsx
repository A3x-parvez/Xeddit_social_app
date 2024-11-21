import { useEffect, useState } from 'react';
import { useAuth, usePosts } from './store';
import Header from './components/Header';
import Auth from './components/Auth';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const { user } = useAuth();
  const { posts } = usePosts();
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    document.title = 'Xeddit - Share Your Thoughts';
  }, []);

  if (!user) {
    return (
      <>
        <SplashScreen />
        <Auth />
      </>
    );
  }

  return (
    <>
      <SplashScreen />
      <div className="min-h-screen bg-black">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* <button
            onClick={() => setShowCreatePost(true)}
            className="w-full mb-6 bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <span>Create Post</span>
          </button> */}
          
          {showCreatePost && <CreatePost onClose={() => setShowCreatePost(false)} />}
          
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No posts yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}