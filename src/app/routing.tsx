import { createHistoryRouter } from 'atomic-router'
import { Route } from 'atomic-router-react'
import React from 'react'
import { paths } from '~/shared/lib/paths'
import { history } from '~/shared/lib/routing-history'
import { ProjectPage, WorkspacePage, LoginPage } from '../pages'

export const routes = [
  {
    path: paths.workspace(),
    route: WorkspacePage.workspaceRouter,
    view: WorkspacePage.Workspace,
  },
  {
    path: paths.project(':id'),
    route: ProjectPage.projectRouter,
    view: ProjectPage.Project,
  },
  {
    path: paths.login(),
    route: LoginPage.loginRouter,
    view: LoginPage.Login,
  },
]

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
