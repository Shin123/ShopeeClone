import { describe, expect, it } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2FjMDQ1YjExNDAwODkzZGY3MTU2NSIsImVtYWlsIjoiZDk5OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0xMlQwNDo1ODo0MC44OTZaIiwiaWF0IjoxNzE4MTY4MzIwLCJleHAiOjE3MTgyNTQ3MjB9.hq3SOeA0xqKZ8QZxSI-yX0Rok1-4D3nHaiqMsiJXFKk'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2FjMDQ1YjExNDAwODkzZGY3MTU2NSIsImVtYWlsIjoiZDk5OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0xMlQwNDo1ODo0MC44OTZaIiwiaWF0IjoxNzE4MTY4MzIwLCJleHAiOjE3MTg3NzMxMjB9.6vWpV_j61NVwIOlDp9Bd1vkNcnbEL2Bbaln1RBZytjM'

const profile =
  '{"_id":"657ac045b11400893df71565","roles":["User"],"email":"d9999@gmail.com","createdAt":"2023-12-14T08:43:49.357Z","updatedAt":"2024-06-10T17:14:48.287Z","__v":0,"address":"dia chifdfdfd","date_of_birth":"2005-12-09T17:00:00.000Z","name":"test 11232323123123123","phone":"123123123123","avatar":"98fc4371-5446-412d-ab7b-05f0f9325e6f.png"}'

describe('setAccessTokenToLS', () => {
  it('access_token set to localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toEqual(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('access_token set to localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

describe('setProfileToLS', () => {
  it('profile set to localStorage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(getProfileFromLS()).toEqual(JSON.parse(profile))
  })
})

describe('clearLS', () => {
  it('clear localStorage', () => {
    setProfileToLS(JSON.parse(profile))
    setRefreshTokenToLS(refresh_token)
    setAccessTokenToLS(access_token)
    clearLS()
    expect(getAccessTokenFromLS()).toEqual('')
  })
})
