"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function GetInvolved() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")

    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demonstration purposes, we'll randomly succeed or fail
      if (Math.random() > 0.5) {
        throw new Error("Something went wrong")
      }

      setSuccessMessage("Thank you for your interest! We'll be in touch soon.")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setErrorMessage("Oops! There was an error submitting your form. Please try again.")
    }
  }

  return (
    <section id="get-involved" className="py-15">
      <div className="container px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12">
            Join us in our vibrant events and sharing culture now.
            <br className="hidden sm:inline" />
            We'll connect with you soon- just leave your email to get started!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-sm mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-9 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-9 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full text-sm"
              rows={3}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 h-9 text-sm">
            Submit
          </Button>
        </motion.form>

        {successMessage && (
          <motion.div
            className="text-green-600 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            className="text-red-600 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </div>
    </section>
  )
}

