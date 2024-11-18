import { useState, useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { useAuth, usePosts } from '../store';

interface CreatePostProps {
  onClose: () => void;
}

export default function CreatePost({ onClose }: CreatePostProps) {
  const { user } = useAuth();
  const { addPost } = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addPost({
      title: title.trim(),
      content: content.trim(),
      mediaUrl: mediaUrl || undefined,
      mediaType,
      authorId: user.id,
      authorUsername: user.username,
      authorProfilePicture: user.profilePicture,
    });

    setTitle('');
    setContent('');
    setMediaUrl('');
    setMediaType(undefined);
    onClose();
  };

  const handleMediaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setMediaUrl(url);
    setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="min-h-screen py-8 w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Create Post</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-700">{user.username}</span>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-32 mb-4 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            {mediaUrl && (
              <div className="relative mb-4">
                {mediaType === 'image' ? (
                  <img
                    src={mediaUrl}
                    alt="Post media"
                    className="max-h-96 rounded-md object-cover"
                  />
                ) : (
                  <video
                    src={mediaUrl}
                    controls
                    className="max-h-96 rounded-md"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMediaUrl('');
                    setMediaType(undefined);
                  }}
                  className="absolute top-2 right-2 p-1 bg-gray-800/50 rounded-full text-white hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaInput}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ImagePlus className="w-5 h-5" />
                  <span>Add Media</span>
                </button>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}