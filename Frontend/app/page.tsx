"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import HomePage from "./components/home-page"
import LoginPage from "./components/login-page"
import UserProfile from "./components/user-profile"
import ViewUserPage from "./components/view-user-page"
import SwapRequestForm from "./components/swap-request-form"
import SwapDashboard from "./components/swap-dashboard"
import AdminPanel from "./components/admin-panel"

export type Screen = "home" | "login" | "profile" | "viewUser" | "swapRequest" | "dashboard" | "admin"

export interface User {
  id: number
  name: string
  avatar: string
  skillsOffered: string[]
  skillsWanted: string[]
  availability: string
  rating: number
  location: string
  bio?: string
}

export interface SwapRequest {
  id: number
  fromUser: User
  toUser: User
  skillOffered: string
  skillWanted: string
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function SkillSwapPlatform() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([])

  // Initialize mock data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Marc Demo",
        avatar: "/placeholder.svg?height=80&width=80",
        skillsOffered: ["Photoshop", "UI Design", "Branding"],
        skillsWanted: ["React", "Node.js"],
        availability: "Weekends",
        rating: 4.2,
        location: "San Francisco, CA",
        bio: "Passionate designer with 5+ years of experience in digital design and branding.",
      },
      {
        id: 2,
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=80&width=80",
        skillsOffered: ["React", "JavaScript", "TypeScript"],
        skillsWanted: ["UI Design", "Figma"],
        availability: "Evenings",
        rating: 4.8,
        location: "New York, NY",
        bio: "Full-stack developer who loves creating beautiful and functional web applications.",
      },
      {
        id: 3,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=80&width=80",
        skillsOffered: ["Python", "Data Analysis", "Machine Learning"],
        skillsWanted: ["Web Design", "CSS"],
        availability: "Weekdays",
        rating: 4.5,
        location: "Austin, TX",
        bio: "Data scientist with a passion for turning data into actionable insights.",
      },
      {
        id: 4,
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=80&width=80",
        skillsOffered: ["Content Writing", "SEO", "Marketing"],
        skillsWanted: ["Video Editing", "Animation"],
        availability: "Weekends",
        rating: 4.1,
        location: "Los Angeles, CA",
        bio: "Marketing specialist who helps businesses grow through strategic content and SEO.",
      },
    ]

    const mockCurrentUser: User = {
      id: 5,
      name: "John Doe",
      avatar: "/placeholder.svg?height=80&width=80",
      skillsOffered: ["React", "Node.js", "MongoDB"],
      skillsWanted: ["UI Design", "Photoshop"],
      availability: "Evenings",
      rating: 4.3,
      location: "Seattle, WA",
      bio: "Full-stack developer passionate about creating amazing user experiences.",
    }

    const mockSwapRequests: SwapRequest[] = [
      {
        id: 1,
        fromUser: mockUsers[1],
        toUser: mockCurrentUser,
        skillOffered: "React",
        skillWanted: "UI Design",
        message: "Hi! I'd love to help you with React in exchange for some UI Design training.",
        status: "pending",
        createdAt: "2 days ago",
      },
      {
        id: 2,
        fromUser: mockUsers[2],
        toUser: mockCurrentUser,
        skillOffered: "Python",
        skillWanted: "Node.js",
        message: "Looking forward to learning Node.js from you!",
        status: "accepted",
        createdAt: "1 week ago",
      },
      {
        id: 3,
        fromUser: mockUsers[3],
        toUser: mockCurrentUser,
        skillOffered: "Content Writing",
        skillWanted: "React",
        message: "Would love to trade content writing skills for React help.",
        status: "rejected",
        createdAt: "3 days ago",
      },
    ]

    setUsers(mockUsers)
    setCurrentUser(mockCurrentUser)
    setSwapRequests(mockSwapRequests)
  }, [])

  const navigate = (screen: Screen, user?: User) => {
    setCurrentScreen(screen)
    if (user) setSelectedUser(user)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate("home")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate("login")
  }

  const addSwapRequest = (request: Omit<SwapRequest, "id" | "createdAt">) => {
    const newRequest: SwapRequest = {
      ...request,
      id: swapRequests.length + 1,
      createdAt: "Just now",
    }
    setSwapRequests([newRequest, ...swapRequests])
  }

  const updateSwapRequestStatus = (id: number, status: "accepted" | "rejected") => {
    setSwapRequests(swapRequests.map((request) => (request.id === id ? { ...request, status } : request)))
  }

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={navigate} />
      case "home":
        return (
          <HomePage
            users={users}
            onNavigate={navigate}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )
      case "profile":
        return <UserProfile currentUser={currentUser} onNavigate={navigate} onUpdateUser={setCurrentUser} />
      case "viewUser":
        return (
          <ViewUserPage user={selectedUser} currentUser={currentUser} onNavigate={navigate} isLoggedIn={isLoggedIn} />
        )
      case "swapRequest":
        return (
          <SwapRequestForm
            targetUser={selectedUser}
            currentUser={currentUser}
            onNavigate={navigate}
            onSubmitRequest={addSwapRequest}
          />
        )
        
      case "dashboard":
        return (
          <SwapDashboard
            swapRequests={swapRequests}
            currentUser={currentUser}
            onNavigate={navigate}
            onUpdateRequestStatus={updateSwapRequestStatus}
          />
        )
      case "admin":
        return <AdminPanel onNavigate={navigate} currentUser={currentUser} users={users} swapRequests={swapRequests} />
      default:
        return (
          <HomePage
            users={users}
            onNavigate={navigate}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
