"use client"

import { FormEvent } from "react"

export default function GGPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault() // Prevents the default form submission behavior
    
    const formData = new FormData(e.currentTarget) // Extracts form data

    // Get specific values from the form data
    const name = formData.get("name") // Gets the value from the 'name' input
    const age = formData.get("age") // Gets the value from the 'age' input
    const file = formData.get("file") as File // Gets the file from the 'file' input

    console.log({ name, age, file })
    console.log(file.name)
    console.log(file.type)
  }

  return (
    <div>
      <form className="flex items-center flex-col space-y-2" onSubmit={handleSubmit}>
        <div className="space-x-2">
          <label>name</label>
          <input type="text" name="name"/>
        </div>
        <div className="space-x-2">
          <label>age</label>
          <input type="text" name="age"/>
        </div>
        <div className="space-x-2 pl-28">
          <label>file</label>
          <input type="file" name="file"/>
        </div>
        <button className="bg-slate-500 rounded-sm p-1" type="submit">Submit</button>
      </form>
    </div>
  )
}