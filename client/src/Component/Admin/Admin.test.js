import { render, screen } from '@testing-library/react'
import Admin from './Admin'

describe('Admin component', () => {
    test('renders buses if request succeeds show All buses ', () => {
        render(<Admin />)

        const tableRow = screen.getAllByRole('row')
        expect(tableRow).not.toHaveLength(0)
    })
})