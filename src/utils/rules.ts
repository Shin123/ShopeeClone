import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không đúng định dạng' },
    maxLength: {
      value: 160,
      message: 'Độ tài tư 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: { value: true, message: 'Password là bắt buộc' },
    maxLength: {
      value: 160,
      message: 'Độ tài tư 6 - 160 ky tỳ'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: { value: true, message: 'Confirm Password là bắt buộc' },
    maxLength: {
      value: 160,
      message: 'Độ tài tư 6 - 160 ky tỳ'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm Password không khớp'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_min) <= Number(price_max)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ tài tư 5 - 160 ký tự')
    .max(160, 'Độ tài tư 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(5, 'Độ dài tử 6 - 160 ký tự')
    .max(160, 'Độ dài tử 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Confirm Password là bắt buộc')
    .min(5, 'Độ dài tử 6 - 160 ký tự')
    .max(160, 'Độ dài tử 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Confirm Password không khớp'),
  price_min: yup.string().defined().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().defined().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export type Schema = yup.InferType<typeof schema>
