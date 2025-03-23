
// Moderation statistics for the dashboard
export const moderationStats = {
  totalModerated: 12587,
  pendingReview: 432,
  approvedCount: 10892,
  rejectedCount: 1695,
  todayModerated: 342,
  averageResponseTime: "1.4m",
};

// Content types
export type ContentType = "image" | "video" | "comment";

// Moderation status
export type ModerationStatus = "pending" | "approved" | "rejected";

// Content categories
export type ContentCategory = 
  | "offensive"
  | "harassment"
  | "hate_speech"
  | "violence"
  | "adult"
  | "spam"
  | "misinformation"
  | "copyright"
  | "other";

// Content item interface
export interface ContentItem {
  id: string;
  type: ContentType;
  url?: string;
  text?: string;
  timestamp: string;
  status: ModerationStatus;
  category?: ContentCategory;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  platform: "facebook" | "twitter" | "instagram" | "tiktok" | "youtube";
  moderatedBy?: {
    id: string;
    name: string;
  };
  moderatedAt?: string;
  notes?: string;
}

// Mock content items
export const mockContentItems: ContentItem[] = [
  {
    id: "c1",
    type: "image",
    url: "https://picsum.photos/id/1/500/300",
    timestamp: "2023-10-15T14:23:11Z",
    status: "pending",
    user: {
      id: "u1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    platform: "instagram",
  },
  {
    id: "c2",
    type: "video",
    url: "https://example.com/video1",
    timestamp: "2023-10-15T12:45:22Z",
    status: "pending",
    user: {
      id: "u2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    platform: "tiktok",
  },
  {
    id: "c3",
    type: "comment",
    text: "This is a sample comment that needs moderation.",
    timestamp: "2023-10-15T10:12:45Z",
    status: "pending",
    user: {
      id: "u3",
      name: "Robert Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    platform: "facebook",
  },
  {
    id: "c4",
    type: "image",
    url: "https://picsum.photos/id/20/500/300",
    timestamp: "2023-10-14T22:18:09Z",
    status: "approved",
    category: "other",
    user: {
      id: "u4",
      name: "Alice Williams",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    platform: "instagram",
    moderatedBy: {
      id: "m1",
      name: "Moderator 1",
    },
    moderatedAt: "2023-10-15T08:22:33Z",
  },
  {
    id: "c5",
    type: "comment",
    text: "This comment was flagged and rejected for violating community guidelines.",
    timestamp: "2023-10-14T18:34:21Z",
    status: "rejected",
    category: "hate_speech",
    user: {
      id: "u5",
      name: "David Brown",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    platform: "youtube",
    moderatedBy: {
      id: "m2",
      name: "Moderator 2",
    },
    moderatedAt: "2023-10-14T19:12:45Z",
    notes: "Clear violation of hate speech policy.",
  },
  {
    id: "c6",
    type: "video",
    url: "https://example.com/video2",
    timestamp: "2023-10-14T15:56:11Z",
    status: "approved",
    user: {
      id: "u6",
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    platform: "youtube",
    moderatedBy: {
      id: "m1",
      name: "Moderator 1",
    },
    moderatedAt: "2023-10-14T16:32:19Z",
  },
  {
    id: "c7",
    type: "image",
    url: "https://picsum.photos/id/43/500/300",
    timestamp: "2023-10-14T12:23:44Z",
    status: "rejected",
    category: "adult",
    user: {
      id: "u7",
      name: "Michael Wilson",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    platform: "facebook",
    moderatedBy: {
      id: "m3",
      name: "Moderator 3",
    },
    moderatedAt: "2023-10-14T12:45:22Z",
    notes: "Contains adult content not suitable for general audience.",
  },
  {
    id: "c8",
    type: "comment",
    text: "This is another comment that was reviewed and approved.",
    timestamp: "2023-10-14T09:45:33Z",
    status: "approved",
    user: {
      id: "u8",
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    platform: "twitter",
    moderatedBy: {
      id: "m2",
      name: "Moderator 2",
    },
    moderatedAt: "2023-10-14T10:12:18Z",
  },
];

// Recent moderation history
export const moderationHistory = [
  ...mockContentItems.filter(item => item.status !== "pending"),
];

// Chart data for dashboard
export const weeklyModerationData = [
  { date: "Mon", approved: 320, rejected: 45 },
  { date: "Tue", approved: 280, rejected: 62 },
  { date: "Wed", approved: 410, rejected: 78 },
  { date: "Thu", approved: 350, rejected: 52 },
  { date: "Fri", approved: 290, rejected: 41 },
  { date: "Sat", approved: 190, rejected: 32 },
  { date: "Sun", approved: 140, rejected: 25 },
];

export const contentTypeDistribution = [
  { name: "Images", value: 45 },
  { name: "Videos", value: 30 },
  { name: "Comments", value: 25 },
];

export const violationTypeDistribution = [
  { name: "Hate Speech", value: 28 },
  { name: "Adult Content", value: 22 },
  { name: "Violence", value: 15 },
  { name: "Harassment", value: 12 },
  { name: "Spam", value: 10 },
  { name: "Misinformation", value: 8 },
  { name: "Other", value: 5 },
];

// Moderation policies
export interface Policy {
  id: string;
  name: string;
  description: string;
  category: ContentCategory;
  severity: "low" | "medium" | "high";
  automated: boolean;
  createdAt: string;
  updatedAt: string;
}

export const moderationPolicies: Policy[] = [
  {
    id: "p1",
    name: "Hate Speech Detection",
    description: "Detects and flags content containing hate speech, slurs, or discriminatory language.",
    category: "hate_speech",
    severity: "high",
    automated: true,
    createdAt: "2023-08-12T10:00:00Z",
    updatedAt: "2023-09-28T14:30:00Z",
  },
  {
    id: "p2",
    name: "Adult Content Filter",
    description: "Identifies and restricts explicit adult content across all platforms.",
    category: "adult",
    severity: "high",
    automated: true,
    createdAt: "2023-08-12T10:00:00Z",
    updatedAt: "2023-10-05T11:15:00Z",
  },
  {
    id: "p3",
    name: "Violence & Gore Filter",
    description: "Detects violent imagery, excessive gore, or content promoting violence.",
    category: "violence",
    severity: "high",
    automated: true,
    createdAt: "2023-08-15T09:30:00Z",
    updatedAt: "2023-09-20T16:45:00Z",
  },
  {
    id: "p4",
    name: "Harassment Policy",
    description: "Identifies content targeting individuals with harassment or bullying.",
    category: "harassment",
    severity: "medium",
    automated: false,
    createdAt: "2023-08-18T13:20:00Z",
    updatedAt: "2023-09-10T10:30:00Z",
  },
  {
    id: "p5",
    name: "Spam Detection",
    description: "Identifies repetitive or automated content designed to promote products or services.",
    category: "spam",
    severity: "low",
    automated: true,
    createdAt: "2023-08-20T15:45:00Z",
    updatedAt: "2023-10-01T09:15:00Z",
  },
  {
    id: "p6",
    name: "Misinformation Filter",
    description: "Flags content containing potentially false or misleading information.",
    category: "misinformation",
    severity: "medium",
    automated: false,
    createdAt: "2023-09-01T11:30:00Z",
    updatedAt: "2023-10-10T14:20:00Z",
  },
  {
    id: "p7",
    name: "Copyright Detection",
    description: "Identifies potentially copyrighted material being shared without permission.",
    category: "copyright",
    severity: "medium",
    automated: true,
    createdAt: "2023-09-05T14:15:00Z",
    updatedAt: "2023-09-25T16:30:00Z",
  },
];

// API configurations
export interface ApiConfig {
  id: string;
  name: string;
  key: string;
  platform: string;
  status: "active" | "inactive";
  createdAt: string;
  lastUsed?: string;
  requestLimit: number;
  requestsUsed: number;
}

export const apiConfigurations: ApiConfig[] = [
  {
    id: "api1",
    name: "Facebook Moderation API",
    key: "fb_mod_xxxxxxxxxxxxx",
    platform: "Facebook",
    status: "active",
    createdAt: "2023-08-01T10:00:00Z",
    lastUsed: "2023-10-15T09:45:22Z",
    requestLimit: 10000,
    requestsUsed: 7823,
  },
  {
    id: "api2",
    name: "Twitter Content API",
    key: "tw_content_xxxxxxxxxxx",
    platform: "Twitter",
    status: "active",
    createdAt: "2023-08-05T14:30:00Z",
    lastUsed: "2023-10-15T11:12:33Z",
    requestLimit: 5000,
    requestsUsed: 3246,
  },
  {
    id: "api3",
    name: "Instagram Moderation API",
    key: "ig_mod_xxxxxxxxxxxxx",
    platform: "Instagram",
    status: "active",
    createdAt: "2023-08-10T09:15:00Z",
    lastUsed: "2023-10-15T08:30:15Z",
    requestLimit: 8000,
    requestsUsed: 6127,
  },
  {
    id: "api4",
    name: "YouTube Content API",
    key: "yt_content_xxxxxxxxxxx",
    platform: "YouTube",
    status: "inactive",
    createdAt: "2023-09-01T13:45:00Z",
    lastUsed: "2023-10-10T15:22:41Z",
    requestLimit: 12000,
    requestsUsed: 8934,
  },
  {
    id: "api5",
    name: "TikTok Moderation API",
    key: "tt_mod_xxxxxxxxxxxxx",
    platform: "TikTok",
    status: "active",
    createdAt: "2023-09-15T11:30:00Z",
    lastUsed: "2023-10-15T10:18:55Z",
    requestLimit: 7500,
    requestsUsed: 4215,
  },
];
