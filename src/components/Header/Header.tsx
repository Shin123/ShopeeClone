import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import noproduct from 'src/assets/images/no-product.png'
import { SvgSearchIcon, SvgShopeeIcon, SvgShoppingCart } from 'src/assets/svg'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { formatCurrency } from 'src/utils/utils'
import NavHeader from '../NavHeader'
import Popover from '../Popover'

const MAX_PURCHASE = 5

const Header = () => {
  const { isAuthenticated } = useContext(AppContext)
  const { onSubmitSeach, register } = useSearchProducts()

  // when we swap pages by route, Header just re-render , it not unmount - mounting again
  // so query will not inactive => it not re-call ==> don't need set stale
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='pb-5 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <NavHeader />
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
                        <Link
                          to={path.cart}
                          className='capitalize bg-orange hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'
                        >
                          Xem giỏ hàng
                        </Link>
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
