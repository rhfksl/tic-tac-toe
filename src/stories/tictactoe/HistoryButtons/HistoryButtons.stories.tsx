import React from 'react';
import { HistoryButtons, HistoryButtonsProps } from './HistoryButtons';
import { Center } from './Center';

import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'TicTacToe/HistoryButtons',
    component: HistoryButtons,
    argTypes: {
        backgroundColor: { control: 'color' },
        color: { control: 'color' },
        fontSize: { control: 'range' },
    },
    args: {
        histories: [ [[null, null, null], [null, null, null], [null, null, null]] ],
        jumpHistory: (step: number)=>{alert(`this is ${step} step`)},
        backgroundColor: 'black',
        color: 'white',
        size: 'medium',
        fontSize: '14px',
    },
} as Meta

const Template: Story<HistoryButtonsProps> = (args) => <Center><HistoryButtons {...args} /></Center>;

export const Default = Template.bind({});

export const TwoSteps = Template.bind({});
TwoSteps.args = {
    histories: [ [[null, null, null], [null, null, null], [null, null, null]],
                 [['X', null, null], [null, null, null], [null, null, null]],
               ]
}

export const ThreeSteps = Template.bind({});
ThreeSteps.args = {
    histories: [ [[null, null, null], [null, null, null], [null, null, null]],
                 [['X', null, null], [null, null, null], [null, null, null]],
                 [['X', 'O', null], [null, null, null], [null, null, null]],
               ]
}

export const Small = Template.bind({});
Small.args = {
    size: 'small',
}

export const Medium = Template.bind({});
Medium.args = {
    size: 'medium',
}

export const Large = Template.bind({});
Large.args = {
    size: 'large'
}