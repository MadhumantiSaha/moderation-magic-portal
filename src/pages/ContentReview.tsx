
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ContentItem from "@/components/moderation/ContentItem";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ContentItem as ContentItemType, ContentCategory, mockContentItems } from "@/lib/mockData";
import { Image, Video, MessageSquare, LayoutList, ArrowLeft, ArrowRight } from "lucide-react";

const ContentReview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItemType[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [currentItem, setCurrentItem] = useState<ContentItemType | null>(null);
  const [reviewMode, setReviewMode] = useState<"list" | "single">("list");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Get only pending items for content review
      const pending = mockContentItems.filter(item => item.status === "pending");
      setContentItems(pending);
      setFilteredItems(pending);
      setIsLoading(false);
      
      if (pending.length > 0) {
        setCurrentItem(pending[0]);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterItems();
  }, [activeTab, sortBy, platformFilter, contentItems]);

  const filterItems = () => {
    let items = [...contentItems];
    
    // Filter by content type
    if (activeTab !== "all") {
      items = items.filter(item => item.type === activeTab);
    }
    
    // Filter by platform
    if (platformFilter !== "all") {
      items = items.filter(item => item.platform === platformFilter);
    }
    
    // Sort items
    if (sortBy === "newest") {
      items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === "oldest") {
      items.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
    
    setFilteredItems(items);
    
    if (items.length > 0 && reviewMode === "single") {
      setCurrentItem(items[0]);
      setCurrentItemIndex(0);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleApprove = (id: string, notes?: string) => {
    // Update local state
    const updatedItems = contentItems.map(item => 
      item.id === id 
        ? { 
            ...item, 
            status: "approved", 
            moderatedAt: new Date().toISOString(),
            moderatedBy: { id: "current-user", name: "Current User" },
            notes
          } 
        : item
    );
    
    setContentItems(updatedItems);
    
    toast({
      title: "Content Approved",
      description: "The content has been approved successfully.",
    });
    
    if (reviewMode === "single" && filteredItems.length > 0) {
      moveToNextItem();
    }
  };

  const handleReject = (id: string, category: ContentCategory, notes: string) => {
    // Update local state
    const updatedItems = contentItems.map(item => 
      item.id === id 
        ? { 
            ...item, 
            status: "rejected",
            category,
            moderatedAt: new Date().toISOString(),
            moderatedBy: { id: "current-user", name: "Current User" },
            notes
          } 
        : item
    );
    
    setContentItems(updatedItems);
    
    toast({
      title: "Content Rejected",
      description: `The content has been rejected as "${category.replace('_', ' ')}".`,
    });
    
    if (reviewMode === "single" && filteredItems.length > 0) {
      moveToNextItem();
    }
  };

  const switchToSingleMode = (item: ContentItemType) => {
    setReviewMode("single");
    setCurrentItem(item);
    setCurrentItemIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const moveToNextItem = () => {
    if (currentItemIndex < filteredItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setCurrentItem(filteredItems[currentItemIndex + 1]);
    } else if (filteredItems.length > 0) {
      // Loop back to the first item if we're at the end
      setCurrentItemIndex(0);
      setCurrentItem(filteredItems[0]);
      toast({
        title: "End of Queue",
        description: "You've reached the end of the content queue.",
      });
    }
  };

  const moveToPreviousItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      setCurrentItem(filteredItems[currentItemIndex - 1]);
    } else if (filteredItems.length > 0) {
      // Loop to the last item if we're at the beginning
      setCurrentItemIndex(filteredItems.length - 1);
      setCurrentItem(filteredItems[filteredItems.length - 1]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 p-6 md:p-8 pt-6 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Content Review</h1>
                <p className="text-gray-500">
                  {filteredItems.length} pending items requiring moderation
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <RadioGroup
                  defaultValue="list"
                  value={reviewMode}
                  onValueChange={(value) => setReviewMode(value as "list" | "single")}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="list" id="list-view" />
                    <Label htmlFor="list-view" className="flex items-center">
                      <LayoutList className="h-4 w-4 mr-1" /> List View
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="single" id="single-view" />
                    <Label htmlFor="single-view">Single View</Label>
                  </div>
                </RadioGroup>
                
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all" className="flex items-center">
                  All
                  <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {contentItems.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center">
                  <Image className="h-4 w-4 mr-1" />
                  Images
                  <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {contentItems.filter(item => item.type === "image").length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  Videos
                  <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {contentItems.filter(item => item.type === "video").length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="comment" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Comments
                  <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {contentItems.filter(item => item.type === "comment").length}
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {filteredItems.length === 0 ? (
                  <Card className="p-8">
                    <CardContent className="flex flex-col items-center justify-center p-0">
                      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <CheckIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No pending content</h3>
                      <p className="text-gray-500 text-center max-w-md">
                        There are no pending content items that match your current filters. Try changing your filters or check back later.
                      </p>
                    </CardContent>
                  </Card>
                ) : reviewMode === "list" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                      <div 
                        key={item.id} 
                        className="transition-all hover:translate-y-[-4px] cursor-pointer"
                        onClick={() => switchToSingleMode(item)}
                      >
                        <ContentCard
                          content={item}
                          onReview={() => switchToSingleMode(item)}
                          onApprove={(id) => handleApprove(id)}
                          onReject={(id) => handleReject(id, "other", "")}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <Card className="mb-4">
                      <CardContent className="p-4 flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          onClick={moveToPreviousItem}
                          disabled={filteredItems.length <= 1}
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        
                        <div className="text-sm text-gray-500">
                          Item {currentItemIndex + 1} of {filteredItems.length}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          onClick={moveToNextItem}
                          disabled={filteredItems.length <= 1}
                        >
                          Next <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {currentItem && (
                      <ContentItem
                        item={currentItem}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default ContentReview;
