import React from 'react';
import renderer from 'react-test-renderer'
import { Header } from '../header';

it('should render header correctly', () => {
    const tree = renderer.create(<Header/>)
    expect(tree).toMatchSnapshot();
})