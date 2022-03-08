import { createHistoryRouter } from 'atomic-router'
import { Route } from 'atomic-router-react'
import { sample } from 'effector'
import React from 'react'
import { NotFoundPage } from '~/pages/error-not-found'
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
  {
    path: paths.NotFound(),
    route: NotFoundPage.NotFoundRoute,
    view: NotFoundPage.NotFound,
  },
]

export const router = createHistoryRouter({
  routes,
})

router.setHistory(history)

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: NotFoundPage.NotFoundRoute.open,
})

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
