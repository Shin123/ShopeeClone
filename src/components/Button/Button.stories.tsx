import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    className: 'red'
  },
  argTypes: {
    isLoading: { description: 'show icon loading' },
    children: { description: 'show text' },
    className: { description: 'class' }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    className: 'flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
  }
}
