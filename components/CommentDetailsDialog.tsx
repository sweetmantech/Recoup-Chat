import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CommentDetailsDialogProps } from '@/types/Comment';

// Helper functions for formatting
const formatFollowerCount = (count: number | null): string => {
  if (count === null) return '-';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

const formatTimestamp = (timestamp: string, short = false): string => {
  try {
    if (short) {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }
    return `${formatDistanceToNow(new Date(timestamp), { addSuffix: true })} (${format(new Date(timestamp), 'PPP')})`;
  } catch {
    return 'Recently';
  }
};

const CommentDetailsDialog: React.FC<CommentDetailsDialogProps> = ({ 
  comment, 
  isOpen, 
  onClose, 
  onNavigate, 
  currentIndex, 
  totalComments 
}) => {
  if (!comment) return null;
  
  const initials = comment.username.slice(0, 2).toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Comment Details</span>
            <span className="text-xs text-gray-500 font-normal">
              {currentIndex + 1} of {totalComments}
            </span>
          </DialogTitle>
          <DialogDescription>
            Full details of the selected comment
          </DialogDescription>
        </DialogHeader>
        
        {/* Comment content */}
        <div className="space-y-4 my-2">
          {/* User header */}
          <div className="flex items-start space-x-3">
            {/* Larger avatar */}
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
              {comment.avatar ? (
                <img 
                  src={comment.avatar} 
                  alt={comment.username} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-base font-medium">
                  {initials}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <h3 className="font-semibold text-base">@{comment.username}</h3>
                {comment.region && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    📍 {comment.region}
                  </span>
                )}
              </div>
              
              {comment.bio && (
                <p className="text-sm text-gray-600 italic mb-2">
                  {comment.bio}
                </p>
              )}
              
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {comment.follower_count !== null && (
                  <span>{formatFollowerCount(comment.follower_count)} followers</span>
                )}
                {comment.following_count !== null && (
                  <span>{formatFollowerCount(comment.following_count)} following</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Comment text */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 whitespace-pre-wrap">{comment.comment}</p>
          </div>
          
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-gray-500">Posted:</p>
              <p className="text-sm">{formatTimestamp(comment.commented_at)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Post ID:</p>
              <p className="text-sm font-mono text-xs truncate">{comment.post_id}</p>
            </div>
          </div>
          
          {/* Links */}
          <div className="border-t pt-3 flex flex-wrap gap-2">
            <a 
              href={comment.profile_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Profile
            </a>
            <a 
              href={comment.post_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Post
            </a>
            <button 
              onClick={() => navigator.clipboard.writeText(comment.comment)}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Text
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center border-t pt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate('prev')}
            disabled={currentIndex === 0}
          >
            ← Previous
          </Button>
          
          <DialogClose asChild>
            <Button variant="outline" size="sm">Close</Button>
          </DialogClose>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate('next')}
            disabled={currentIndex === totalComments - 1}
          >
            Next →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDetailsDialog; 