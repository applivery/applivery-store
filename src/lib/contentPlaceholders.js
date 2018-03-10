export function list() {
  const row = [
    {
      height: '16px',
      boxes: [[0, 0]],
    },
    {
      height: '20px',
      boxes: [['16px', '64px'], ['16px', 2]],
    },
    {
      height: '10px',
      boxes: [['16px', '64px']],
    },

    {
      height: '14px',
      boxes: [['16px', '64px'], ['16px', 1.5]],
    },
    {
      height: '20px',
      boxes: [['16px', '64px']],
    },

    {
      height: '32px',
      boxes: [[0, 0]],
    },
  ]
  return row.concat(row, row)
}

export function detail() {
  return [
    {
      height: '24px',
      boxes: [[0, 0]],
    },
    {
      height: '20px',
      boxes: [['18px', '64px'], ['18px', 2]],
    },
    {
      height: '10px',
      boxes: [['18px', '64px']],
    },

    {
      height: '14px',
      boxes: [['18px', '64px'], ['18px', 1.5]],
    },
    {
      height: '20px',
      boxes: [['18px', '64px']],
    },

    {
      height: '36px',
      boxes: [[12, '100px']],
    },

    {
      height: '24px',
      boxes: [[0, 0]],
    },
  ]
}

export function viewDetail() {
  return [
    {
      height: '16px',
      boxes: [[0, '100px']],
    },
    {
      height: '24px',
      boxes: [[0, 0]],
    },
    {
      height: '14px',
      boxes: [[0, '100%']],
    },
    {
      height: '8px',
      boxes: [[0, 0]],
    },
    {
      height: '14px',
      boxes: [[0, '50%']],
    },
    {
      height: '48px',
      boxes: [[0, 0]],
    },
    {
      height: '16px',
      boxes: [[0, '100px'], [1, '100px']],
    },
    {
      height: '8px',
      boxes: [[0, 0]],
    },
    {
      height: '14px',
      boxes: [[0, '60px'], [1, '60px']],
    },
    {
      height: '24px',
      boxes: [[0, 0]],
    },
    {
      height: '16px',
      boxes: [[0, '100px'], [1, '100px']],
    },
    {
      height: '8px',
      boxes: [[0, 0]],
    },
    {
      height: '14px',
      boxes: [[0, '60px'], [1, '60px']],
    },
  ]
}

export function viewHistory() {
  const row = [
    {
      height: '20px',
      boxes: [[0, '160px'], [1000, '100px']],
    },
    {
      height: '8px',
      boxes: [[1000, '100px']],
    },
    {
      height: '14px',
      boxes: [[0, '100px']],
    },
    {
      height: '20px',
      boxes: [[0, 0]],
    },
    {
      height: '14px',
      boxes: [[0, '100%']],
    },
  ]
  return row.concat(
    [
      {
        height: '40px',
        boxes: [[0, 0]],
      },
    ],
    row
  )
}
