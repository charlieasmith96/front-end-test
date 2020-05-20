import React from 'react';
import renderer from 'react-test-renderer'
import { Error } from '../error';

it('should render header correctly', () => {
    const tree = renderer.create(<Error errorMessage="test-message"/>)
    expect(tree).toMatchSnapshot();
})