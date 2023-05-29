import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getStudents } from 'apis/students.api'
import { useQueryString } from 'utils/utils'
import { Fragment } from 'react'
import classNames from 'classnames'

const LIMIT = 10
export default function Students() {
  const queryString = useQueryString()
  const page = Number(queryString.page) || 1

  const { data, isLoading } = useQuery({
    queryKey: ['students', page],
    queryFn: () => getStudents(page, 10),
    keepPreviousData: true
  })

  const totalStudentCount = Number(data?.headers['x-total-count'] || 0)

  const totalPage = Math.ceil(totalStudentCount / LIMIT)

  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <div className='mt-4'>
        <Link
          className='mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          to={'/students/add'}
        >
          Add new
        </Link>
      </div>
      {isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          <div className='mb-4 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='h-10 rounded bg-gray-200' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}

      {!isLoading && (
        <Fragment>
          <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    #
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Avatar
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Email
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='sr-only'>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((student) => (
                  <tr key={student.id} className='border-b bg-white hover:bg-gray-50'>
                    <td className='py-4 px-6'>{student.id}</td>
                    <td className='py-4 px-6'>
                      <img src={student.avatar} alt='student' className='h-5 w-5' />
                    </td>
                    <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                      {student.last_name}
                    </th>
                    <td className='py-4 px-6'>{student.email}</td>
                    <td className='py-4 px-6 text-right'>
                      <Link
                        to={`/students/${student.id}`}
                        className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Edit
                      </Link>
                      <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-6 flex justify-center'>
            <nav aria-label='Page navigation example'>
              <ul className='inline-flex -space-x-px'>
                <li>
                  {page === 1 ? (
                    <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '>
                      Previous
                    </span>
                  ) : (
                    <Link
                      className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '
                      to={`/students?page=${page - 1}`}
                    >
                      Previous
                    </Link>
                  )}
                </li>
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1
                    const isActive = page === pageNumber

                    return (
                      <li key={pageNumber}>
                        <Link
                          className={classNames(
                            'border border-gray-300 py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                            {
                              'bg-gray-100 text-gray-700': isActive,
                              'bg-white': !isActive
                            }
                          )}
                          to={`/students?page=${pageNumber}`}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    )
                  })}
                <li>
                  {page === totalPage ? (
                    <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
                      Next
                    </span>
                  ) : (
                    <Link
                      className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      to={`/students?page=${page + 1}`}
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </Fragment>
      )}
    </div>
  )
}
