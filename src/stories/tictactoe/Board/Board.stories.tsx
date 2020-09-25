import React from 'react';
import { Board, BoardProps } from './Board';

import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'TicTacToe/Board',
    component: Board,
    argTypes: {
        backgroundColor: { control: 'color' },
        boardLength: { control: 'number' }
    },
    args: {
        boardLength: 3,
        backgroundColor: '#E19EE1'
    },
} as Meta

const Template: Story<BoardProps> = (args) => <Board {...args} />


export const Default = Template.bind({});

export const twoByTwo = Template.bind({});
twoByTwo.args = {
    boardLength: 2,
}
twoByTwo.storyName = '2x2 Board';

export const fourByFour = Template.bind({});
fourByFour.args = {
    boardLength: 4
}
fourByFour.storyName = '4x4 Board';

export const fiveByFive = Template.bind({});
fiveByFive.args = {
    boardLength: 5
}
fiveByFive.storyName = '5x5 Board';