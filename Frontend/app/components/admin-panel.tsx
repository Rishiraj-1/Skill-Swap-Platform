"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Search,
  MoreHorizontal,
  Ban,
  Trash2,
  Eye,
  Download,
  FileText,
  Users,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  Bell,
  BarChart3,
} from "lucide-react"
import type { User, Screen, SwapRequest } from "../page"

interface AdminPanelProps {
  onNavigate: (screen: Screen) => void
  currentUser: User | null
  users: User[]
  swapRequests: SwapRequest[]
}

export default function AdminPanel({ onNavigate, currentUser, users, swapRequests }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("users")
  const [userSearch, setUserSearch] = useState("")
  const [userPage, setUserPage] = useState(1)
  const [swapFilter, setSwapFilter] = useState("all")
  const [announcement, setAnnouncement] = useState("")
  const [isLoadingReport, setIsLoadingReport] = useState<string | null>(null)
  const [isSendingAnnouncement, setIsSendingAnnouncement] = useState(false)

  const usersPerPage = 8
  const swapsPerPage = 10

  // Mock admin data - extend users with admin info
  const adminUsers = users.map((user, index) => ({
    ...user,
    email: `${user.name.toLowerCase().replace(" ", ".")}@example.com`,
    role: index === 0 ? "Admin" : "User",
    status: Math.random() > 0.2 ? "Public" : "Private",
    joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    lastActive: `${Math.floor(Math.random() * 30) + 1} days ago`,
  }))

  // Filter users
  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(userSearch.toLowerCase())),
  )

  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage)
  const paginatedUsers = filteredUsers.slice((userPage - 1) * usersPerPage, userPage * usersPerPage)

  // Filter swap requests
  const filteredSwaps = swapFilter === "all" ? swapRequests : swapRequests.filter((swap) => swap.status === swapFilter)

  const handleBanUser = async (userId: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Banned user:", userId)
  }

  const handleDeleteUser = async (userId: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Deleted user:", userId)
  }

  const handleSendAnnouncement = async () => {
    if (!announcement.trim()) return
    setIsSendingAnnouncement(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSendingAnnouncement(false)
    setAnnouncement("")
    // Show success message
    alert("Announcement sent to all users!")
  }

  const handleDownloadReport = async (reportType: string) => {
    setIsLoadingReport(reportType)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoadingReport(null)
    // Simulate download
    console.log(`Downloaded ${reportType} report`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {currentUser?.name}
              </Badge>
              <Button variant="outline" onClick={() => onNavigate("home")}>
                Back to Platform
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Users</p>
                    <p className="text-3xl font-bold text-blue-900">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Active Swaps</p>
                    <p className="text-3xl font-bold text-green-900">
                      {swapRequests.filter((s) => s.status === "accepted").length}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Pending Requests</p>
                    <p className="text-3xl font-bold text-yellow-900">
                      {swapRequests.filter((s) => s.status === "pending").length}
                    </p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Success Rate</p>
                    <p className="text-3xl font-bold text-purple-900">
                      {Math.round(
                        (swapRequests.filter((s) => s.status === "accepted").length / swapRequests.length) * 100,
                      )}
                      %
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="swaps" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                Swap Monitor
              </TabsTrigger>
              <TabsTrigger
                value="announcements"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Bell className="w-4 h-4 mr-2" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                <Download className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-2xl">User Management</CardTitle>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users by name, email, or skills..."
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Skills Offered</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.location}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {user.skillsOffered.slice(0, 2).map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {user.skillsOffered.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{user.skillsOffered.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={user.status === "Public" ? "default" : "secondary"}
                                className={
                                  user.status === "Public" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">{user.joinDate}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => onNavigate("viewUser", user)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Ban className="w-4 h-4 mr-2" />
                                        Ban User
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Ban User</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to ban {user.name}? This action will prevent them from
                                          accessing the platform.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleBanUser(user.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Ban User
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Profile
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Profile</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to permanently delete {user.name}'s profile? This action
                                          cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteUser(user.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Delete Profile
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* User Pagination */}
                  {totalUserPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-6">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setUserPage(Math.max(1, userPage - 1))}
                        disabled={userPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      {Array.from({ length: totalUserPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={userPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setUserPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setUserPage(Math.min(totalUserPages, userPage + 1))}
                        disabled={userPage === totalUserPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Swap Monitor Tab */}
            <TabsContent value="swaps" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-2xl">Swap Request Monitor</CardTitle>
                    <Select value={swapFilter} onValueChange={setSwapFilter}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Swaps</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSwaps.map((swap) => (
                      <motion.div
                        key={swap.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={swap.fromUser.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {swap.fromUser.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{swap.fromUser.name}</span>
                            </div>
                            <span className="text-gray-400">→</span>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={swap.toUser.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {swap.toUser.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{swap.toUser.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {swap.skillOffered}
                              </Badge>
                              <span className="text-sm text-gray-400">↔</span>
                              <Badge variant="outline" className="border-green-200 text-green-700">
                                {swap.skillWanted}
                              </Badge>
                            </div>
                            <Badge
                              variant={
                                swap.status === "accepted"
                                  ? "default"
                                  : swap.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                swap.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : swap.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {swap.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>"{swap.message}"</p>
                          <p className="mt-1 text-xs">Created {swap.createdAt}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Bell className="w-6 h-6 mr-2" />
                    Global Announcement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="announcement" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="announcement"
                      placeholder="Type your announcement message here. This will be shown to all users..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      This message will be displayed to all users on their next login.
                    </p>
                    <Button
                      onClick={handleSendAnnouncement}
                      disabled={!announcement.trim() || isSendingAnnouncement}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isSendingAnnouncement ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Send Announcement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <p className="font-medium">Platform Maintenance Scheduled</p>
                      <p className="text-sm text-gray-600">
                        We'll be performing scheduled maintenance on Sunday, 2:00 AM - 4:00 AM EST.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Sent 2 days ago</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">New Feature: Video Calls</p>
                      <p className="text-sm text-gray-600">
                        You can now schedule video calls directly through the platform for your skill swaps!
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Sent 1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="w-5 h-5 mr-2" />
                      Users Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a comprehensive CSV file containing all user data, including profiles, skills, and
                      activity.
                    </p>
                    <Button
                      onClick={() => handleDownloadReport("users")}
                      disabled={isLoadingReport === "users"}
                      className="w-full"
                    >
                      {isLoadingReport === "users" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download Users CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="w-5 h-5 mr-2" />
                      Swap Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Export detailed logs of all swap requests, including timestamps, status changes, and user
                      interactions.
                    </p>
                    <Button
                      onClick={() => handleDownloadReport("swaps")}
                      disabled={isLoadingReport === "swaps"}
                      className="w-full"
                    >
                      {isLoadingReport === "swaps" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download Swap Logs CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="w-5 h-5 mr-2" />
                      Feedback Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get insights from user feedback, ratings, and reviews to improve the platform experience.
                    </p>
                    <Button
                      onClick={() => handleDownloadReport("feedback")}
                      disabled={isLoadingReport === "feedback"}
                      className="w-full"
                    >
                      {isLoadingReport === "feedback" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download Feedback CSV
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                      <p className="text-sm text-gray-600">Total Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{swapRequests.length}</p>
                      <p className="text-sm text-gray-600">Total Swaps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {users.reduce((acc, user) => acc + user.skillsOffered.length, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Skills Available</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.round(
                          (swapRequests.filter((s) => s.status === "accepted").length / swapRequests.length) * 100,
                        )}
                        %
                      </p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
