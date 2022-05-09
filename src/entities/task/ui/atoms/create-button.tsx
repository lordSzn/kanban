import { Button } from '@geist-ui/core'
import { Plus } from '@geist-ui/icons'
import React from 'react'
import { showTaskForm } from '~/entities/task'

export const Create = () => {
  return <Button type="abort" onClick={() => showTaskForm()} auto icon={<Plus size={28} />} />
}
