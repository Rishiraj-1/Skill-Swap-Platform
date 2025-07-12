"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, MapPin, MessageSquare, Calendar } from "lucide-react"
import type { User, Screen } from "../page"

interface ViewUserPageProps {
  user: User | null
  currentUser: User | null
  onNavigate: (screen: Screen, user?: User) => void
  isLoggedIn: boolean
}

export default function ViewUserPage({ user, currentUser, onNavigate, isLoggedIn }: ViewUserPageProps) {
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="text-gray-500 text-lg">User not found</p>
          <Button onClick={() => onNavigate("home")} className="mt-4">
            Go Back Home
          </Button>
        </motion.div>
      </div>
    )
  }

  const handleRequest = () => {
    if (isLoggedIn) {
      onNavigate("swapRequest", user)
    }
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
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-blue-600">User Profile</h1>
            </div>
            <Button
              onClick={handleRequest}
              disabled={!isLoggedIn || user.id === currentUser?.id}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Request Swap
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <motion.div variants={itemVariants} className="flex items-center space-x-6">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Avatar className="w-32 h-32 ring-4 ring-blue-100">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-3">{user.name}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      <span className="font-medium">{user.rating}/5</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {user.availability}
                      </Badge>
                    </div>
                  </div>
                  {user.bio && <p className="text-gray-700 mt-4 leading-relaxed">{user.bio}</p>}
                </div>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Skills Offered */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                  Skills Offered
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.skillsOffered.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary" className="text-sm py-2 px-4 bg-blue-100 text-blue-800">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Skills Wanted */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-2 h-6 bg-green-600 rounded-full mr-3"></span>
                  Skills Wanted
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.skillsWanted.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="outline" className="text-sm py-2 px-4 border-green-200 text-green-700">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Rating and Feedback */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></span>
                  Reviews & Feedback
                </h3>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.floor(user.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-3 text-lg font-semibold">{user.rating}/5</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "Excellent teacher and mentor! Very patient and knowledgeable about {user.skillsOffered[0]}. The
                      sessions were well-structured and I learned so much. Highly recommend for anyone looking to
                      improve their skills."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">- Previous swap partner</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-3 text-lg font-semibold">4.0/5</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "Great communication and very professional. The skill exchange was exactly what I needed to
                      advance my knowledge in {user.skillsOffered[1] || user.skillsOffered[0]}."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">- Another satisfied learner</p>
                  </motion.div>
                </div>
              </motion.div>

              {!isLoggedIn && (
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
                    <p className="text-yellow-800 font-medium">Please log in to send a swap request to this user.</p>
                  </div>
                </motion.div>
              )}

              {isLoggedIn && user.id === currentUser?.id && (
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                    <p className="text-blue-800 font-medium">
                      This is your profile. You can edit it from the profile page.
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
