import React, { useContext } from 'react'
import Popover from '../Popover'
import { SvgChevronDownIcon, SvgGlobalIcon } from 'src/assets/svg'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center py-1 hover:text-white/70 cursor-pointer'
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm'>
            <div className='flex flex-col py-2 pr-28 pl-3'>
              <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
              <button className='py-2 px-3 hover:text-orange'>Tiếng Anh</button>
            </div>
          </div>
        }
      >
        <SvgGlobalIcon />
        <span className='mx-1'>Tiếng Việt</span>
        <SvgChevronDownIcon />
      </Popover>
      {isAuthenticated && (
        <Popover
          className='flex items-center py-1 hover:text-white/70 cursor-pointer ml-6'
          renderPopover={
            <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
              <Link
                to={path.profile}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={path.home}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block py-4 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='w-6 h-6 mr-2 flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/444719ee5032cadc69705e89dc221ded_tn'
              alt='avatar'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] border-r-white/40 h-4' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
