import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { beforeAll, describe, expect, it } from 'vitest'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError, isAxiosUnprocessableEntityError } from '../utils'

describe('isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError return boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

describe('isAxiosUnauthorizedError', () => {
  it('isAxiosUnauthorizedError return boolean', () => {
    expect(isAxiosUnauthorizedError(new Error())).toBe(false)
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

describe('isAxiosExpiredTokenError', () => {
  const axiosErrorMockTrue = new AxiosError(undefined, undefined, undefined, undefined, {
    status: HttpStatusCode.Unauthorized,
    data: { data: { name: 'EXPIRED_TOKEN' } }
  } as any)

  const axiosErrorMockFail = new AxiosError(undefined, undefined, undefined, undefined, {
    status: HttpStatusCode.InternalServerError,
    data: { data: { name: 'EXPIRED_TOKEN' } }
  } as any)

  beforeAll(() => {})
  it('isAxiosExpiredTokenError return boolean', () => {
    expect(isAxiosExpiredTokenError(new Error())).toBe(false)
    expect(isAxiosUnauthorizedError(axiosErrorMockTrue)).toBe(true)
    expect(
      isAxiosUnauthorizedError(axiosErrorMockTrue) &&
        (axiosErrorMockTrue.response?.data as any).data?.name === 'EXPIRED_TOKEN'
    ).toEqual(true)
    expect(
      isAxiosUnauthorizedError(axiosErrorMockFail) &&
        (axiosErrorMockTrue.response?.data as any).data?.name === 'EXPIRED_TOKEN'
    ).toEqual(false)
    expect(
      isAxiosUnauthorizedError(axiosErrorMockFail) &&
        (axiosErrorMockTrue.response?.data as any).data?.name === 'EXPIRED'
    ).toEqual(false)
  })
})
