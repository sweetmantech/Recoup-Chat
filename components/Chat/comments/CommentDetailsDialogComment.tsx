import React from "react";
import { Comment } from "@/types/Comment";
import formatFollowerCount from "@/lib/utils/formatFollowerCount";
import CommentSocialIndicators from "./CommentSocialIndicators";

interface CommentDetailsDialogCommentProps {
  comment: Comment;
}

const CommentDetailsDialogComment: React.FC<
  CommentDetailsDialogCommentProps
> = ({ comment }) => {
  const initials = comment.username.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-3 my-1">
      {/* User header */}
      <div className="flex items-center space-x-2">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
          {comment.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={comment.avatar}
              alt={comment.username}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              {initials}
            </div>
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1">
            <h3 className="font-medium text-sm text-gray-900">
              @{comment.username}
            </h3>
            {comment.region && (
              <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600">
                {comment.region}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            {comment.follower_count !== null && (
              <span>
                {formatFollowerCount(comment.follower_count)} followers
              </span>
            )}
          </div>
        </div>
      </div>

      {/* User bio */}
      {comment.bio && (
        <p className="text-xs text-gray-500 italic">{comment.bio}</p>
      )}

      {/* Comment content */}
      <div className="rounded-xl border-blue-100">
        <p className="p-3 pl-1 rounded-xl rounded-bl-none bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800 font-normal whitespace-pre-wrap text-sm font-inter">
          {comment.comment}
        </p>

        {/* Social media indicators */}
        <CommentSocialIndicators timestamp={comment.commented_at} />
      </div>
    </div>
  );
};

export default CommentDetailsDialogComment;
