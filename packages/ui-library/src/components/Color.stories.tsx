import { Meta, StoryObj } from '@storybook/react'

const colors = {
  'mountain-meadow': '#22d486',
  'mountain-meadow-dark': '#20bd78',
  'wild-strawberry': '#ff4081',
  'cerise-red': '#e73370',
  'white': '#ffffff',
  'limed-spruce': '#323c46',
  'black': '#000000',
  'iron': '#c9ced3',
  'regent-gray': '#949ea8',
  'mischka': '#d9dce1',
  'gray-chateau': '#a9aeb4',
  'athens-gray': '#f9f9fb',
  'ghost': '#c4c9d1',
  'nandor': '#565d5a',
  'boulder': '#7d7878',
  'outer-space': '#303942',
}

const meta: Meta = {
  title: 'Design System/Colors',
}

export default meta

export const ColorPalette: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '20px',
      }}
    >
      {Object.keys(colors).map((color) => (
        <div
          key={color}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              // @ts-ignore
              backgroundColor: colors[color],
              borderRadius: '50%',
            }}
          ></div>
          <p>{color}</p>
          <p style={{ color: '#666' }}>
            {/*// @ts-ignore*/}
            {colors[color]}
          </p>
        </div>
      ))}
    </div>
  ),
}
