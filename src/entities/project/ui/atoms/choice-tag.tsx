import { Select } from '@geist-ui/core'
import React from 'react'

export const ChoiceTag = () => {
  return (
    <Select multiple placeholder="Tags" width="100%" initialValue={['1', '2']}>
      <Select.Option value="1">Epic</Select.Option>
      <Select.Option value="2">Design</Select.Option>
      <Select.Option value="3">Business</Select.Option>
      <Select.Option value="4">Students</Select.Option>
    </Select>
  )
}
