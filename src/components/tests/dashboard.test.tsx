import React from 'react';
import { render} from '@testing-library/react';
import { Dashboard } from '../dashboard';

describe('Dashboard', () => {
    it("dashboard", () => {
        const { getByText } = render(<Dashboard/>);


    })
})