import { Button, Divider, Spacer, Text } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import {
  $email,
  $fullname,
  $photo,
  $userName,
  emailChanged,
  fullnameChanged,
  pageMounted,
  userNameChanged,
} from '../../model'
import { ControlField } from '../atoms'
import { UserUploadImage } from '../molecules'

export const UserEditForm = () => {
  const fullname = useStore($fullname)
  const userName = useStore($userName)
  const photo = useStore($photo)
  const email = useStore($email)

  useEffect(() => {
    pageMounted()
  }, [])

  return (
    <form>
      <Text h2 mb={0.7}>
        Profile
      </Text>
      <Divider mb={3.7} />
      <UserUploadImage src={photo} />
      <Spacer h={1.8} />
      <ControlField
        htmlType="text"
        label="Fullname"
        value={fullname}
        placeholder="fullname"
        onChange={(e) => fullnameChanged(e.target.value)}
      />
      <Spacer h={1} />
      <ControlField
        htmlType="text"
        label="Username"
        value={userName}
        placeholder="username"
        onChange={(e) => userNameChanged(e.target.value)}
      />
      <Spacer h={1} />
      <ControlField
        htmlType="email"
        label="Email"
        value={email}
        placeholder="email"
        onChange={(e) => emailChanged(e.target.value)}
      />
      <Spacer h={1.42} />
      <Button auto scale={0.967} type="success">
        Submit
      </Button>
    </form>
  )
}
