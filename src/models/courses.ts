export interface IListCourse {
  id: number
  title: string
  startingDate: string
  finishingDate: string
}

export interface ICourse extends IListCourse {
  description: string
}

export type ICourseData = Omit<ICourse, 'id'>
