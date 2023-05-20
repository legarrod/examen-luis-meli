/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import fetchMock from 'jest-fetch-mock'
import { mochGetHomeProducts } from '../mocks/mocksHome'

beforeEach(() => {
  fetchMock.enableMocks()
})

describe('renders MyComponent', () => {
  it('should render without crashing', async () => {
    // ...(setup mocks)
    fetchMock.mockResponse(JSON.stringify(mochGetHomeProducts))
    render(await Page())
    expect(screen.getByText(/Libro Consultas/i))
  })
})
