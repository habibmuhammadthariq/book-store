'use client'
import { useState } from 'react'

const url = 'http://127.0.0.1:8080/categories'
const CreateCategory = () => {
  const [name, setName] = useState<String>('')

  const addPost = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })

      if (res.ok) {
        window.location.href = '/category'
      } else {
        console.log('there is something wrong');
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className='w-full' onSubmit={addPost}>
        <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Add new category</span>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Name</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='text' 
              name='name'
              onChange={(e:any) => setName(e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
          <button type='submit' className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
        </div>
    </form>
  )
}

export default CreateCategory