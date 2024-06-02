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
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 text-white'>
      <div className='container'>
        <NavHeader />
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to={path.home} className='col-span-2'>
            <SvgShopeeIcon fill='h-11 w-full fill-white' />
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSeach}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                placeholder='QUÀ TẶNG THỜI TRANG MỸ PHẨM'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-orange px-6 py-2 hover:opacity-90'>
                <SvgSearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASE).map((purchase) => (
                          <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'>{purchase.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <div className='text-orange'>₫{formatCurrency(purchase.product.price)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASE ? purchasesInCart.length - MAX_PURCHASE : ''} Thêm hàng
                          vào giỏ
                        </div>
                        <Link
                          to={path.cart}
                          className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/' className='relative'>
                <SvgShoppingCart />
                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className='absolute left-[17px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange'>
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
