"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, X } from "lucide-react"
import type { User, Screen, SwapRequest } from "../page"

interface SwapRequestFormProps {
  targetUser: User | null
  currentUser: User | null
  onNavigate: (screen: Screen, user?: User) => void
  onSubmitRequest: (request: Omit<SwapRequest, "id" | "createdAt">) => void
}

export default function SwapRequestForm({
  targetUser,
  currentUser,
  onNavigate,
  onSubmitRequest,
}: SwapRequestFormProps) {
  const [mySkill, setMySkill] = useState("")
  const [theirSkill, setTheirSkill] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!targetUser || !currentUser) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mySkill || !theirSkill || !message.trim()) return

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const request: Omit<SwapRequest, "id" | "createdAt"> = {
      fromUser: currentUser,
      toUser: targetUser,
      skillOffered: mySkill,
      skillWanted: theirSkill,
      message: message.trim(),
      status: "pending",
    }

    onSubmitRequest(request)
    setIsSubmitting(false)
    onNavigate("dashboard")
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
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("viewUser", targetUser)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-blue-600 ml-4">Send Swap Request</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <motion.div variants={itemVariants}>
                <CardTitle className="text-2xl mb-4">Send a Swap Request</CardTitle>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={targetUser.avatar || "/placeholder.svg"} alt={targetUser.name} />
                    <AvatarFallback>
                      {targetUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{targetUser.name}</h3>
                    <p className="text-gray-600">{targetUser.location}</p>
                  </div>
                </div>
              </motion.div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* My Skill Selection */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label className="text-base font-medium">Your Skill to Offer</Label>
                  <Select value={mySkill} onValueChange={setMySkill} required>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select one of your skills to offer" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentUser.skillsOffered.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Choose a skill you can teach or help with</p>
                </motion.div>

                {/* Their Skill Selection */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label className="text-base font-medium">Skill You Want to Learn</Label>
                  <Select value={theirSkill} onValueChange={setTheirSkill} required>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select a skill you want to learn from them" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetUser.skillsOffered.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="border-green-200 text-green-700">
                              {skill}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Choose what you'd like to learn from {targetUser.name}</p>
                </motion.div>

                {/* Skill Exchange Preview */}
                {mySkill && theirSkill && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    variants={itemVariants}
                    className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
                  >
                    <h4 className="font-medium text-gray-800 mb-2">Skill Exchange Preview:</h4>
                    <div className="flex items-center justify-center space-x-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                        You offer: {mySkill}
                      </Badge>
                      <span className="text-2xl">↔</span>
                      <Badge variant="outline" className="border-green-200 text-green-700 px-3 py-1">
                        You learn: {theirSkill}
                      </Badge>
                    </div>
                  </motion.div>
                )}

                {/* Message */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="message" className="text-base font-medium">
                    Personal Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={`Hi ${targetUser.name}! I'd love to exchange skills with you. I can help you with ${mySkill || "[your skill]"} and would really appreciate learning ${theirSkill || "[their skill]"} from you. Let me know if you're interested!`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500">Introduce yourself and explain why you'd like to swap skills</p>
                </motion.div>

                {/* Submit Buttons */}
                <motion.div variants={itemVariants} className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onNavigate("viewUser", targetUser)}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!mySkill || !theirSkill || !message.trim() || isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Send Request
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
