import { MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../store';
import { useState } from 'react';
import Profile from './Profile';
import CreatePost from './CreatePost'; // Import the CreatePost component

export default function Header() {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false); // State for Create Post modal

  return (
    <>
      <header className="sticky top-0 bg-gray-900 text-white border-b shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Section: Logo + Create Post Button */}
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-white">Xeddit</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Create Post Button */}
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Create Post
            </button>
            {/* Profile Section */}
            {user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center space-x-2 hover:bg-gray-800 rounded-full p-2 transition-colors"
                >
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.username}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Modal for Create Post */}
      {showCreatePost && <CreatePost onClose={() => setShowCreatePost(false)} />}
      {/* Profile Modal */}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
}
