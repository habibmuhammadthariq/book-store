import Link from "next/link"

const ViewCategory = (params: any) => {
  return (
    <tr>
      <td className="w-10 border border-slate-300 text-center">{ params.id }</td>
      <td className="border border-slate-300">{ params.name }</td>
      <td className="border border-slate-300">{ params.createdAt }</td>
      <td className='w-52 border border-slate-300'>
        <span onClick={()=>params.delCategory(params.id)} className='bg-red-500 p-2 inline-block text-white text-sm'>Delete</span>
        <Link href={`/category/edit/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>Edit</Link>
        <Link href={`/category/read/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>View</Link>
      </td>
    </tr>
  )
}

export default ViewCategory