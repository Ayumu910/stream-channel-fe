import '@testing-library/jest-dom'
import React, { render, screen } from '@testing-library/react'
import { MyComponent } from '../src/components/MyComponent'

test('「Hello Test」が描画されている', () => {
    render(<MyComponent />)
    screen.debug()
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
})