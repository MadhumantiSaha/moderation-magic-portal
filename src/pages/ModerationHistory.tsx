
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContentCard from "@/components/ui/ContentCard";
import { moderationHistory, ContentItem } from "@/lib/mockData";
import { Search, Filter, Check, X, Info, Download, Eye, Calendar } from "lucide-react";

const ModerationHistory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [contentType, setContentType] = useState("all");
  const [decision, setDecision] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [filteredHistory, setFilteredHistory] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredHistory(moderationHistory);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterHistory();
  }, [searchQuery, dateRange, contentType, decision, platform]);

  const filterHistory = () => {
    let filtered = [...moderationHistory];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        (item.user.name.toLowerCase().includes(query)) ||
        (item.text?.toLowerCase().includes(query)) ||
        (item.moderatedBy?.name.toLowerCase().includes(query)) ||
        (item.notes?.toLowerCase().includes(query))
      );
    }
    
    // Filter by date range
    if (dateRange !== "all") {
      const now = new Date();
      let startDate = new Date();
      
      if (dateRange === "today") {
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === "week") {
        startDate.setDate(now.getDate() - 7);
      } else if (dateRange === "month") {
        startDate.setMonth(now.getMonth() - 1);
      }
      
      filtered = filtered.filter(item => new Date(item.moderatedAt!) >= startDate);
    }
    
    // Filter by content type
    if (contentType !== "all") {
      filtered = filtered.filter(item => item.type === contentType);
    }
    
    // Filter by decision
    if (decision !== "all") {
      filtered = filtered.filter(item => item.status === decision);
    }
    
    // Filter by platform
    if (platform !== "all") {
      filtered = filtered.filter(item => item.platform === platform);
    }
    
    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setDateRange("all");
    setContentType("all");
    setDecision("all");
    setPlatform("all");
  };

  const handleViewDetails = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center gap-1">
            <Check className="h-3 w-3" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 flex items-center gap-1">
            <X className="h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
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
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Moderation History</h1>
                <p className="text-gray-500">
                  View and search through past moderation decisions
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Set Date Range
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by user, content, or moderator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="comment">Comments</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={decision} onValueChange={setDecision}>
                <SelectTrigger>
                  <SelectValue placeholder="Decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decisions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
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
              
              <div className="lg:col-span-6 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={resetFilters} 
                  size="sm"
                  className="text-gray-500"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Results count */}
            <div className="text-sm text-gray-500 mb-4">
              Showing {filteredHistory.length} results
            </div>
            
            {/* Table */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Content</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Moderator</TableHead>
                    <TableHead>Decision</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No results found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.type === "comment" ? (
                            <div className="truncate max-w-[250px]">
                              {item.text}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              {item.type === "image" ? (
                                <>
                                  <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden mr-3">
                                    {item.url && (
                                      <img
                                        src={item.url}
                                        alt="Content"
                                        className="h-full w-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <span>Image content</span>
                                </>
                              ) : (
                                <>
                                  <div className="h-10 w-10 bg-gray-800 rounded overflow-hidden mr-3 flex items-center justify-center text-white">
                                    <Video className="h-4 w-4" />
                                  </div>
                                  <span>Video content</span>
                                </>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center overflow-hidden">
                              {item.user.avatar ? (
                                <img src={item.user.avatar} alt="User avatar" className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-xs font-medium">{item.user.name.charAt(0)}</span>
                              )}
                            </div>
                            <span>{item.user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{item.platform}</TableCell>
                        <TableCell>{item.moderatedBy?.name}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{formatTimestamp(item.moderatedAt!)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                onClick={() => handleViewDetails(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Moderation Details</DialogTitle>
                                <DialogDescription>
                                  Complete information about this moderation decision
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <div className="md:col-span-2">
                                  {selectedItem && (
                                    <ContentCard 
                                      content={selectedItem} 
                                      showActions={false}
                                    />
                                  )}
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold mb-3 text-gray-900">Decision Details</h3>
                                  
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Status</p>
                                      <div className="mt-1">
                                        {selectedItem && getStatusBadge(selectedItem.status)}
                                      </div>
                                    </div>
                                    
                                    {selectedItem?.category && (
                                      <div>
                                        <p className="text-sm font-medium text-gray-500">Violation Category</p>
                                        <p className="mt-1 capitalize">
                                          {selectedItem.category.replace('_', ' ')}
                                        </p>
                                      </div>
                                    )}
                                    
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Moderator</p>
                                      <p className="mt-1">{selectedItem?.moderatedBy?.name}</p>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Decision Date</p>
                                      <p className="mt-1">
                                        {selectedItem?.moderatedAt && formatTimestamp(selectedItem.moderatedAt)}
                                      </p>
                                    </div>
                                    
                                    {selectedItem?.notes && (
                                      <div>
                                        <p className="text-sm font-medium text-gray-500">Notes</p>
                                        <p className="mt-1 text-sm bg-gray-50 p-3 rounded border">
                                          {selectedItem.notes}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {filteredHistory.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, current page, and pages around current page
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      const shouldAddEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                      const shouldAddEllipsisAfter = index < array.length - 1 && array[index + 1] - page > 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {shouldAddEllipsisBefore && (
                            <PaginationItem>
                              <span className="px-3 py-2">...</span>
                            </PaginationItem>
                          )}
                          
                          <PaginationItem>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                          
                          {shouldAddEllipsisAfter && (
                            <PaginationItem>
                              <span className="px-3 py-2">...</span>
                            </PaginationItem>
                          )}
                        </React.Fragment>
                      );
                    })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModerationHistory;
