import { createEffect } from 'effector'
import { collection, Firestore, getDocs } from 'firebase/firestore'

interface AnswerProjects {
  projectID: string
  title: string
  description: string
  isFinished: false
  photoUrl: string
}

export const loadProjectsFx = createEffect<Firestore, AnswerProjects[], void>({
  handler: async (db) => {
    const projectsColumn = collection(db, 'projects')
    const projectsSnapshots = await getDocs(projectsColumn)

    const projectsList = projectsSnapshots.docs.map((doc) => doc.data())

    return projectsList as AnswerProjects[]
  },
})

interface AnswerTasks {
  projectID: string
  taskID: string
}

export const loadTasksFx = createEffect<Firestore, AnswerTasks[], void>({
  handler: async (db) => {
    const tasksColumn = collection(db, 'tasks')
    const tasksSnapshots = await getDocs(tasksColumn)

    const tasksList = tasksSnapshots.docs.map((doc) => doc.data())

    return tasksList as AnswerTasks[]
  },
})

interface AnswerInfoTasks {
  projectID: string
  taskID: string
}

export const loadInfoTasksFx = createEffect<Firestore, AnswerInfoTasks[], void>(
  {
    handler: async (db) => {
      const tasksInfoColumn = collection(db, 'task-info')
      const tasksInfoSnapshots = await getDocs(tasksInfoColumn)

      const tasksInfoList = tasksInfoSnapshots.docs.map((doc) => doc.data())

      return tasksInfoList as AnswerInfoTasks[]
    },
  }
)

interface AnswerTaskLifecycle {
  projectID: string
  taskID: string
  status: 'idle' | 'take' | 'resolve'
}

export const loadTasksLifecycleFx = createEffect<
  Firestore,
  AnswerTaskLifecycle[],
  void
>({
  handler: async (db) => {
    const tasksLifecycleColumn = collection(db, 'tasksLifecycle')
    const tasksLifecycleSnapshots = await getDocs(tasksLifecycleColumn)

    const tasksLifecycleList = tasksLifecycleSnapshots.docs.map((doc) =>
      doc.data()
    )

    return tasksLifecycleList as AnswerTaskLifecycle[]
  },
})
