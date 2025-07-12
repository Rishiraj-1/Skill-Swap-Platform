"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  ArrowLeft,
  Check,
  X,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { User as UserType, Screen, SwapRequest } from "../page"

interface SwapDashboardProps {
  swapRequests: SwapRequest[]
  currentUser: UserType | null
  onNavigate: (screen: Screen) => void
  onUpdateRequestStatus: (id: number, status: "accepted" | "rejected") => void
}

export default function SwapDashboard({
  swapRequests,
  currentUser,
  onNavigate,
  onUpdateRequestStatus,
}: SwapDashboardProps) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const requestsPerPage = 5

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAccept = async (requestId: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onUpdateRequestStatus(requestId, "accepted")
  }

  const handleReject = async (requestId: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onUpdateRequestStatus(requestId, "rejected")
  }

  const filteredRequests =
    statusFilter === "all" ? swapRequests : swapRequests.filter((req) => req.status === statusFilter)

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage)
  const startIndex = (currentPage - 1) * requestsPerPage
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + requestsPerPage)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-blue-600">Swap Requests</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate("home")}>
                Home
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onNavigate("profile")}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-800">
                {swapRequests.filter((r) => r.status === "pending").length}
              </div>
              <div className="text-sm text-yellow-600">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-800">
                {swapRequests.filter((r) => r.status === "accepted").length}
              </div>
              <div className="text-sm text-green-600">Accepted</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-800">
                {swapRequests.filter((r) => r.status === "rejected").length}
              </div>
              <div className="text-sm text-red-600">Rejected</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">{swapRequests.length}</div>
              <div className="text-sm text-blue-600">Total</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                All Requests
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                Pending
              </TabsTrigger>
              <TabsTrigger value="accepted" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Accepted
              </TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Rejected
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Request Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 mb-8">
          <AnimatePresence mode="popLayout">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <motion.div
                  key={request.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                          <Avatar className="w-14 h-14 ring-2 ring-blue-100">
                            <AvatarImage
                              src={request.fromUser.avatar || "/placeholder.svg"}
                              alt={request.fromUser.name}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {request.fromUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{request.fromUser.name}</h3>
                              <p className="text-sm text-gray-500">{request.createdAt}</p>
                            </div>
                            <Badge className={`${getStatusColor(request.status)} flex items-center gap-1 px-3 py-1`}>
                              {getStatusIcon(request.status)}
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                                {request.skillOffered}
                              </Badge>
                              <span className="text-xl font-bold text-gray-400">↔</span>
                              <Badge variant="outline" className="border-green-200 text-green-700 px-3 py-1">
                                {request.skillWanted}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 leading-relaxed">{request.message}</p>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">From: {request.fromUser.location}</div>

                            {request.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleAccept(request.id)}
                                  className="bg-green-600 hover:bg-green-700 transition-colors"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReject(request.id)}
                                  className="border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}

                            {request.status === "accepted" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-500 mb-4">
                  {statusFilter === "all"
                    ? "You don't have any swap requests yet."
                    : `No ${statusFilter} requests found.`}
                </p>
                <Button onClick={() => onNavigate("home")} className="bg-blue-600 hover:bg-blue-700">
                  Browse Users
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center space-x-2"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
