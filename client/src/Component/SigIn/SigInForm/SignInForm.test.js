import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SigInForm from './SigInForm'
import { Provider } from 'react-redux';
import store from '../../../redux/reducer/store'
import { BrowserRouter } from 'react-router-dom';

describe("<SigInForm />", () => {

    test('render email input', () => {
        render(<BrowserRouter><Provider store={store}><SigInForm /></Provider></BrowserRouter>);

        const inputEl = screen.getByTestId("email-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "email");
    });

    test('pass valid email to test email input field', () => {
        render(<BrowserRouter><Provider store={store}><SigInForm /></Provider></BrowserRouter>);

        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");

        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });


});