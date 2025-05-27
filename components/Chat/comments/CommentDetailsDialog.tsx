import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CommentDetailsDialogProps } from "@/types/Comment";
import { toast } from "react-toastify";
import {
  User,
  BarChart,
  Copy,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import Link from "next/link";
import { formatFollowerCount, formatTimestamp } from "@/lib/utils/formatters";

const CommentDetailsDialog: React.FC<CommentDetailsDialogProps> = ({
  comment,
  isOpen,
  onClose,
  onNavigate,
  currentIndex,
  totalComments,
}) => {
  if (!comment) return null;

  const initials = comment.username.slice(0, 2).toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Comment Details</span>
            <span className="text-xs text-gray-500 font-normal">
              {currentIndex + 1} of {totalComments}
            </span>
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-400">
            Full details of the selected comment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-1">
          <div className="flex items-center space-x-2">
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

          {comment.bio && (
            <p className="text-xs text-gray-500 italic">{comment.bio}</p>
          )}

          <div className="rounded-xl border-blue-100">
            <p className="p-3 pl-1 rounded-xl rounded-bl-none bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800 font-normal whitespace-pre-wrap text-sm font-inter">
              {comment.comment}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1 text-gray-500">
                <Heart className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Send className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <span className="text-gray-300">•</span>
                <span className="text-xs">
                  {formatTimestamp(comment.commented_at, true)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <Link
              href={comment.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-xl inline-flex items-center gap-1 transition-colors border border-gray-200"
            >
              <User className="h-3 w-3" />
              Profile
            </Link>
            <Link
              href={comment.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-xl inline-flex items-center gap-1 transition-colors border border-gray-200"
            >
              <BarChart className="h-3 w-3" />
              Post
            </Link>
            <button
              onClick={() => {
                toast.success("Copied to clipboard");
                navigator.clipboard.writeText(comment.comment);
              }}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-xl inline-flex items-center gap-1 transition-colors border border-gray-200"
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("prev")}
            disabled={currentIndex === 0}
            className="rounded-xl text-xs h-8 px-2"
          >
            <ChevronLeft className="h-3 w-3 mr-1" /> Previous
          </Button>

          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-xs h-8 px-2"
            >
              Close
            </Button>
          </DialogClose>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("next")}
            disabled={currentIndex === totalComments - 1}
            className="rounded-xl text-xs h-8 px-2"
          >
            Next <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDetailsDialog;
