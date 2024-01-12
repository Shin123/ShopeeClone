import { Link } from 'react-router-dom'
import { SvgChevronDownIcon, SvgGlobalIcon, SvgSearchIcon, SvgShopeeIcon, SvgShoppingCart } from 'src/assets/svg'
import Popover from '../Popover'
import { useMutation } from '@tanstack/react-query'
import { logout } from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

const Header = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='pb-5 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
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
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                  <Link
                    to='/profile'
                    className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to='/'
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
              <div>shin nguyen</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='border-r-[1px] border-r-white/40 h-4' />
              <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to='/' className='col-span-2'>
            <SvgShopeeIcon fill='fill-white' />
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                name='search'
                placeholder='QUÀ TẶNG THỜI TRANG MỸ PHẨM'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <SvgSearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm'>
                  <div className='p-2'>
                    <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/75d2e755f39012a3952d507dc0ee9573_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Hạt TEB City cao cấp, grain free dành cho mèo mọi lứa tuổi - Halopetshop
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-orange'>₫270.000</div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/75d2e755f39012a3952d507dc0ee9573_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Hạt TEB City cao cấp, grain free dành cho mèo mọi lứa tuổi - Halopetshop
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-orange'>₫270.000</div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/75d2e755f39012a3952d507dc0ee9573_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Hạt TEB City cao cấp, grain free dành cho mèo mọi lứa tuổi - Halopetshop
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-orange'>₫270.000</div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/75d2e755f39012a3952d507dc0ee9573_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Hạt TEB City cao cấp, grain free dành cho mèo mọi lứa tuổi - Halopetshop
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-orange'>₫270.000</div>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-6 items-center justify-between'>
                      <div className='capitalize text-xs text-gray-500'>Thêm hàng vào giỏ</div>
                      <button className='capitalize bg-orange hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/' className=''>
                <SvgShoppingCart />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
