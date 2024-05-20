import { Link } from 'react-router-dom'
import { SvgSearchIcon, SvgShopeeIcon } from 'src/assets/svg'
import path from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'
import NavHeader from '../NavHeader'

export default function CartHeader() {
  const { onSubmitSeach, register } = useSearchProducts()
  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-orange text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to={path.home} className='flex flex-shrink-0 items-end'>
              <div className='flex items-end'>
                <SvgShopeeIcon />
                <div className='mx-4 h-6 md:h-8 w-[1px] bg-orange'></div>
                <div className='capitalize text-orange md:text-xl'>Giỏ hàng</div>
              </div>
            </Link>
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSeach}>
              <div className='rounded-sm flex border-2 border-orange'>
                <input
                  type='text'
                  placeholder='QUÀ TẶNG THỜI TRANG MỸ PHẨM'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  {...register('name')}
                />
                <button className='rounded-sm py-2 px-8 flex-shrink-0 bg-orange hover:opacity-90'>
                  <SvgSearchIcon />
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
