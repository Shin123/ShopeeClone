import { Link, useMatch } from 'react-router-dom'
import { SvgShopeeIcon } from 'src/assets/svg'
import path from 'src/constants/path'

export default function RegisterHeader() {
  const registerMatch = useMatch(path.register)
  const isRegister = Boolean(registerMatch)
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>
            <SvgShopeeIcon />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
