import { checkAuthenticated } from '~/entities/session'
import { WorkspacePage } from '~/pages/workspace'
import { loginRoute } from '../route'

checkAuthenticated({
  when: loginRoute.opened,
  done: WorkspacePage.workspaceRouter.navigate.prepend(() => ({
    params: {},
    query: {},
  })),
})
