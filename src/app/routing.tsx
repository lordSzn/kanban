import { createHistoryRouter } from 'atomic-router'
import { Route } from 'atomic-router-react'
import { createBrowserHistory } from 'history'
import React from 'react'
import { ProjectPage, WorkspacePage } from '../pages'

export const routes = [
  {
    path: '/',
    route: WorkspacePage.workspaceRouter,
    view: WorkspacePage.Workspace,
  },
  {
    path: '/project',
    route: ProjectPage.projectRouter,
    view: ProjectPage.Project,
  },
]

export const history = createBrowserHistory()

export const router = createHistoryRouter({
  routes,
})

router.setHistory(history)

export const Pages = () => {
  return (
    <>
      {routes.map((config, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Route key={idx} route={config.route} view={config.view} />
      ))}
    </>
  )
}
