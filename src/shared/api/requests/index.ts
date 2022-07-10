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
import { createRequestFx } from '~/shared/api/requests/request'

export interface Project {
  projectID: string
  title: string
  description: string
  isFinished: boolean
  photoUrl: string
}

export const loadProjectsFx = createRequestFx<void, Project[]>(async (_, uid) => {
  const projectsColumn = collection(getFirestore(), `users/${uid}/projects`)
  const projectsSnapshots = await getDocs(projectsColumn)

  const projectsList = projectsSnapshots.docs.map((doc) => ({
    projectID: doc.id,
    ...doc.data(),
  }))

  return projectsList as Project[]
})

export interface Task {
  title: string
  description: string
  labels?: Array<{ name: string; color: string }>
}

export const loadTasksFx = createRequestFx<void, Record<string, Task>>(async (_, uid) => {
  const tasksColumn = collection(getFirestore(), `users/${uid}/task-info`)
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
})

export const addTaskFx = createRequestFx<Task, string>(async (task, uid) => {
  const column = collection(getFirestore(), `users/${uid}/task-info`)

  const { id } = await addDoc(column, task)

  return id
})

export const removeTaskFx = createRequestFx<{ taskId: string }, void>(async ({ taskId }, uid) => {
  await deleteDoc(doc(getFirestore(), 'task-info', taskId))

  const tasksLifecycleColumn = collection(getFirestore(), `users/${uid}/task-lifecycle`)
  const taskLifecycleQuery = query(tasksLifecycleColumn, where('taskId', '==', taskId))

  const tasks = await getDocs(taskLifecycleQuery)

  const [taskRef] = tasks.docs.map((doc) => doc.ref)

  await deleteDoc(taskRef)
})

export const addTaskToLifecycleFx = createRequestFx<TaskLifecycle, TaskLifecycle>(
  async (taskLifecycle, uid) => {
    const tasksLifecycleColumn = collection(getFirestore(), `users/${uid}/task-lifecycle`)

    await addDoc(tasksLifecycleColumn, taskLifecycle)

    return taskLifecycle
  }
)

export type Status = 'idle' | 'take' | 'resolve'

export interface TaskLifecycle {
  projectID: string
  taskId: string
  status: Status
}

export const loadTasksLifecycleFx = createRequestFx<{ projectID: string }, TaskLifecycle[]>(
  async (params, uid) => {
    const tasksLifecycleColumn = collection(getFirestore(), `users/${uid}/task-lifecycle`)

    const taskLifecycleQuery = query(
      tasksLifecycleColumn,
      where('projectID', '==', params.projectID)
    )

    const boards = await getDocs(taskLifecycleQuery)

    return boards.docs.map((doc) => ({
      projectID: doc.id,
      ...doc.data(),
    })) as TaskLifecycle[]
  }
)

export interface FavoritesProjects {
  documentId: string
  projectId: string
}

export const loadFavoritesProjectsFx = createRequestFx<void, FavoritesProjects[]>(
  async (_, uid) => {
    const FavoritesProjectsColumn = collection(getFirestore(), `users/${uid}/favorites-projects`)
    const FavoritesProjectsSnapshots = await getDocs(FavoritesProjectsColumn)

    return FavoritesProjectsSnapshots.docs.map((doc) => ({
      ...doc.data(),
      documentId: doc.id,
    })) as FavoritesProjects[]
  }
)

export const saveFavoriteProjectFx = createRequestFx<
  { body: { projectId: string } },
  FavoritesProjects
>(async (params, uid) => {
  const { body } = params
  const favoriteColumn = collection(getFirestore(), `users/${uid}/favorites-projects`)

  const doc = await addDoc(favoriteColumn, {
    projectId: body.projectId,
  })

  return {
    projectId: body.projectId,
    documentId: doc.id,
  }
})

export const removeFavoriteProjectFx = createRequestFx<
  { body: { documentId: string; projectId: string } },
  { projectId: string }
>(async (params, uid) => {
  const { body } = params

  await deleteDoc(doc(getFirestore(), `users/${uid}/favorites-projects`, body.documentId))

  return { projectId: body.projectId }
})

export type CreatedProject = Pick<Project, 'title' | 'description'> & { photo: File | null }

export const projectCreateFx = createRequestFx<CreatedProject, Project>(async (params, uid) => {
  const { title, description, photo } = params

  let photoUrl = ''

  if (photo !== null) {
    const storage = getStorage()
    const mountainImagesRef = ref(storage, `projects/${photo.name}`)

    const imageRef = await uploadBytes(mountainImagesRef, photo)
    photoUrl = await getDownloadURL(imageRef.ref)
  }

  const docRef = await addDoc(collection(getFirestore(), `users/${uid}/projects`), {
    title,
    description,
    photoUrl,
    isFinished: false,
  })

  return {
    title,
    description,
    projectID: docRef.id,
    photoUrl,
    isFinished: false,
  }
})

export interface User {
  uid: string
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
      uid: user.uid,
      fullname: user.displayName ?? 'no name',
      email: user.email ?? '',
      photoUrl: user.photoURL ?? '',
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

    const mountainImagesRef = ref(storage, `avatars/${image.name}`)

    const imageRef = await uploadBytes(mountainImagesRef, image)
    const photoUrl = await getDownloadURL(imageRef.ref)

    return { photoUrl }
  },
})
