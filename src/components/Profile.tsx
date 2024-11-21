import { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import { useAuth } from '../store';

interface ProfileProps {
  onClose: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const { user, updateProfile } = useAuth();
  const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || '');
  const [bio, setBio] = useState(user?.bio || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpdateProfile = () => {
    updateProfile(user.id, {
      profilePicture: previewUrl,
      bio: bio.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 text-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={previewUrl}
                alt={user.username}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                <Camera className="w-5 h-5" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inputs */}
            <div className="w-full space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-300"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-700 bg-gray-900">
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
