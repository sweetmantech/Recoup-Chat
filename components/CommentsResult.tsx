import React, { useState } from 'react';
import CommentDetailsDialog from './CommentDetailsDialog';
import { Comment, CommentsResultProps, MinimalCommentCardProps } from '@/types/Comment';

const MinimalCommentCard: React.FC<MinimalCommentCardProps> = ({ comment, onClick }) => {
  const initials = comment.username.slice(0, 2).toUpperCase();
  
  // Truncate comment based on responsive layout (mobile gets more space)
  const previewText = comment.comment.length > 45 
    ? comment.comment.substring(0, 45) + '...' 
    : comment.comment;

  return (
    <div 
      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Tiny Avatar */}
      <div className="h-5 w-5 rounded-full overflow-hidden flex-shrink-0">
        {comment.avatar ? (
          <img 
            src={comment.avatar} 
            alt={comment.username} 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-[8px] font-medium">
            {initials}
          </div>
        )}
      </div>
      
      {/* Content - responsive text sizing */}
      <div className="flex-grow min-w-0">
        <div className="flex items-start space-x-1">
          <span className="font-medium text-xs md:text-[11px] lg:text-xs text-gray-900 flex-shrink-0">@{comment.username}</span>
          <span className="text-xs md:text-[11px] lg:text-xs text-gray-600 truncate leading-tight">
            {previewText}
          </span>
        </div>
      </div>
      
      {/* Click indicator */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export const CommentsResult: React.FC<CommentsResultProps> = ({ result }) => {
  // State for dialog
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Handle comment click
  const handleCommentClick = (comment: Comment) => {
    const index = result.comments.findIndex(c => c.id === comment.id);
    setCurrentIndex(index !== -1 ? index : 0);
    setSelectedComment(comment);
    setDialogOpen(true);
  };
  
  // Handle dialog close
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle navigation
  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedComment(result.comments[newIndex]);
    } else if (direction === 'next' && currentIndex < result.comments.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedComment(result.comments[newIndex]);
    }
  };

  // Handle error state
  if (!result.success || result.status === 'error') {
    return (
      <div className="flex items-center space-x-3 p-2 rounded bg-red-50 border border-red-200 my-1 text-red-800 w-fit md:rounded-xl">
        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-sm font-medium text-red-600">×</span>
        </div>
        <div className="flex-grow min-w-0">
          <p className="font-medium text-sm">Error Loading Comments</p>
          <p className="text-xs text-red-600 truncate">
            {result.message || 'Failed to load comments'}
          </p>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (result.comments.length === 0) {
    return (
      <div className="flex items-center space-x-3 p-2 rounded bg-gray-50 border border-gray-200 my-1 text-gray-800 w-fit md:rounded-xl">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-sm font-medium text-gray-600">💬</span>
        </div>
        <div className="flex-grow min-w-0">
          <p className="font-medium text-sm">No Comments Found</p>
          <p className="text-xs text-gray-500 truncate">
            There are no comments to display for this post
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-200 rounded-xl shadow-sm">
      <div className="p-3">
        {/* Compact header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[10px] font-medium text-blue-600">💬</span>
            </div>
            <span className="font-medium text-sm text-gray-900">Comments</span>
            <span className="text-xs text-gray-500">
              {result.comments.length} of {result.pagination.total_count}
            </span>
          </div>
        </div>
        
        {/* Responsive grid layout - mobile: 1 col, iPad: 2 cols, desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {result.comments.map((comment) => (
            <MinimalCommentCard 
              key={comment.id} 
              comment={comment} 
              onClick={() => handleCommentClick(comment)}
            />
          ))}
        </div>
      </div>
      
      {/* Comment details dialog */}
      <CommentDetailsDialog 
        comment={selectedComment}
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onNavigate={handleNavigation}
        currentIndex={currentIndex}
        totalComments={result.comments.length}
      />
    </div>
  );
}; 