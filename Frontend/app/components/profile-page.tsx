"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, ArrowLeft } from "lucide-react"

interface ProfilePageProps {
  onNavigate: (page: string) => void
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [name, setName] = useState("John Doe")
  const [location, setLocation] = useState("San Francisco, CA")
  const [skillsOffered, setSkillsOffered] = useState(["React", "JavaScript", "Node.js"])
  const [skillsWanted, setSkillsWanted] = useState(["UI Design", "Photoshop"])
  const [availability, setAvailability] = useState("weekends")
  const [isPublic, setIsPublic] = useState(true)
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()])
      setNewSkillOffered("")
    }
  }

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
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

  const handleSave = () => {
    // Save logic here
    onNavigate("home")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-blue-600">Edit Profile</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => onNavigate("home")}>
                Discard
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            {/* Skills Offered */}
            <div className="space-y-3">
              <Label>Skills Offered</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skillsOffered.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeSkillOffered(index)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you can offer"
                  value={newSkillOffered}
                  onChange={(e) => setNewSkillOffered(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
                />
                <Button type="button" size="icon" onClick={addSkillOffered}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="space-y-3">
              <Label>Skills Wanted</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skillsWanted.map((skill, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSkillWanted(index)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you want to learn"
                  value={newSkillWanted}
                  onChange={(e) => setNewSkillWanted(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkillWanted()}
                />
                <Button type="button" size="icon" onClick={addSkillWanted}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Profile Visibility */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-gray-600">Make your profile visible to other users</p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
