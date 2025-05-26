// Fake data generator for testing getPostComments tool
import { Comment, CommentsResultData } from "@/types/Comment";

interface FakeCommentsParams {
  post_id?: string;
  page: number;
  limit: number;
}

const fakeBios = [
  "Digital creator and coffee enthusiast ☕",
  "Travel blogger | Adventure seeker 🌍",
  "Tech enthusiast | Building the future",
  "Food lover | Recipe creator 🍝",
  "Fitness coach | Helping you get stronger 💪",
  "Artist | Painting life one canvas at a time",
  "Entrepreneur | Startup life",
  "Music producer | Creating beats daily 🎵",
  null,
  "Photographer | Capturing moments 📸",
];

const fakeComments = [
  "This is such an insightful post! Really appreciate you sharing this.",
  "Totally agree with your perspective here. Thanks for the great content!",
  "Wow, this really opened my eyes to a new way of thinking about this topic.",
  "Love this! Can't wait to see more content like this from you.",
  "This is exactly what I needed to read today. Thank you!",
  "Great points! I've been thinking about this exact thing lately.",
  "Really well written and thought-provoking. Keep up the excellent work!",
  "This resonates with me so much. Thanks for putting this out there.",
  "Fantastic insights! Looking forward to your next post.",
  "You always share the most valuable content. This is gold!",
];

const fakeUsernames = [
  "sarah_creates",
  "mike_travels",
  "tech_guru_2024",
  "foodie_adventures",
  "fitness_journey",
  "creative_soul",
  "startup_founder",
  "music_vibes",
  "photo_enthusiast",
  "lifestyle_blogger",
];

const fakeRegions = [
  "New York, NY",
  "Los Angeles, CA",
  "London, UK",
  "Toronto, CA",
  "Sydney, AU",
  "Berlin, DE",
  null,
  "San Francisco, CA",
  "Miami, FL",
  "Chicago, IL",
];

function generateFakeComment(index: number, post_id: string): Comment {
  const username = fakeUsernames[index % fakeUsernames.length];
  const commentDate = new Date();
  commentDate.setHours(commentDate.getHours() - Math.floor(Math.random() * 48)); // Random time within last 48 hours
  
  return {
    id: `comment_${post_id}_${index + 1}`,
    post_id: post_id,
    social_id: `social_${username}_${index}`,
    comment: fakeComments[index % fakeComments.length],
    commented_at: commentDate.toISOString(),
    username: username,
    avatar: Math.random() > 0.3 ? `https://avatar.example.com/${username}.jpg` : null,
    profile_url: `https://social.example.com/${username}`,
    post_url: `https://social.example.com/post/${post_id}`,
    region: fakeRegions[index % fakeRegions.length],
    bio: fakeBios[index % fakeBios.length],
    follower_count: Math.random() > 0.2 ? Math.floor(Math.random() * 10000) + 100 : null,
    following_count: Math.random() > 0.2 ? Math.floor(Math.random() * 5000) + 50 : null,
  };
}

export function generateFakeCommentsData({ post_id = "dev_post_123", page, limit }: FakeCommentsParams): CommentsResultData {
  // Simulate total comments for the post
  const totalComments = Math.floor(Math.random() * 200) + 50; // Between 50-250 comments
  const totalPages = Math.ceil(totalComments / limit);
  
  // Calculate how many comments to return for this page
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalComments);
  const commentsToGenerate = Math.max(0, endIndex - startIndex);
  
  // Generate fake comments
  const comments: Comment[] = [];
  for (let i = 0; i < commentsToGenerate; i++) {
    comments.push(generateFakeComment(startIndex + i, post_id));
  }
  
  return {
    success: true,
    status: "success",
    comments,
    pagination: {
      total_count: totalComments,
      page: page,
      limit: limit,
      total_pages: totalPages,
    },
  };
} 