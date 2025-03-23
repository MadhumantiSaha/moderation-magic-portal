
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import Chart from "@/components/dashboard/Chart";
import ContentCard from "@/components/ui/ContentCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { moderationStats, weeklyModerationData, contentTypeDistribution, violationTypeDistribution, mockContentItems } from "@/lib/mockData";
import { Shield, Clock, CheckCircle, XCircle, BarChart, Image, Video, MessageSquare, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Get pending items
  const pendingItems = mockContentItems.filter(item => item.status === "pending").slice(0, 3);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Create platform-specific chart colors
  const platformColors = ["#4f46e5", "#0ea5e9", "#8b5cf6", "#f43f5e", "#ef4444"];
  const contentTypeColors = ["#3b82f6", "#14b8a6", "#f59e0b"];
  const violationColors = ["#f43f5e", "#8b5cf6", "#ef4444", "#ec4899", "#f59e0b", "#0ea5e9", "#a3a3a3"];

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
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                <p className="text-gray-500">Welcome back, {user?.name}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button>
                  <BarChart className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Moderated"
                value={moderationStats.totalModerated.toLocaleString()}
                description="Content items"
                icon={<Shield className="h-4 w-4" />}
                trend={{ value: 12, isPositive: true }}
              />
              <StatCard
                title="Pending Review"
                value={moderationStats.pendingReview.toLocaleString()}
                description="Needs attention"
                icon={<Clock className="h-4 w-4" />}
                trend={{ value: 5, isPositive: false }}
              />
              <StatCard
                title="Approved"
                value={moderationStats.approvedCount.toLocaleString()}
                description="Safe content"
                icon={<CheckCircle className="h-4 w-4" />}
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard
                title="Rejected"
                value={moderationStats.rejectedCount.toLocaleString()}
                description="Violated policies"
                icon={<XCircle className="h-4 w-4" />}
                trend={{ value: 15, isPositive: true }}
              />
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Chart
                title="Moderation Activity"
                description="Content reviewed over time"
                type="area"
                data={weeklyModerationData}
                dataKey="approved"
                secondaryDataKey="rejected"
                colors={["#10b981", "#ef4444"]}
              />
              
              <Tabs defaultValue="content-types">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">Distribution Analysis</CardTitle>
                      <TabsList>
                        <TabsTrigger value="content-types">Content Types</TabsTrigger>
                        <TabsTrigger value="violation-types">Violation Types</TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 pb-4">
                    <TabsContent value="content-types" className="mt-0">
                      <Chart
                        title=""
                        type="pie"
                        data={contentTypeDistribution}
                        dataKey="value"
                        colors={contentTypeColors}
                        height={300}
                      />
                    </TabsContent>
                    <TabsContent value="violation-types" className="mt-0">
                      <Chart
                        title=""
                        type="pie"
                        data={violationTypeDistribution}
                        dataKey="value"
                        colors={violationColors}
                        height={300}
                      />
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </div>
            
            {/* Content Pending Review */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Content Pending Review</h2>
                <Button variant="link" className="text-brand-600">
                  View all
                </Button>
              </div>
              
              {pendingItems.length === 0 ? (
                <Card className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                    <p className="text-gray-500 max-w-md">
                      There are no items pending review at the moment. Check back later or view the moderation history.
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingItems.map((item) => (
                    <ContentCard
                      key={item.id}
                      content={item}
                      onReview={() => {}}
                      onApprove={() => {}}
                      onReject={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Quick Stats */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Content Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Image className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Images</p>
                      <p className="text-2xl font-semibold">5,249</p>
                      <div className="text-xs text-green-600 flex items-center">
                        <span>+12% from last period</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <Video className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Videos</p>
                      <p className="text-2xl font-semibold">3,182</p>
                      <div className="text-xs text-green-600 flex items-center">
                        <span>+23% from last period</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <MessageSquare className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Comments</p>
                      <p className="text-2xl font-semibold">4,156</p>
                      <div className="text-xs text-red-600 flex items-center">
                        <span>-5% from last period</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function Clock(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default Dashboard;
