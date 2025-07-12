"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Star, User, MessageSquare, LogOut, ChevronLeft, ChevronRight, Settings } from "lucide-react"
import type { User as UserType, Screen } from "../page"

interface HomePageProps {
  users: UserType[]
  onNavigate: (screen: Screen, user?: UserType) => void
  isLoggedIn: boolean
  currentUser: UserType | null
  onLogout: () => void
}

export default function HomePage({ users, onNavigate, isLoggedIn, currentUser, onLogout }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAvailability = availabilityFilter === "all" || user.availability === availabilityFilter

    return matchesSearch && matchesAvailability
  })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-blue-600"
            >
              Skill Swap Platform
            </motion.h1>
            <div className="flex items-center space-x-4">
              {isLoggedIn && (
                <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="hidden sm:flex">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Swap Requests
                </Button>
              )}
              {isLoggedIn && currentUser?.name === "John Doe" && (
                <Button variant="ghost" onClick={() => onNavigate("admin")} className="hidden sm:flex">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isLoggedIn && currentUser ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {currentUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem onClick={() => onNavigate("profile")}>Edit Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onNavigate("dashboard")} className="sm:hidden">
                        Swap Requests
                      </DropdownMenuItem>
                      {isLoggedIn && currentUser?.name === "John Doe" && (
                        <DropdownMenuItem onClick={() => onNavigate("admin")}>Admin Panel</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={onLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => onNavigate("login")}>Login</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search skills (e.g., Photoshop)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="Weekends">Weekends</SelectItem>
              <SelectItem value="Evenings">Evenings</SelectItem>
              <SelectItem value="Weekdays">Weekdays</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* User Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {paginatedUsers.map((user) => (
            <motion.div key={user.id} variants={cardVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                      <Avatar className="w-16 h-16 ring-2 ring-blue-100">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors"
                        onClick={() => onNavigate("viewUser", user)}
                      >
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600">{user.location}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{user.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills Offered:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.skillsOffered.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            {skill}
                          </Badge>
                        ))}
                        {user.skillsOffered.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{user.skillsOffered.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills Wanted:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.skillsWanted.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {user.skillsWanted.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.skillsWanted.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {user.availability}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => onNavigate("viewUser", user)}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
