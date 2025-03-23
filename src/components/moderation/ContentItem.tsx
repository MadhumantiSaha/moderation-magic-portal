
import { useState } from "react";
import { ContentItem as ContentItemType, ContentCategory } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface ContentItemProps {
  item: ContentItemType;
  onApprove: (id: string, notes?: string) => void;
  onReject: (id: string, category: ContentCategory, notes: string) => void;
}

const ContentItem: React.FC<ContentItemProps> = ({ item, onApprove, onReject }) => {
  const [notes, setNotes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory>("other");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApprove = () => {
    onApprove(item.id, notes);
    setNotes("");
  };

  const handleReject = () => {
    onReject(item.id, selectedCategory, notes);
    setNotes("");
    setSelectedCategory("other");
    setIsDialogOpen(false);
  };

  const renderContent = () => {
    switch (item.type) {
      case "image":
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <img
              src={item.url}
              alt="Content"
              className="object-cover w-full h-full"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Not+Available";
              }}
            />
          </div>
        );
      case "video":
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-800 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="mb-2 text-sm">Video Preview</p>
              <Button variant="outline" className="bg-black/30 text-white border-white/20 hover:bg-black/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play Video
              </Button>
            </div>
          </div>
        );
      case "comment":
        return (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-700">{item.text}</p>
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {item.user.avatar ? (
                <img src={item.user.avatar} alt="User avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="font-medium">{item.user.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <CardTitle className="text-base">{item.user.name}</CardTitle>
              <CardDescription>
                {new Date(item.timestamp).toLocaleString()}
              </CardDescription>
            </div>
          </div>
          <Badge className="capitalize bg-gray-100 text-gray-800 hover:bg-gray-200">
            {item.platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moderation Notes
          </label>
          <Textarea
            placeholder="Add notes about this content..."
            className="resize-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between pt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
              <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Rejection</DialogTitle>
              <DialogDescription>
                Please select a reason for rejecting this content.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Reason
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as ContentCategory)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hate_speech">Hate Speech</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="violence">Violence</SelectItem>
                    <SelectItem value="adult">Adult Content</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="misinformation">Misinformation</SelectItem>
                    <SelectItem value="copyright">Copyright Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
              >
                Confirm Rejection
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleApprove}
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentItem;
