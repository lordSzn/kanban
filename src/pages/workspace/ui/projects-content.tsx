import { Loading } from '@geist-ui/core'
import React, { FC } from 'react'
import { Project } from '~/entities/project'
import { ProjectList } from '~/entities/project/ui'

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
