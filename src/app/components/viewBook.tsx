import Link from "next/link"

const ViewBook = (params: any) => {
  return (
    <tr>
      <td className="w-10 border border-slate-300 text-center">{ params.id }</td>
      <td className="border border-slate-300">{ params.title }</td>
      <td className="border border-slate-300">{ params.description }</td>
      <td className="border border-slate-300">{ params.image_url }</td>
      <td className="border border-slate-300">{ params.release_year }</td>
      <td className="border border-slate-300">{ params.price }</td>
      <td className="border border-slate-300">{ params.total_page }</td>
      <td className="border border-slate-300">{ params.createdAt }</td>
      <td className='w-52 border border-slate-300'>
        <span onClick={()=>params.delBook(params.id)} className='bg-red-500 p-2 inline-block text-white text-sm'>Delete</span>
        <Link href={`/book/edit/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>Edit</Link>
      </td>
    </tr>
  )
}

export default ViewBook