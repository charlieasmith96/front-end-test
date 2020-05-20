import React from 'react';
import { render, fireEvent, findByText} from '@testing-library/react';
import { Dashboard } from '../dashboard';

describe('Dashboard', () => {
    it("dashboard", () => {
        const { getByText } = render(<Dashboard/>);

        
    })
})