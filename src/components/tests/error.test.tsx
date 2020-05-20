import React from 'react';
import { Error } from '../error';
import { render, fireEvent, findByText} from '@testing-library/react';

describe('Error', () => {
    it("should render error message", () => {
        const { getByText } = render(<Error errorMessage={"test-error"}/>);

        expect(getByText("test-error")).toBeInTheDocument();
    }
)
})