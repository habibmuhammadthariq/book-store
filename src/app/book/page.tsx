'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '../libs'
import ViewBook from '../components/viewBook'
import { useSearchParams } from 'next/navigation'

const url = 'http://127.0.0.1:8080/books'
const Books = () => {
  let query = ''
  const queryParams = useSearchParams()
  Array.from(queryParams.entries()).forEach(([key, value], index) => {
    if (index === 0) query += `?${key}=${value}`
    else query += `&${key}=${value}`
  })

  const [books, setBooks] = useState([])
  const { data, error, isLoading } = useSWR(url+query, fetcher)
  useEffect(() => {
    if (data) {
      setBooks(data)
    }
  }, [data, isLoading])
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  const deleteBook = async (id: number) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setBooks(books?.filter((book: any) => { return book.id !== id }))
    }
  }

  const getNewUrl = (params: string) => {
    return ''
  }
  return (
    <>
      <div className="w-full max-w-7xl m-auto">
        <Link href={`/book/create`} className="bg-green-500 p-2 inline-block text-white">Create</Link>
        <Link href={getNewUrl('minPage')}></Link>
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr className="text-center">
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">Title</th>
            <th className="border border-slate-300">Description</th>
            <th className="border border-slate-300">Image URL</th>
            <th className="border border-slate-300">Release Year</th>
            <th className="border border-slate-300">Price</th>
            <th className="border border-slate-300">Total Page</th>
            <th className="border border-slate-300">Created At</th>
            <th className="border border-slate-300">Action</th>
          </tr>
        </thead>
        <tbody>
           <tr>
              <td colSpan={5}>
              </td>
           </tr>
           {
              books && books.map((item: any)=><ViewBook {...item} delBook = {deleteBook} />) //  
           }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Books