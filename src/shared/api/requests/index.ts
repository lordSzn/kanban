import { createEffect } from 'effector'
import {
  AuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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

export const loadProjectsFx = createEffect<void, Project[], void>({
  handler: async () => {
    const projectsColumn = collection(getFirestore(), 'projects')
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

export const loadTasksFx = createEffect<void, Task[], void>({
  handler: async () => {
    const tasksColumn = collection(getFirestore(), 'tasks')
    const tasksSnapshots = await getDocs(tasksColumn)

    const tasksList = tasksSnapshots.docs.map((doc) => doc.data())

    return tasksList as Task[]
  },
})

export interface TaskInfo {
  projectID: string
  taskID: string
}

export const loadInfoTasksFx = createEffect<void, TaskInfo[], void>({
  handler: async () => {
    const tasksInfoColumn = collection(getFirestore(), 'task-info')
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
  handler: async () => {
    const tasksLifecycleColumn = collection(getFirestore(), 'tasksLifecycle')
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
  void,
  FavoritesProjects[],
  void
>({
  handler: async () => {
    const FavoritesProjectsColumn = collection(
      getFirestore(),
      'favorites-projects'
    )
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

export const removeFavoriteProjectFx = createEffect<
  { favoriteID: string },
  void,
  void
>({
  handler: async ({ favoriteID }) => {
    await deleteDoc(doc(getFirestore(), 'favorites-projects', favoriteID))
  },
})

export interface User {
  fullname: string
  email?: string | null
  photoUrl?: string
  description?: string
}

export const baseAuthenticateFx = createEffect<
  { provider: AuthProvider },
  User
>({
  handler: async ({ provider }) => {
    const auth = getAuth()
    const answer: UserCredential = await signInWithPopup(auth, provider)
    const user = answer.user

    return {
      fullname: user.displayName || 'unknown',
      email: user.email,
      photoUrl: user.photoURL || '',
    }
  },
})
