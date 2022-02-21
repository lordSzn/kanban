import { Card, Text, Image } from '@geist-ui/core'
import { Link } from 'atomic-router-react'
import React, { FC } from 'react'
import { paths } from '~/shared/lib/paths'
import type { Project } from '../..'

export const ProjectPreview: FC<Partial<Project>> = () => {
  return (
    <Link to={paths.project('2')}>
      <Card width="400px">
        <Image
          draggable={false}
          src="https://img.freepik.com/free-photo/happy-young-female-student-holding-notebooks-from-courses-smiling-camera-standing-spring-clothes-against-blue-background_1258-70161.jpg?size=626&ext=jpg&ga=GA1.2.1449946290.1638748800"
        />
        <Text h4 mb={0}>
          hello world
        </Text>
        <Text type="secondary" small>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odit!
        </Text>
      </Card>
    </Link>
  )
}
