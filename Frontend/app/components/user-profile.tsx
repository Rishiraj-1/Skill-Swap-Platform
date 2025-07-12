"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Upload, ArrowLeft, Save, RotateCcw } from "lucide-react"
import type { User, Screen } from "../page"

interface UserProfileProps {
  currentUser: User | null
  onNavigate: (screen: Screen) => void
  onUpdateUser: (user: User) => void
}

export default function UserProfile({ currentUser, onNavigate, onUpdateUser }: UserProfileProps) {
  const [name, setName] = useState(currentUser?.name || "")
  const [location, setLocation] = useState(currentUser?.location || "")
  const [bio, setBio] = useState(currentUser?.bio || "")
  const [skillsOffered, setSkillsOffered] = useState(currentUser?.skillsOffered || [])
  const [skillsWanted, setSkillsWanted] = useState(currentUser?.skillsWanted || [])
  const [availability, setAvailability] = useState(currentUser?.availability || "Weekends")
  const [isPublic, setIsPublic] = useState(true)
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !skillsOffered.includes(newSkillOffered.trim())) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()])
      setNewSkillOffered("")
    }
  }

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !skillsWanted.includes(newSkillWanted.trim())) {
      setSkillsWanted([...skillsWanted, newSkillWanted.trim()])
      setNewSkillWanted("")
    }
  }

  const removeSkillOffered = (index: number) => {
    setSkillsOffered(skillsOffered.filter((_, i) => i !== index))
  }

  const removeSkillWanted = (index: number) => {
    setSkillsWanted(skillsWanted.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!currentUser) return

    setIsSaving(true)

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser: User = {
      ...currentUser,
      name,
      location,
      bio,
      skillsOffered,
      skillsWanted,
      availability,
    }

    onUpdateUser(updatedUser)
    setIsSaving(false)
    onNavigate("home")
  }

  const handleDiscard = () => {
    setName(currentUser?.name || "")
    setLocation(currentUser?.location || "")
    setBio(currentUser?.bio || "")
    setSkillsOffered(currentUser?.skillsOffered || [])
    setSkillsWanted(currentUser?.skillsWanted || [])
    setAvailability(currentUser?.availability || "Weekends")
    onNavigate("home")
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
              <h1 className="text-xl font-bold text-blue-600">Edit Profile</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleDiscard}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Discard
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Profile Photo */}
              <motion.div variants={itemVariants} className="flex items-center space-x-6">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                    <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <Button variant="outline" size="sm" className="mb-2 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </motion.div>

              {/* Basic Info */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell others about yourself and your experience..."
                  rows={3}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              {/* Skills Offered */}
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-lg font-semibold">Skills Offered</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsOffered.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1"
                      >
                        {skill}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => removeSkillOffered(index)}
                        />
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you can offer"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="button" size="icon" onClick={addSkillOffered} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Skills Wanted */}
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-lg font-semibold">Skills Wanted</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsWanted.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
                        {skill}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => removeSkillWanted(index)}
                        />
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you want to learn"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkillWanted()}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="button" size="icon" onClick={addSkillWanted} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label>Availability</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekends">Weekends</SelectItem>
                    <SelectItem value="Evenings">Evenings</SelectItem>
                    <SelectItem value="Weekdays">Weekdays</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Profile Visibility */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="space-y-1">
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
