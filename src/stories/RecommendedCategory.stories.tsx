import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import RecommendedCategory from '../components/category/RecommendedCategory';

const meta: Meta<typeof RecommendedCategory> = {
  title: 'Category/RecommendedCategory',
  component: RecommendedCategory,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecommendedCategory>;

export const Default: Story = {
  args: {
    categoryId: "1",
    categoryName: "New Category",
    streamerIcons: [
      "https://yt3.ggpht.com/ytc/AIdro_kFidnsDf0Cykf4XfN68vBVO7igoqN9F-1HhnNQpkH_wg=s88-c-k-c0x00ffffff-no-rj",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/stylishnoob4-profile_image-08271f11296c16df-300x300.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/a4977cfd-1962-41ec-9355-ab2611b97552-profile_image-300x300.png",
      "https://yt3.ggpht.com/ytc/AIdro_nz_YqOPL-tjH-xdt2z4IgN1D8OCg4nRWui3Q2G1gGTyrQ=s88-c-k-c0x00ffffff-no-rj",
      "https://yt3.ggpht.com/X0tHklAINUsf59rJltK2Fh0vZOKygEt_PxpiqYn7LKhHgUKw7401fvpmK6lmrvdmsfOuniJN=s88-c-k-c0x00ffffff-no-rj"
    ],

  }
};
