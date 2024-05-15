import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { SvgChevronDownIcon, SvgGlobalIcon, SvgSearchIcon, SvgShopeeIcon, SvgShoppingCart } from 'src/assets/svg'
import Popover from '../Popover'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import noproduct from 'src/assets/images/no-product.png'
import { formatCurrency } from 'src/utils/utils'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])
const MAX_PURCHASE = 5

const Header = () => {
  const queryConfig = useQueryConfig()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { name: '' },
    resolver: yupResolver(nameSchema)
  })
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  // when we swap pages by route, Header just re-render , it not unmount - mounting again
  // so query will not inactive => it not re-call ==> don't need set stale
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const onSubmitSeach = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return (
    <div className='pb-5 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
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
        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to={path.home} className='col-span-2'>
            <SvgShopeeIcon fill='h-11 w-full fill-white' />
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSeach}>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                placeholder='QUÀ TẶNG THỜI TRANG MỸ PHẨM'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                {...register('name')}
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
                  {purchasesInCart ? (
                    <div className='p-2'>
                      <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASE).map((purchase) => (
                          <div className='mt-2 py-2 flex hover:bg-gray-100' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='w-11 h-11 object-cover'
                              />
                            </div>
                            <div className='flex-grow ml-2 overflow-hidden'>
                              <div className='truncate'>{purchase.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <div className='text-orange'>₫{formatCurrency(purchase.product.price)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='flex mt-6 items-center justify-between'>
                        <div className='capitalize text-xs text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASE ? purchasesInCart.length - MAX_PURCHASE : ''} Thêm hàng
                          vào giỏ
                        </div>
                        <button className='capitalize bg-orange hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'>
                          Xem giỏ hàng
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col h-[300px] w-[300px] items-center justify-center p-2'>
                      <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/' className='relative'>
                <SvgShoppingCart />
                {purchasesInCart && (
                  <span className='absolute top-[-5px] left-[17px] rounded-full px-[9px] py-[1px] text-orange bg-white text-xs'>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
