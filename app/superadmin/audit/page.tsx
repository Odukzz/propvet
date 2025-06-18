'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { SuperAdminDashboardSidebar } from "@/components/dashboard/superadmin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Search,
  Download,
  Filter,
  Activity,
  Shield,
  Users,
  CreditCard,
  Settings,
  Database,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  description: string;
  ipAddress: string;
  details?: Record<string, unknown>;
}

// --- MOCK AUDIT LOGS DATA ---
const mockAuditLogs: AuditLog[] = [
  {
    id: "log-001",
    timestamp: "2023-05-15 09:30:45",
    user: "admin@example.com",
    action: "user_created",
    category: "user_management",
    severity: "success",
    description: "Created new user account for jane.doe@example.com",
    ipAddress: "192.168.1.100",
    details: {
      user_id: "usr-789",
      permissions: ["read", "write"]
    }
  },
  {
    id: "log-002",
    timestamp: "2023-05-15 10:15:22",
    user: "system",
    action: "database_backup",
    category: "system",
    severity: "info",
    description: "Completed nightly database backup",
    ipAddress: "127.0.0.1",
    details: {
      backup_size: "2.5GB",
      duration: "15m 22s"
    }
  },
  {
    id: "log-003",
    timestamp: "2023-05-15 11:05:33",
    user: "admin@example.com",
    action: "payment_processed",
    category: "payment",
    severity: "success",
    description: "Processed subscription payment for customer_123",
    ipAddress: "192.168.1.100",
    details: {
      amount: "$29.99",
      payment_method: "credit_card"
    }
  },
  {
    id: "log-004",
    timestamp: "2023-05-15 14:30:12",
    user: "jane.doe@example.com",
    action: "login_failed",
    category: "authentication",
    severity: "warning",
    description: "Failed login attempt",
    ipAddress: "203.0.113.42",
    details: {
      reason: "invalid_password",
      attempts: 3
    }
  },
  {
    id: "log-005",
    timestamp: "2023-05-15 16:45:18",
    user: "system",
    action: "api_rate_limit",
    category: "system",
    severity: "error",
    description: "API rate limit exceeded for IP 203.0.113.42",
    ipAddress: "203.0.113.42",
    details: {
      endpoint: "/api/users",
      requests: "120/100"
    }
  }
]

export default function AuditLogs() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")

  // Redirect unauthorized user
  if (!isAuthenticated || user?.role !== 'super_admin') {
    router.push('/login')
    return null
  }

  // Filter logs based on search and filters
  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesUser = userFilter === "all" || log.user === userFilter
    return matchesSearch && matchesCategory && matchesSeverity && matchesUser
  })

  // Icon helper based on log category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_management': return <Users className="h-4 w-4" />
      case 'verification': return <Shield className="h-4 w-4" />
      case 'payment': return <CreditCard className="h-4 w-4" />
      case 'subscription': return <CreditCard className="h-4 w-4" />
      case 'system': return <Database className="h-4 w-4" />
      case 'authentication': return <Shield className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  // Icon helper based on severity
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'error': return <XCircle className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  // Color class based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'warning': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20'
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
    }
  }

  // Color class based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user_management': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
      case 'verification': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'payment': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'subscription': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20'
      case 'system': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
      case 'authentication': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  // Handle export (future feature)
  const handleExportLogs = () => {
    console.log('Exporting audit logs...')
    // TODO: Implement file download (e.g., JSON or CSV)
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `audit-logs-${new Date().toISOString()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const uniqueUsers = [...new Set(mockAuditLogs.map(log => log.user))]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar with no logo expected */}
      <SuperAdminDashboardSidebar />

      <div className="lg:pl-64">
        <div className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6">
          <h1 className="text-lg font-semibold">Audit Logs</h1>
          <Button onClick={handleExportLogs} className="bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" /> Export Logs
          </Button>
        </div>

        <main className="p-6">
          {/* Filters Section */}
          <Card className="p-6 mb-6">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="user_management">User Management</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger><SelectValue placeholder="User" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setSeverityFilter("all")
                setUserFilter("all")
              }}>
                <Filter className="h-4 w-4 mr-2" /> Clear
              </Button>
            </div>
          </Card>

          {/* Logs Display Section */}
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={cn("flex items-center gap-1", getSeverityColor(log.severity))}>
                        {getSeverityIcon(log.severity)} <span className="capitalize">{log.severity}</span>
                      </Badge>
                      <Badge variant="outline" className={cn("flex items-center gap-1", getCategoryColor(log.category))}>
                        {getCategoryIcon(log.category)} <span className="capitalize">{log.category.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      <p>{log.timestamp}</p>
                      <p>ID: {log.id}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{log.description}</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div><span className="font-medium">User:</span> {log.user}</div>
                    <div><span className="font-medium">Action:</span> {log.action.replace('_', ' ')}</div>
                    <div><span className="font-medium">IP Address:</span> {log.ipAddress}</div>
                  </div>

                  {log.details && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Additional Details:</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        {Object.entries(log.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                            <span className="font-medium">
                              {Array.isArray(value) ? value.join(', ') : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No audit logs found matching your criteria.</p>
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setSeverityFilter("all")
                  setUserFilter("all")
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}