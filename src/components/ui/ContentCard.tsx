
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ContentItem } from "@/lib/mockData";
import { Eye, XCircle, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface ContentCardProps {
  content: ContentItem;
  onReview?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  onReview,
  onApprove,
  onReject,
  showActions = true,
  className,
}) => {
  const renderContentPreview = () => {
    switch (content.type) {
      case "image":
        return (
          <div className="relative h-40 w-full overflow-hidden rounded-md bg-gray-100">
            <img
              src={content.url}
              alt="Content preview"
              className="object-cover w-full h-full transition-transform hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Not+Available";
              }}
            />
          </div>
        );
      case "video":
        return (
          <div className="relative h-40 w-full overflow-hidden rounded-md bg-gray-800 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="bg-black/50 p-2 rounded-full mb-2 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p className="text-sm">Video Content</p>
            </div>
          </div>
        );
      case "comment":
        return (
          <div className="h-40 w-full overflow-hidden rounded-md bg-gray-50 p-4 border border-gray-200">
            <div className="italic text-gray-600">"{content.text}"</div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (content.status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPlatformBadge = () => {
    const platformColors: Record<string, string> = {
      facebook: "bg-blue-100 text-blue-800",
      twitter: "bg-sky-100 text-sky-800",
      instagram: "bg-purple-100 text-purple-800",
      tiktok: "bg-gray-100 text-gray-800",
      youtube: "bg-red-100 text-red-800",
    };

    return (
      <Badge variant="outline" className={`${platformColors[content.platform]} border-transparent`}>
        {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
      </Badge>
    );
  };

  const getCategoryBadge = () => {
    if (!content.category) return null;
    
    const categoryColors: Record<string, string> = {
      offensive: "bg-orange-100 text-orange-800",
      harassment: "bg-pink-100 text-pink-800",
      hate_speech: "bg-red-100 text-red-800",
      violence: "bg-red-100 text-red-800",
      adult: "bg-purple-100 text-purple-800",
      spam: "bg-yellow-100 text-yellow-800",
      misinformation: "bg-indigo-100 text-indigo-800",
      copyright: "bg-blue-100 text-blue-800",
      other: "bg-gray-100 text-gray-800",
    };

    const categoryNames: Record<string, string> = {
      hate_speech: "Hate Speech",
      offensive: "Offensive",
      harassment: "Harassment",
      violence: "Violence",
      adult: "Adult Content",
      spam: "Spam",
      misinformation: "Misinformation",
      copyright: "Copyright",
      other: "Other",
    };

    return (
      <Badge variant="outline" className={`${categoryColors[content.category]} border-transparent`}>
        {categoryNames[content.category]}
      </Badge>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex gap-2 flex-wrap">
            {getStatusBadge()}
            {getPlatformBadge()}
            {getCategoryBadge()}
          </div>
          <span className="text-xs text-gray-500">
            {formatTimestamp(content.timestamp)}
          </span>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {content.user.avatar ? (
              <img src={content.user.avatar} alt="User avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-medium">{content.user.name.charAt(0)}</span>
            )}
          </div>
          <CardTitle className="ml-2 text-sm font-medium">{content.user.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {renderContentPreview()}
      </CardContent>
      {showActions && (
        <>
          <Separator />
          <CardFooter className="p-3 flex justify-between">
            <Button
              size="sm"
              variant="outline"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => onReview && onReview(content.id)}
            >
              <Eye className="mr-2 h-4 w-4" /> View
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => onReject && onReject(content.id)}
              >
                <XCircle className="mr-1 h-4 w-4" /> Reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-green-200 text-green-600 hover:bg-green-50"
                onClick={() => onApprove && onApprove(content.id)}
              >
                <CheckCircle className="mr-1 h-4 w-4" /> Approve
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ContentCard;
