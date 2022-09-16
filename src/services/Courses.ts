import { $api } from '../http'
import { IResponse } from '../models/api'
import { ICourse, ICourseData, IListCourse } from '../models/courses'

export const CoursesService = {
  async fetch() {
    try {
      const res = await $api.get<IListCourse[]>('/courses')
      return { data: res.data }
    } catch (err) {
      return { error: err as object }
    }
  },

  async fetchById(id: ICourse['id']) {
    try {
      const res = await $api.get<ICourse>(`/courses/${id}`)
      return { data: res.data }
    } catch (err) {
      return { error: err as object }
    }
  },

  async create(data: ICourseData) {
    try {
      const res = await $api.post<IResponse<ICourse>>('/courses', data)
      return { data: res.data }
    } catch (err) {
      return { error: err as object }
    }
  },

  async update(id: ICourse['id'], data: ICourseData) {
    try {
      const res = await $api.put<IResponse<ICourse>>(`/courses/${id}`, data)
      return { data: res.data }
    } catch (err) {
      return { error: err as object }
    }
  },

  async delete(id: ICourse['id']) {
    try {
      const res = await $api.delete<IResponse>(`/courses/${id}`)
      return { data: res.data }
    } catch (err) {
      return { error: err as object }
    }
  }
}
