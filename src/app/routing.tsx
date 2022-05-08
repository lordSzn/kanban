import { createHistoryRouter } from 'atomic-router'
import { Route } from 'atomic-router-react'
import { sample } from 'effector'
import React from 'react'
import { redirectSessionFailure } from '~/entities/session'
import { userEditRoute } from '~/features/user/edit'
import { ProjectPage, WorkspacePage, LoginPage, NotFoundPage, SettingsPage } from '~/pages'
import { paths } from '~/shared/lib/paths'
import { history } from '~/shared/lib/routing-history'

export const routes = [
  { path: paths.workspace(), route: WorkspacePage.workspaceRoute, view: WorkspacePage.Workspace },
  { path: paths.project(':id'), route: ProjectPage.projectRoute, view: ProjectPage.Project },
  { path: paths.login(), route: LoginPage.loginRoute, view: LoginPage.Login },
  { path: paths.notFound(), route: NotFoundPage.notFoundRoute, view: NotFoundPage.NotFound },
  { path: paths.userEdit(), route: userEditRoute, view: SettingsPage.Settings },
]

export const router = createHistoryRouter({
  routes,
})

router.setHistory(history)

sample({
  clock: redirectSessionFailure,
  fn: () => ({}),
  target: LoginPage.loginRoute.open,
})

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: NotFoundPage.notFoundRoute.open,
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
