import React from 'react';
import { TicTacToe } from './TicTacToe';

import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'TicTacToe/TicTacToe',
    component: TicTacToe,
} as Meta;

const Template: Story<{}> = (args) => <TicTacToe {...args} />;

export const Default = Template.bind({});
