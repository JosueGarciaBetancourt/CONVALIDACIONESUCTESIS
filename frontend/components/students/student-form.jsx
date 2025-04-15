"use client"

import { useState, useEffect } from "react"

export function StudentForm({ initialData, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    grade: "",
    address: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        age: initialData.age,
        grade: initialData.grade,
        address: initialData.address,
      })
    }
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="grade" className="block text-gray-700 text-sm font-bold mb-2">
          Grade:
        </label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
          Address:
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  )
}
