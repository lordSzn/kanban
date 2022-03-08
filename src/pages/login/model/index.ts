import { checkAuthenticated } from '~/entities/session'
import { WorkspacePage } from '~/pages/workspace'
import { loginRouter } from '../route'

checkAuthenticated({
  when: loginRouter.opened,
  done: WorkspacePage.workspaceRouter.navigate.prepend(() => ({
    params: {},
    query: {},
  })),
})
