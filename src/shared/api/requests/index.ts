import { createEffect } from 'effector'
import {
  AuthProvider,
  getAuth,
  signInWithPopup,
  updateEmail,
  updateProfile,
  UserCredential,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

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
  title: string
  description: string
  label: string[]
}

export const loadTasksFx = createEffect<void, Record<string, Task>, void>({
  handler: async () => {
    const tasksColumn = collection(getFirestore(), 'task-info')
    const tasksSnapshots = await getDocs(tasksColumn)

    const tasks: Record<string, Task> = {}

    const tasksList = tasksSnapshots.docs.map((doc) => ({
      taskId: doc.id,
      ...doc.data(),
    })) as Array<Task & { taskId: string }>

    for (const task of tasksList) {
      const { taskId, ...meta } = task
      tasks[taskId] = { ...meta }
    }

    return tasks
  },
})

export const addTaskFx = createEffect<Task, string>({
  handler: async (task) => {
    const column = collection(getFirestore(), 'task-info')

    const { id } = await addDoc(column, task)

    return id
  },
})

export const addTaskToLifecycleFx = createEffect<TaskLifecycle, TaskLifecycle>({
  handler: async (taskLifecycle) => {
    const tasksLifecycleColumn = collection(getFirestore(), 'task-lifecycle')

    await addDoc(tasksLifecycleColumn, taskLifecycle)

    return taskLifecycle
  },
})

export type Status = 'idle' | 'take' | 'resolve'

export interface TaskLifecycle {
  projectID: string
  taskId: string
  status: Status
}

export const loadTasksLifecycleFx = createEffect<{ projectID: string }, TaskLifecycle[], void>({
  handler: async ({ projectID }) => {
    const tasksLifecycleColumn = collection(getFirestore(), 'task-lifecycle')
    const taskLifecycle = query(tasksLifecycleColumn, where('projectID', '==', projectID))

    const boards = await getDocs(taskLifecycle)

    return boards.docs.map((doc) => ({
      projectID: doc.id,
      ...doc.data(),
    })) as TaskLifecycle[]
  },
})

export interface FavoritesProjects {
  projectID: string
  id: string
}

export const loadFavoritesProjectsFx = createEffect<void, FavoritesProjects[], void>({
  handler: async () => {
    const FavoritesProjectsColumn = collection(getFirestore(), 'favorites-projects')
    const FavoritesProjectsSnapshots = await getDocs(FavoritesProjectsColumn)

    const FavoritesProjectsList = FavoritesProjectsSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return FavoritesProjectsList as FavoritesProjects[]
  },
})

export const saveFavoriteProjectFx = createEffect<{ favoriteID: string }, FavoritesProjects, void>({
  handler: async ({ favoriteID }) => {
    const favoriteColumn = collection(getFirestore(), 'favorites-projects')

    await addDoc(favoriteColumn, {
      projectID: favoriteID,
    })

    return {
      projectID: favoriteID,
      id: favoriteColumn.id,
    }
  },
})

export const removeFavoriteProjectFx = createEffect<
  { docId: string; projectId: string },
  { projectId: string },
  void
>({
  handler: async ({ docId, projectId }) => {
    await deleteDoc(doc(getFirestore(), 'favorites-projects', docId))

    return {
      projectId,
    }
  },
})

export type CreatedProject = Pick<Project, 'title' | 'description'> & { image: File }

export const projectCreateFx = createEffect<CreatedProject, Project, void>({
  handler: async ({ title, description, image }) => {
    const storage = getStorage()
    const mountainImagesRef = ref(storage, `projects/${image.name}`)

    const imageRef = await uploadBytes(mountainImagesRef, image)
    const photoUrl = await getDownloadURL(imageRef.ref)

    const docRef = await addDoc(collection(getFirestore(), 'projects'), {
      title,
      description,
      photoUrl,
      isFinished: false,
    })

    const createdProject = {
      title,
      description,
      projectID: docRef.id,
      photoUrl,
      isFinished: false,
    }

    return createdProject
  },
})

export interface User {
  fullname: string
  email?: string
  photoUrl?: string
  description?: string
}

export const baseAuthenticateFx = createEffect<{ provider: AuthProvider }, User>({
  handler: async ({ provider }) => {
    const auth = getAuth()
    const answer: UserCredential = await signInWithPopup(auth, provider)
    const user = answer.user

    return {
      fullname: user.displayName || 'unknown',
      email: user.email || '',
      photoUrl: user.photoURL || '',
    }
  },
})

export const updateUserEmailFx = createEffect<{ changedEmail: string }, { newEmail: string }>({
  handler: async ({ changedEmail }) => {
    const user = getAuth().currentUser

    if (user == null) throw 'user is null'

    await updateEmail(user, changedEmail)

    return {
      newEmail: changedEmail,
    }
  },
})

interface UpdatedUserProfile {
  fullname: string
  photoUrl?: string
  description?: string
}

export const updateUserProfileFx = createEffect<UpdatedUserProfile, UpdatedUserProfile>({
  handler: async ({ fullname, photoUrl }) => {
    const user = getAuth().currentUser

    if (user == null) throw 'user is null'

    await updateProfile(user, {
      displayName: fullname,
      photoURL: photoUrl,
    })

    return {
      fullname,
      photoUrl,
    }
  },
})

export const uploadAvatarProfileFx = createEffect<{ image: File }, { photoUrl: string }>({
  handler: async ({ image }) => {
    const storage = getStorage()
    const mountainImagesRef = ref(storage, `projects/${image.name}`)

    const imageRef = await uploadBytes(mountainImagesRef, image)
    const photoUrl = await getDownloadURL(imageRef.ref)

    return { photoUrl }
  },
})
