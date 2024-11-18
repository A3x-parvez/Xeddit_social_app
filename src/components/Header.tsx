import { MessageSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '../store';
import { useState } from 'react';
import Profile from './Profile';

export default function Header() {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="sticky top-0 bg-white border-b shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">Xeddit</h1>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-700">{user.username}</span>
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
      </header>
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
}