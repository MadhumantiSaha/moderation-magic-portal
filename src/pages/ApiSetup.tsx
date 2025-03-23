
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ApiConfig, apiConfigurations } from "@/lib/mockData";
import { PlusCircle, Key, RefreshCw, Power, Copy, AlertTriangle, Code, BookOpen, Link, Terminal, Eye, EyeOff, Cog, ExternalLink } from "lucide-react";

const ApiSetup = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiConfigs, setApiConfigs] = useState<ApiConfig[]>([]);
  const [newApiName, setNewApiName] = useState("");
  const [newApiPlatform, setNewApiPlatform] = useState("");
  const [generatedApiKey, setGeneratedApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState("keys");
  
  // Code snippets state
  const [language, setLanguage] = useState("javascript");
  const [selectedConfig, setSelectedConfig] = useState<ApiConfig | null>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setApiConfigs(apiConfigurations);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const generateApiKey = () => {
    // Generate a random API key for demonstration
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedApiKey(result);
  };

  const handleCreateApiKey = () => {
    if (!newApiName.trim() || !newApiPlatform.trim() || !generatedApiKey) {
      toast({
        title: "Error",
        description: "Please fill in all fields and generate an API key.",
        variant: "destructive",
      });
      return;
    }
    
    const newKey: ApiConfig = {
      id: `api${Date.now()}`,
      name: newApiName.trim(),
      key: generatedApiKey,
      platform: newApiPlatform.trim(),
      status: "active",
      createdAt: new Date().toISOString(),
      requestLimit: 10000,
      requestsUsed: 0,
    };
    
    setApiConfigs([...apiConfigs, newKey]);
    
    // Reset form
    setNewApiName("");
    setNewApiPlatform("");
    setGeneratedApiKey("");
    
    toast({
      title: "API Key Created",
      description: "Your new API key has been created successfully.",
    });
  };

  const toggleApiStatus = (id: string) => {
    setApiConfigs(apiConfigs.map(config => 
      config.id === id 
        ? { ...config, status: config.status === "active" ? "inactive" : "active" }
        : config
    ));
    
    const config = apiConfigs.find(c => c.id === id);
    const newStatus = config?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `API Key ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${config?.name} is now ${newStatus}.`,
    });
  };

  const regenerateApiKey = (id: string) => {
    // Generate a new random API key
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newKey = '';
    for (let i = 0; i < 32; i++) {
      newKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Update the API key
    setApiConfigs(apiConfigs.map(config => 
      config.id === id 
        ? { ...config, key: newKey, lastUsed: new Date().toISOString() }
        : config
    ));
    
    const config = apiConfigs.find(c => c.id === id);
    
    toast({
      title: "API Key Regenerated",
      description: `A new key has been generated for ${config?.name}.`,
    });
  };

  // Mock code examples for each language
  const getCodeExample = (language: string, apiKey: string) => {
    switch (language) {
      case "javascript":
        return `
// Using fetch to moderate content
const moderateContent = async (content, type) => {
  const response = await fetch('https://api.contentmod.com/v1/moderate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${apiKey}'
    },
    body: JSON.stringify({
      content,
      type // 'image', 'video', or 'text'
    })
  });
  
  return await response.json();
};

// Example usage
const result = await moderateContent('https://example.com/image.jpg', 'image');
console.log(result);
`;
      case "python":
        return `
import requests

def moderate_content(content, content_type):
    url = "https://api.contentmod.com/v1/moderate"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer ${apiKey}"
    }
    payload = {
        "content": content,
        "type": content_type  # 'image', 'video', or 'text'
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Example usage
result = moderate_content("https://example.com/image.jpg", "image")
print(result)
`;
      case "curl":
        return `
curl -X POST https://api.contentmod.com/v1/moderate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "content": "https://example.com/image.jpg",
    "type": "image"
  }'
`;
      default:
        return "Select a language to see code examples";
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
                <h1 className="text-2xl font-bold text-gray-900 mb-1">API Setup</h1>
                <p className="text-gray-500">
                  Manage your API keys and integration configurations
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  API Documentation
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create a New API Key</DialogTitle>
                      <DialogDescription>
                        Create an API key to integrate with your platform
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="api-name">API Key Name</Label>
                        <Input
                          id="api-name"
                          placeholder="e.g., Facebook Moderation API"
                          value={newApiName}
                          onChange={(e) => setNewApiName(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Input
                          id="platform"
                          placeholder="e.g., Facebook, Twitter, etc."
                          value={newApiPlatform}
                          onChange={(e) => setNewApiPlatform(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <div className="relative">
                          <Input
                            id="api-key"
                            value={generatedApiKey}
                            readOnly
                            className="pr-24"
                            placeholder="Click Generate to create an API key"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute right-1 top-1 h-7"
                            onClick={generateApiKey}
                          >
                            Generate
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          This key will only be shown once. Make sure to copy it.
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleCreateApiKey}>Create API Key</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="mb-4">
                <TabsTrigger value="keys" className="flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  API Keys
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  Code Examples
                </TabsTrigger>
                <TabsTrigger value="docs" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentation
                </TabsTrigger>
                <TabsTrigger value="webhooks" className="flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Webhooks
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="keys" className="space-y-6">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiConfigs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No API keys found. Create your first API key to get started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        apiConfigs.map(config => (
                          <TableRow key={config.id}>
                            <TableCell className="font-medium">
                              {config.name}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                  {config.key.substring(0, 10)}...
                                </code>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0" 
                                  onClick={() => {
                                    navigator.clipboard.writeText(config.key);
                                    toast({
                                      title: "Copied to clipboard",
                                      description: "API key has been copied to your clipboard.",
                                    });
                                  }}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{config.platform}</TableCell>
                            <TableCell>
                              {config.status === "active" ? (
                                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">
                                  Inactive
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-xs text-gray-500">
                                  {config.requestsUsed.toLocaleString()} / {config.requestLimit.toLocaleString()}
                                </div>
                                <Progress 
                                  value={(config.requestsUsed / config.requestLimit) * 100} 
                                  className="h-1" 
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {config.lastUsed ? new Date(config.lastUsed).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => toggleApiStatus(config.id)}
                                >
                                  <Power className={config.status === "active" ? "h-4 w-4 text-green-500" : "h-4 w-4 text-gray-400"} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => regenerateApiKey(config.id)}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    setSelectedConfig(config);
                                    setActiveTab("code");
                                  }}
                                >
                                  <Code className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">API Usage</CardTitle>
                    <CardDescription>
                      Your API usage statistics across all platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Total Usage</span>
                          <span className="text-sm text-gray-500">
                            {apiConfigs.reduce((acc, config) => acc + config.requestsUsed, 0).toLocaleString()} / {apiConfigs.reduce((acc, config) => acc + config.requestLimit, 0).toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(apiConfigs.reduce((acc, config) => acc + config.requestsUsed, 0) / apiConfigs.reduce((acc, config) => acc + config.requestLimit, 0)) * 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      {apiConfigs.map(config => (
                        <div key={config.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{config.name}</span>
                            <span className="text-sm text-gray-500">
                              {config.requestsUsed.toLocaleString()} / {config.requestLimit.toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={(config.requestsUsed / config.requestLimit) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="code" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">Integration Code Examples</CardTitle>
                        <CardDescription>
                          {selectedConfig 
                            ? `Example code for integrating ${selectedConfig.name}` 
                            : "Select an API key to see integration examples"}
                        </CardDescription>
                      </div>
                      
                      {selectedConfig ? (
                        <div className="flex items-center space-x-2">
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="curl">cURL</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              navigator.clipboard.writeText(getCodeExample(language, selectedConfig.key));
                              toast({
                                title: "Copied to clipboard",
                                description: "Code example has been copied to your clipboard.",
                              });
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedConfig ? (
                      <div className="bg-gray-900 text-gray-50 rounded-lg p-4 overflow-auto max-h-[400px]">
                        <pre className="text-sm font-mono">
                          <code>{getCodeExample(language, selectedConfig.key)}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border rounded-lg p-8 text-center">
                        <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Select an API Key</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Choose an API key from the "API Keys" tab to view integration code examples.
                        </p>
                        <Button className="mt-4" onClick={() => setActiveTab("keys")}>
                          Go to API Keys
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Integration Guide</CardTitle>
                    <CardDescription>
                      Follow these steps to integrate with our API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          1
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">Create an API Key</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Generate a unique API key that will be used to authenticate requests to our API.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          2
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">Include the API Key in Your Requests</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Add your API key to the Authorization header of your HTTP requests using the Bearer token format.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          3
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">Call the API Endpoints</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Use our API endpoints to moderate content:
                          </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-500">
                            <li>POST /v1/moderate - Moderate content (images, videos, text)</li>
                            <li>GET /v1/status - Get moderation status</li>
                            <li>GET /v1/history - Get moderation history</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          4
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">Handle API Responses</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Process the API responses and take appropriate actions based on moderation results.
                          </p>
                          <div className="mt-2 bg-gray-50 p-3 rounded-md text-sm">
                            <code className="text-xs">
                              {`{
  "id": "mod_123456",
  "status": "complete",
  "result": {
    "approved": true,
    "confidence": 0.98,
    "categories": []
  }
}`}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Complete API Documentation
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="docs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">API Documentation</CardTitle>
                    <CardDescription>
                      Detailed information about our content moderation API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-2">Base URL</h3>
                        <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                          <code className="text-sm font-mono">https://api.contentmod.com/v1</code>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => {
                              navigator.clipboard.writeText("https://api.contentmod.com/v1");
                              toast({
                                title: "Copied to clipboard",
                                description: "API Base URL has been copied to your clipboard.",
                              });
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Authentication</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          All API requests require an API key to be included in the Authorization header:
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <code className="text-sm font-mono">Authorization: Bearer YOUR_API_KEY</code>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-4">API Endpoints</h3>
                        
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-100 text-green-800 border-none">POST</Badge>
                              <h4 className="font-medium">/moderate</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              Submit content for moderation.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium mb-2">Request Body</h5>
                                <div className="bg-gray-100 p-3 rounded-md">
                                  <pre className="text-xs font-mono">
                                    {`{
  "content": "string | URL",
  "type": "image | video | text",
  "async": false
}`}
                                  </pre>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-2">Response</h5>
                                <div className="bg-gray-100 p-3 rounded-md">
                                  <pre className="text-xs font-mono">
                                    {`{
  "id": "mod_123456",
  "status": "complete | pending",
  "result": {
    "approved": true | false,
    "confidence": 0.98,
    "categories": ["hate_speech", "adult"]
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-100 text-blue-800 border-none">GET</Badge>
                              <h4 className="font-medium">/status/{"{id}"}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              Check status of an async moderation request.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium mb-2">Path Parameters</h5>
                                <div className="bg-gray-100 p-3 rounded-md">
                                  <p className="text-xs font-mono">id: string (moderation ID)</p>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-2">Response</h5>
                                <div className="bg-gray-100 p-3 rounded-md">
                                  <pre className="text-xs font-mono">
                                    {`{
  "id": "mod_123456",
  "status": "complete | pending",
  "result": {
    "approved": true | false,
    "confidence": 0.98,
    "categories": ["hate_speech", "adult"]
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-100 text-blue-800 border-none">GET</Badge>
                              <h4 className="font-medium">/history</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              Get moderation history.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium mb-2">Query Parameters</h5>
                                <div className="bg-gray-100 p-3 rounded-md">
                                  <pre className="text-xs font-mono">
                                    {`page: integer (default: 1)
limit: integer (default: 20)
status: string (approved | rejected)
type: string (image | video | text)`}
                                  </pre>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-2">Response</h5>
                                <div className="bg-gray-100 p-3 rounded-md">
                                  <pre className="text-xs font-mono">
                                    {`{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Complete API Documentation
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Rate Limits</CardTitle>
                    <CardDescription>
                      Information about our API rate limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Our API enforces rate limits to ensure fair usage and system stability. Different plans have different rate limits.
                    </p>
                    
                    <div className="border rounded-lg overflow-hidden mb-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plan</TableHead>
                            <TableHead>Requests per Minute</TableHead>
                            <TableHead>Requests per Day</TableHead>
                            <TableHead>Concurrent Requests</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Basic</TableCell>
                            <TableCell>60</TableCell>
                            <TableCell>10,000</TableCell>
                            <TableCell>5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Professional</TableCell>
                            <TableCell>300</TableCell>
                            <TableCell>50,000</TableCell>
                            <TableCell>20</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Enterprise</TableCell>
                            <TableCell>1,000</TableCell>
                            <TableCell>Unlimited</TableCell>
                            <TableCell>50</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription>
                        Rate limit headers are included in API responses. Check the <code className="text-xs bg-yellow-100 px-1 py-0.5 rounded">X-RateLimit-*</code> headers to monitor your usage.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="webhooks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">Webhook Configuration</CardTitle>
                        <CardDescription>
                          Receive real-time notifications when moderation is complete
                        </CardDescription>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Webhook
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Create a New Webhook</DialogTitle>
                            <DialogDescription>
                              Add a webhook URL to receive events from our API
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="webhook-name">Webhook Name</Label>
                              <Input
                                id="webhook-name"
                                placeholder="e.g., Production Webhook"
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="webhook-url">Webhook URL</Label>
                              <Input
                                id="webhook-url"
                                placeholder="https://example.com/webhook"
                              />
                              <p className="text-xs text-gray-500">
                                This is the URL that will receive webhook events
                              </p>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label>Event Types</Label>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Switch id="event-moderation" defaultChecked />
                                  <Label htmlFor="event-moderation">Moderation Complete</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch id="event-policy" />
                                  <Label htmlFor="event-policy">Policy Updates</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch id="event-quota" />
                                  <Label htmlFor="event-quota">Quota Alerts</Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="webhook-secret">Webhook Secret</Label>
                              <div className="relative">
                                <Input
                                  id="webhook-secret"
                                  value="whsec_1234567890abcdef"
                                  readOnly
                                  type={showApiKey ? "text" : "password"}
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                  onClick={() => setShowApiKey(!showApiKey)}
                                >
                                  {showApiKey ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <p className="text-xs text-gray-500">
                                Use this secret to verify webhook signatures
                              </p>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Webhook</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>URL</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Events</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">
                                Production Webhook
                              </TableCell>
                              <TableCell className="font-mono text-xs truncate max-w-[200px]">
                                https://example.com/webhooks/contentmod
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                  Active
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Badge variant="secondary" className="text-xs">Moderation</Badge>
                                  <Badge variant="secondary" className="text-xs">Policy</Badge>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Terminal className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Cog className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Power className="h-4 w-4 text-green-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Development Webhook
                              </TableCell>
                              <TableCell className="font-mono text-xs truncate max-w-[200px]">
                                https://dev.example.com/webhooks/contentmod
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">
                                  Inactive
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Badge variant="secondary" className="text-xs">Moderation</Badge>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Terminal className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Cog className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Power className="h-4 w-4 text-gray-400" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Webhook Implementation Guide</CardTitle>
                    <CardDescription>
                      How to implement webhook handling in your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-2">1. Setting Up a Webhook Endpoint</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Create an endpoint in your application that can receive POST requests from our service.
                        </p>
                        <div className="bg-gray-900 text-gray-50 rounded-lg p-4">
                          <pre className="text-xs font-mono">
                            <code>{`// Sample Express.js webhook handler
app.post('/webhook', express.json(), (req, res) => {
  const event = req.body;
  
  // Verify webhook signature (recommended)
  const signature = req.headers['x-webhook-signature'];
  const isValid = verifySignature(event, signature, WEBHOOK_SECRET);
  
  if (!isValid) {
    return res.status(403).send('Invalid signature');
  }
  
  // Process the webhook event
  if (event.type === 'moderation.complete') {
    // Handle moderation completion
    const { id, result } = event.data;
    console.log(\`Moderation \${id} completed: \${result.approved ? 'approved' : 'rejected'}\`);
    
    // Update your database or take action based on the result
    // ...
  }
  
  // Acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
});`}</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">2. Verifying Webhook Signatures</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          For security, verify that webhooks are actually coming from our service.
                        </p>
                        <div className="bg-gray-900 text-gray-50 rounded-lg p-4">
                          <pre className="text-xs font-mono">
                            <code>{`// Sample signature verification function
function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const expectedSignature = hmac.update(JSON.stringify(payload)).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">3. Webhook Event Types</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Event Type</TableHead>
                                <TableHead>Description</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-mono text-xs">
                                  moderation.complete
                                </TableCell>
                                <TableCell>
                                  Triggered when a moderation request has been completed.
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-mono text-xs">
                                  policy.updated
                                </TableCell>
                                <TableCell>
                                  Triggered when a policy has been updated.
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-mono text-xs">
                                  quota.alert
                                </TableCell>
                                <TableCell>
                                  Triggered when you approach your API usage quota limit.
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      
                      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription>
                          <p>
                            <strong>Testing:</strong> Use our webhook testing tool to send test events to your endpoint.
                          </p>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiSetup;
