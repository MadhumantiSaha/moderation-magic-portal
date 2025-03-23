
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Policy, moderationPolicies, ContentCategory } from "@/lib/mockData";
import { FilePlus, PencilLine, Trash2, AlertTriangle, FileText, ShieldCheck, ShieldX, Settings } from "lucide-react";

const PolicyManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Form state
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [policyCategory, setPolicyCategory] = useState<ContentCategory>("other");
  const [policySeverity, setPolicySeverity] = useState<"low" | "medium" | "high">("medium");
  const [policyAutomated, setPolicyAutomated] = useState(false);
  const [saveError, setSaveError] = useState("");
  
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPolicies(moderationPolicies);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = searchQuery === "" || 
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      policy.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || policy.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleEditPolicy = (policy: Policy) => {
    setEditingPolicy(policy);
    setPolicyName(policy.name);
    setPolicyDescription(policy.description);
    setPolicyCategory(policy.category);
    setPolicySeverity(policy.severity);
    setPolicyAutomated(policy.automated);
    setIsAddMode(false);
    setSaveError("");
  };

  const handleAddNewPolicy = () => {
    setEditingPolicy(null);
    setPolicyName("");
    setPolicyDescription("");
    setPolicyCategory("other");
    setPolicySeverity("medium");
    setPolicyAutomated(false);
    setIsAddMode(true);
    setSaveError("");
  };

  const handleSavePolicy = () => {
    // Validate form
    if (!policyName.trim()) {
      setSaveError("Policy name is required");
      return;
    }
    
    if (!policyDescription.trim()) {
      setSaveError("Policy description is required");
      return;
    }
    
    const newPolicy: Policy = {
      id: isAddMode ? `p${Date.now()}` : editingPolicy!.id,
      name: policyName.trim(),
      description: policyDescription.trim(),
      category: policyCategory,
      severity: policySeverity,
      automated: policyAutomated,
      createdAt: isAddMode ? new Date().toISOString() : editingPolicy!.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    if (isAddMode) {
      // Add new policy
      setPolicies([...policies, newPolicy]);
      toast({
        title: "Policy Created",
        description: `${newPolicy.name} policy has been created successfully.`,
      });
    } else {
      // Update existing policy
      setPolicies(policies.map(p => p.id === newPolicy.id ? newPolicy : p));
      toast({
        title: "Policy Updated",
        description: `${newPolicy.name} policy has been updated successfully.`,
      });
    }
    
    // Reset form
    setEditingPolicy(null);
    setIsAddMode(false);
  };

  const handleDeletePolicy = (policyId: string) => {
    setPolicies(policies.filter(p => p.id !== policyId));
    toast({
      title: "Policy Deleted",
      description: "The policy has been deleted successfully.",
    });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors: Record<string, string> = {
      hate_speech: "bg-red-50 text-red-800 border-red-200",
      harassment: "bg-pink-50 text-pink-800 border-pink-200",
      violence: "bg-orange-50 text-orange-800 border-orange-200",
      adult: "bg-purple-50 text-purple-800 border-purple-200",
      spam: "bg-blue-50 text-blue-800 border-blue-200",
      misinformation: "bg-indigo-50 text-indigo-800 border-indigo-200",
      copyright: "bg-teal-50 text-teal-800 border-teal-200",
      other: "bg-gray-50 text-gray-800 border-gray-200",
    };

    const categoryNames: Record<string, string> = {
      hate_speech: "Hate Speech",
      harassment: "Harassment",
      violence: "Violence",
      adult: "Adult Content",
      spam: "Spam",
      misinformation: "Misinformation",
      copyright: "Copyright",
      other: "Other",
    };

    return (
      <Badge variant="outline" className={categoryColors[category]}>
        {categoryNames[category]}
      </Badge>
    );
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
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Policy Management</h1>
                <p className="text-gray-500">
                  Create and manage content moderation policies
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNewPolicy} disabled={!isAdmin}>
                    <FilePlus className="h-4 w-4 mr-2" />
                    Add New Policy
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isAddMode ? "Create New Policy" : "Edit Policy"}</DialogTitle>
                    <DialogDescription>
                      {isAddMode 
                        ? "Define a new content moderation policy" 
                        : "Update the existing content moderation policy"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {saveError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{saveError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Policy Name</Label>
                      <Input
                        id="name"
                        value={policyName}
                        onChange={(e) => setPolicyName(e.target.value)}
                        placeholder="e.g., Hate Speech Detection"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={policyDescription}
                        onChange={(e) => setPolicyDescription(e.target.value)}
                        placeholder="Describe what this policy detects and how it should be enforced"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={policyCategory}
                        onValueChange={(value) => setPolicyCategory(value as ContentCategory)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hate_speech">Hate Speech</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="violence">Violence</SelectItem>
                          <SelectItem value="adult">Adult Content</SelectItem>
                          <SelectItem value="spam">Spam</SelectItem>
                          <SelectItem value="misinformation">Misinformation</SelectItem>
                          <SelectItem value="copyright">Copyright</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select
                        value={policySeverity}
                        onValueChange={(value) => setPolicySeverity(value as "low" | "medium" | "high")}
                      >
                        <SelectTrigger id="severity">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        id="automated"
                        checked={policyAutomated}
                        onCheckedChange={setPolicyAutomated}
                      />
                      <Label htmlFor="automated">Enable Automated Detection</Label>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setEditingPolicy(null);
                      setIsAddMode(false);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSavePolicy}>
                      {isAddMode ? "Create Policy" : "Update Policy"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Policy Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    Active Policies
                  </CardTitle>
                  <CardDescription>
                    Total policies in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{policies.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                    Automated Policies
                  </CardTitle>
                  <CardDescription>
                    Policies with AI detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{policies.filter(p => p.automated).length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <ShieldX className="h-4 w-4 mr-2 text-red-500" />
                    Manual Policies
                  </CardTitle>
                  <CardDescription>
                    Policies requiring human review
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{policies.filter(p => !p.automated).length}</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="hate_speech">Hate Speech</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="violence">Violence</SelectItem>
                    <SelectItem value="adult">Adult Content</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="misinformation">Misinformation</SelectItem>
                    <SelectItem value="copyright">Copyright</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Policies Table */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Auto-Detect</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No policies found. Try adjusting your search or create a new policy.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPolicies.map(policy => (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium max-w-md">
                          <div>
                            <div className="font-medium">{policy.name}</div>
                            <div className="text-sm text-gray-500 truncate">{policy.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(policy.category)}</TableCell>
                        <TableCell>{getSeverityBadge(policy.severity)}</TableCell>
                        <TableCell>
                          {policy.automated ? (
                            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                              Enabled
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">
                              Manual
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(policy.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500"
                                  onClick={() => handleEditPolicy(policy)}
                                  disabled={!isAdmin}
                                >
                                  <PencilLine className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>{isAddMode ? "Create New Policy" : "Edit Policy"}</DialogTitle>
                                  <DialogDescription>
                                    {isAddMode 
                                      ? "Define a new content moderation policy" 
                                      : "Update the existing content moderation policy"}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {saveError && (
                                  <Alert variant="destructive" className="mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>{saveError}</AlertDescription>
                                  </Alert>
                                )}
                                
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="name">Policy Name</Label>
                                    <Input
                                      id="name"
                                      value={policyName}
                                      onChange={(e) => setPolicyName(e.target.value)}
                                      placeholder="e.g., Hate Speech Detection"
                                    />
                                  </div>
                                  
                                  <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                      id="description"
                                      value={policyDescription}
                                      onChange={(e) => setPolicyDescription(e.target.value)}
                                      placeholder="Describe what this policy detects and how it should be enforced"
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                      value={policyCategory}
                                      onValueChange={(value) => setPolicyCategory(value as ContentCategory)}
                                    >
                                      <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="hate_speech">Hate Speech</SelectItem>
                                        <SelectItem value="harassment">Harassment</SelectItem>
                                        <SelectItem value="violence">Violence</SelectItem>
                                        <SelectItem value="adult">Adult Content</SelectItem>
                                        <SelectItem value="spam">Spam</SelectItem>
                                        <SelectItem value="misinformation">Misinformation</SelectItem>
                                        <SelectItem value="copyright">Copyright</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div className="grid gap-2">
                                    <Label htmlFor="severity">Severity</Label>
                                    <Select
                                      value={policySeverity}
                                      onValueChange={(value) => setPolicySeverity(value as "low" | "medium" | "high")}
                                    >
                                      <SelectTrigger id="severity">
                                        <SelectValue placeholder="Select severity" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      id="automated"
                                      checked={policyAutomated}
                                      onCheckedChange={setPolicyAutomated}
                                    />
                                    <Label htmlFor="automated">Enable Automated Detection</Label>
                                  </div>
                                </div>
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => {
                                    setEditingPolicy(null);
                                    setIsAddMode(false);
                                  }}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSavePolicy}>
                                    {isAddMode ? "Create Policy" : "Update Policy"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500"
                                  disabled={!isAdmin}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Policy</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this policy? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <div className="p-4 border rounded-lg bg-gray-50">
                                    <h4 className="font-medium">{policy.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{policy.description}</p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeletePolicy(policy.id)}
                                  >
                                    Delete Policy
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
            
            {/* Policy Settings */}
            {isAdmin && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-gray-500" />
                    Policy Settings
                  </h2>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-base font-medium mb-2">Default Actions</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Configure what happens when content violates a policy
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <Label className="text-sm">Auto-reject high severity violations</Label>
                              <p className="text-xs text-gray-500">Automatically reject content that violates high severity policies</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <Label className="text-sm">Send email notifications</Label>
                              <p className="text-xs text-gray-500">Send email alerts for policy violations</p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <Label className="text-sm">Escalate repeated violations</Label>
                              <p className="text-xs text-gray-500">Automatically escalate users with multiple violations</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">AI Detection Settings</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Configure automated content detection thresholds
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm">Confidence Threshold</Label>
                            <p className="text-xs text-gray-500 mb-2">Minimum confidence score for AI to flag content</p>
                            <Select defaultValue="80">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="95">Very High (95%)</SelectItem>
                                <SelectItem value="90">High (90%)</SelectItem>
                                <SelectItem value="80">Medium (80%)</SelectItem>
                                <SelectItem value="70">Low (70%)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label className="text-sm">Language Support</Label>
                            <p className="text-xs text-gray-500 mb-2">Languages supported by automated detection</p>
                            <Select defaultValue="all">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Languages</SelectItem>
                                <SelectItem value="en">English Only</SelectItem>
                                <SelectItem value="major">Major Languages</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" className="mr-2">Reset to Defaults</Button>
                      <Button>Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

function Search(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default PolicyManagement;
