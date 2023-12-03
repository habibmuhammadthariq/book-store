'use client'
import { fetcher } from '@/app/libs'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const url = 'http://127.0.0.1:8080/categories'
const UpdateCategory = ({params}: {params:{id:number}}) => {
  const { data : category, isLoading, error } = useSWR(`${url}/${params.id}/books`, fetcher)
  const [name, setName] = useState<String>('')
  
  useEffect(() => {
    if (category) {
      setName(category.name)
    } 
  }, [category, isLoading])
  

  const UpdateCategory = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch(`${url}/${params.id}`, {
        method: 'PATCH',
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

  if (isLoading) return <div><span>Loading...</span></div>
  if (!category) return null
  return (
    <form className='w-full' onSubmit={UpdateCategory}>
        <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Update category</span>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Name</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='text' 
              name='name'
              value={ String(name) }
              onChange={(e:any) => setName(e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
          <button type='submit' className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
        </div>
    </form>
  )
}

export default UpdateCategory