import { makeAutoObservable, runInAction } from 'mobx'
import { ICourse, ICourseData, IListCourse } from '../models/courses'
import { ISimpleState } from '../models/state'
import { CoursesService } from '../services/Courses'

export const CoursesStore = makeAutoObservable({
  list: {
    data: [] as IListCourse[],
    state: 'unset' as ISimpleState,
    postState: 'unset' as ISimpleState
  },
  course: {
    data: null as ICourse | null,
    state: 'unset' as ISimpleState,
    updateState: 'unset' as ISimpleState
  },

  async fetch() {
    this.list.state = 'loading'
    const res = await CoursesService.fetch()
    runInAction(() => {
      if (res.error) {
        this.list.state = 'error'
      } else {
        this.list.data = res.data
        this.list.state = 'success'
      }
    })
    return res
  },

  async fetchById(id: ICourse['id']) {
    this.course.state = 'loading'
    const res = await CoursesService.fetchById(id)
    runInAction(() => {
      if (res.error) {
        this.course.state = 'error'
      } else {
        this.course.data = res.data
        this.course.state = 'success'
      }
    })
    return res
  },

  async create(data: ICourseData) {
    this.list.postState = 'loading'
    const res = await CoursesService.create(data)
    runInAction(() => {
      if (res.error) {
        this.list.postState = 'error'
      } else {
        this.list.postState = 'success'
      }
    })
    return res
  },

  async update(id: ICourse['id'], data: ICourseData) {
    this.course.updateState = 'loading'
    const res = await CoursesService.update(id, data)
    runInAction(() => {
      if (res.error) {
        this.course.updateState = 'error'
      } else {
        this.course.data = res.data.data
        this.course.updateState = 'success'
      }
    })
    return res
  },

  async delete(id: ICourse['id']) {
    this.course.updateState = 'loading'
    const res = await CoursesService.delete(id)
    runInAction(() => {
      if (res.error) {
        this.course.updateState = 'error'
      } else {
        this.course.data = null
        this.course.updateState = 'success'
      }
    })
    return res
  }
})
