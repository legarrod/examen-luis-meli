/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import fetchMock from 'jest-fetch-mock'
import { mockGetHomeProducts } from '../mocks/mocksHome'

beforeEach(() => {
  fetchMock.enableMocks()
})

describe('renders home', () => {
  it('should render and identify message, only home', async () => {
    fetchMock.mockResponse(JSON.stringify(mockGetHomeProducts))
    const { getAllByRole } = render(await Page())
    const enlaces = getAllByRole('link')
    let enlaceBuscado = {}
    enlaces.forEach((enlace) => {
      if (enlace.href === 'libro-tecnico-consultas-power-query-excel-365-2021-MLA1131352790') {
        enlaceBuscado = enlace
      }
    })
    expect(enlaceBuscado).toBeDefined()
    expect(screen.getByText(/Aún no hay resultados de búsqueda/i))
  })
})
