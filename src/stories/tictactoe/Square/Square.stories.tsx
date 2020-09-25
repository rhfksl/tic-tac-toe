import React from 'react';

import { RowSquare, SquareProps } from './Square';

import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'TicTacToe/Square',
    component: RowSquare,
    argTypes: {
        row: { control: 'array' },
        rowIdx: { control: 'number' },
        size: { control: 'text' },
        backgroundColor: { control: 'color' },
        buttonColor: { control: 'color' },
    },
    args: {
        row: [null, 'X', 'O'],
        rowIdx: 0,
        size: '150px',
        backgroundColor: '#a3daff',
        buttonColor: '#1ec0ff',
        clickBoard: (step: number)=>{ console.log(step) },
    }
} as Meta;

const Template: Story<SquareProps> = (args) => <RowSquare {...args} />

export const Default = Template.bind({});

export const Green = Template.bind({});
Green.args = {
    backgroundColor: '#9DC8C8',
    buttonColor: '#58C9B9', 
}

export const Purple = Template.bind({});
Purple.args = {
    backgroundColor: '#D499B9',
    buttonColor: '#9055A2', 
}

export const Yellow = Template.bind({});
Yellow.args = {
    backgroundColor: '#FBFFB9',
    buttonColor: '#FDD692',
}

export const Blue = Template.bind({});
Blue.args = {
    backgroundColor: '#a3daff',
    buttonColor: '#1ec0ff',
}

export const Small = Template.bind({});
Small.args = {
    size: '100px'
}

export const Medium = Template.bind({});
Medium.args = {
    size: '150px',
}

export const Large = Template.bind({});
Large.args = {
    size: '200px',
}