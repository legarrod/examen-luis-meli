import { waitFor } from '@testing-library/react'

export const resolvePromise = async (ml = 0) => {
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, ml)))
}
