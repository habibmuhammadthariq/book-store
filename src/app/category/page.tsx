'use client'

import React, { useState, useEffect } from 'react'
import ViewCategory from '../components/viewCategory'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '../libs'

const url = 'http://127.0.0.1:8080/categories'
const Category = () => {
  const [categories, setCategories] = useState([])
  const { data, error, isLoading } = useSWR(url, fetcher)
  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  }, [data, isLoading])
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  const deleteCategory = async (id: number) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setCategories(categories?.filter((category: any) => { return category.id !== id }))
    }
  }
  return (
    <>
      <div className="w-full max-w-7xl m-auto">

      <Link href={`/category/create`} className="bg-green-500 p-2 inline-block text-white">Create</Link>
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr className="text-center">
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">Name</th>
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
              // categories && categories.map((item: any)=><ViewCategory key={item.id} {...item} deletePost = {delete_Post} />) 
              categories && categories.map((item: any)=><ViewCategory {...item} delCategory = {deleteCategory} />) //  
           }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Category