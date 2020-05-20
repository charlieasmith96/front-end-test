import React from 'react';
import { LegendItem } from '../legend-item';
import { render, fireEvent, findByText} from '@testing-library/react';

describe('Header', () => {
    it("logout button should fire logout event", () => {
        const { getByText } = render(<LegendItem colour="blue" label="test-label"/>);
        expect(getByText("test-label")).toBeInTheDocument();
    }
)
})