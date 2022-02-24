import { createEffect } from 'effector'
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from 'firebase/firestore'

export interface Project {
  projectID: string
  title: string
  description: string
  isFinished: boolean
  photoUrl: string
}

export const loadProjectsFx = createEffect<Firestore, Project[], void>({
  handler: async (db) => {
    const projectsColumn = collection(db, 'projects')
    const projectsSnapshots = await getDocs(projectsColumn)

    const projectsList = projectsSnapshots.docs.map((doc) => ({
      projectID: doc.id,
      ...doc.data(),
    }))

    return projectsList as Project[]
  },
})

export interface Task {
  taskID: string
  projectID: string
}

export const loadTasksFx = createEffect<Firestore, Task[], void>({
  handler: async (db) => {
    const tasksColumn = collection(db, 'tasks')
    const tasksSnapshots = await getDocs(tasksColumn)

    const tasksList = tasksSnapshots.docs.map((doc) => doc.data())

    return tasksList as Task[]
  },
})

export interface TaskInfo {
  projectID: string
  taskID: string
}

export const loadInfoTasksFx = createEffect<Firestore, TaskInfo[], void>({
  handler: async (db) => {
    const tasksInfoColumn = collection(db, 'task-info')
    const tasksInfoSnapshots = await getDocs(tasksInfoColumn)

    const tasksInfoList = tasksInfoSnapshots.docs.map((doc) => doc.data())

    return tasksInfoList as TaskInfo[]
  },
})

export type Status = 'idle' | 'take' | 'resolve'

export interface TaskLifecycle {
  projectID: string
  taskID: string
  status: Status
}

export const loadTasksLifecycleFx = createEffect<
  Firestore,
  TaskLifecycle[],
  void
>({
  handler: async (db) => {
    const tasksLifecycleColumn = collection(db, 'tasksLifecycle')
    const tasksLifecycleSnapshots = await getDocs(tasksLifecycleColumn)

    const tasksLifecycleList = tasksLifecycleSnapshots.docs.map((doc) =>
      doc.data()
    )

    return tasksLifecycleList as TaskLifecycle[]
  },
})

export interface FavoritesProjects {
  projectID: string
}

export const loadFavoritesProjectsFx = createEffect<
  Firestore,
  FavoritesProjects[],
  void
>({
  handler: async (db) => {
    const FavoritesProjectsColumn = collection(db, 'favorites-projects')
    const FavoritesProjectsSnapshots = await getDocs(FavoritesProjectsColumn)

    const FavoritesProjectsList = FavoritesProjectsSnapshots.docs.map((doc) =>
      doc.data()
    )

    return FavoritesProjectsList as FavoritesProjects[]
  },
})

export type CreatedProject = Pick<Project, 'title' | 'description'>

export const projectCreateFx = createEffect<CreatedProject, Project, void>({
  handler: async ({ title, description }) => {
    const docRef = await addDoc(collection(getFirestore(), 'projects'), {
      title,
      description,
      photoUrl: '',
      isFinished: false,
    })

    const createdProject = {
      title,
      description,
      projectID: docRef.id,
      photoUrl: '',
      isFinished: false,
    }

    return createdProject
  },
})

export const saveFavoriteProjectFx = createEffect<
  { favoriteID: string },
  FavoritesProjects,
  void
>({
  handler: async ({ favoriteID }) => {
    const favoriteColumn = collection(getFirestore(), 'favorites-projects')

    await addDoc(favoriteColumn, {
      projectID: favoriteID,
    })

    return {
      projectID: favoriteID,
    }
  },
})
