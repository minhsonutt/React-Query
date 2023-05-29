import { Students, Student } from 'types/student.type'
import http from 'utils/http'

//get
export const getStudents = (page: number | string, limit: number | string) =>
  http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })

//add
export const addStudent = (student: Omit<Student, 'id'>) => http.post<Student>('/students', student)
