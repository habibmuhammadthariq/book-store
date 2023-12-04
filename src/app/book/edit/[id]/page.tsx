'use client'
import { fetcher } from '@/app/libs'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const url = 'http://127.0.0.1:8080/books'
const UpdateBook = ({params}: {params:{id:number}}) => {
  const { data : book, isLoading, error } = useSWR(`${url}/${params.id}`, fetcher)
  const [title, setTitle] = useState<String>('')
  const [description, setDescription] = useState<String>('')
  const [image_url, setImageUrl] = useState<String>('')
  const [release_year, setReleaseYear] = useState<number>()
  const [price, setPrice] = useState<String>('')
  const [total_page, setTotalPage] = useState<number>()
  const [category_id, setCategoryId] = useState<number>()
  
  useEffect(() => {
    if (book) {
      console.log(book);
      
      setTitle(book.title)
      setDescription(book.description)
      setImageUrl(book.image_url)
      setReleaseYear(book.release_year)
      setPrice(book.price)
      setTotalPage(book.total_page)
      setCategoryId(book.category_id)
    } 
  }, [book, isLoading])
  

  const UpdateBook = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch(`${url}/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, image_url, release_year, price, total_page })
      })

      if (res.ok) {
        window.location.href = '/book'
      } else {
        console.log('there is something wrong');
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <div><span>Loading...</span></div>
  if (!book) return null
  return (
    <form className='w-full' onSubmit={UpdateBook}>
        <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Update book</span>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Title</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='text' 
              name='title'
              value={ String(title) }
              onChange={(e:any) => setTitle(e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Description</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='text' 
              name='description'
              value={ String(description) }
              onChange={(e:any) => setDescription(e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Image URL</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='text' 
              name='image_url'
              value={ String(image_url) }
              onChange={(e:any) => setImageUrl(e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Release Year</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='number' 
              name='release_year'
              value={ release_year }
              onChange={(e:any) => setReleaseYear(+e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Price</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='text' 
              name='price'
              value={ String(price) }
              onChange={(e:any) => setPrice(e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Total Page</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='number' 
              name='total_page'
              value={ total_page }
              onChange={(e:any) => setTotalPage(+e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Total Page</label>
             <input 
              className='w-full border-[1px] border-gray-200 p-2 rounded-sm' 
              type='number' 
              name='category_id'
              value={ category_id }
              onChange={(e:any) => setCategoryId(+e.target.value)}
              />
        </div>
        <div className='w-full py-2'>
          <button type='submit' className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
        </div>
    </form>
  )
}

export default UpdateBook