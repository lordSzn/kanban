import { Loading } from '@geist-ui/core'
import React, { FC } from 'react'
import { ProjectList } from '~/entities/project/ui'
import type { Project } from '~/shared/api/internal'

interface Props {
  loading: boolean
  projects: Project[]
}

export const ProjectsContent: FC<Props> = ({ loading, projects }) => {
  return (
    <>
      {loading ? (
        <Loading>Loading</Loading>
      ) : (
        <ProjectList projects={projects} />
      )}
    </>
  )
}
