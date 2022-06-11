import AboutUs from "./AboutUs";
import { render, screen } from '@testing-library/react'


//group testing suites
describe('aboutUs component', () => {

    test('checking title', () => {
        //Arragne
        render(<AboutUs />)

        //Act
        //....

        //Assert
        const availableTitle = screen.getByText('Benefit from comfortable, low-cost European bus travel')
        expect(availableTitle).toBeInTheDocument();
    })

    test('render "Your Bus Service', () => {
        //Arragne
        render(<AboutUs />)

        //Act
        //....

        //Assert
        const availableTitle = screen.getByText('Your Bus Service')
        expect(availableTitle).toBeInTheDocument();
    })
})
