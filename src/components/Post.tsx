import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, Trash2, Edit2, X, Check } from 'lucide-react';
import { useAuth, usePosts } from '../store';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const { user } = useAuth();
  const { deletePost, updatePost, vote } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  if (!user) return null;

  const isAuthor = post.authorId === user.id;
  const userVote = post.votes[user.id];
  const postDate = new Date(post.createdAt).toLocaleString();

  const handleVote = (voteType: 'up' | 'down') => {
    vote(post.id, user.id, voteType);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    updatePost(post.id, {
      title: editTitle.trim(),
      content: editContent.trim(),
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={post.authorProfilePicture}
          alt={post.authorUsername}
          className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
        />
        <div>
          <span className="font-medium text-gray-100">{post.authorUsername}</span>
          <p className="text-sm text-gray-400">{postDate}</p>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-24 p-2 border border-gray-600 rounded-md bg-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleSaveEdit}
              className="p-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-100 truncate">
              {post.title}
            </h2>
            {isAuthor && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-300 mb-4 break-words">{post.content}</p>

          {post.mediaUrl && (
            <div className="mb-4">
              {post.mediaType === 'image' ? (
                <img
                  src={post.mediaUrl}
                  alt="Post media"
                  className="max-h-96 rounded-md object-cover border border-gray-700"
                />
              ) : (
                <video
                  src={post.mediaUrl}
                  controls
                  className="max-h-96 rounded-md border border-gray-700"
                />
              )}
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote('up')}
                className={`p-1 rounded-md transition-colors ${
                  userVote === 'up'
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <ArrowBigUp className="w-6 h-6" />
              </button>
              <span className="font-medium text-gray-300">{post.score}</span>
              <button
                onClick={() => handleVote('down')}
                className={`p-1 rounded-md transition-colors ${
                  userVote === 'down'
                    ? 'text-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <ArrowBigDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
