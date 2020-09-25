import React from 'react';
import { Sample } from './Sample';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'test',
    component: Sample,
} as Meta

const Template: Story<any> = (args) => <Sample {...args} />;
export const Default = Template.bind({});
Default.args = {
    size: 100
}
