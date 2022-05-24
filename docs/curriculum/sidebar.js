module.exports = [
  {
    title:'课程实验',
    collapsable: false,
    children:[
      {
        title:'数字波形生成',
        collapsable: true,
        children:[
          './notes/01_waveform',
          './notes/01_waveform_demo.md',
        ]
      },
      {
        title:'电子钢琴',
        collapsable: true,
        children:[
          './notes/02_piano',
          './notes/02_piano_demo',
        ]
      },
      {
        title:'采样定理',
        collapsable: true,
        children:[
          './notes/03_sample',
          './notes/03_sample_demo',
        ]
      },
      {
        title:'兑奖算法',
        collapsable: true,
        children:[
          './notes/04_prize',
          './notes/04_prize_demo'
        ]
      },
      {
        title:'象棋',
        collapsable: true,
        children:[
          './notes/05_chess1',
          './notes/05_chess2',
          './notes/05_chessx',
          './notes/05_chessx2',
          './notes/05_chess_demo'
        ]
      },
    ]
  },
  {
    title:'数电实验',
    collapsable: true,
    children:[
        './数电实验/时序电路的设计与实现',
    ]
  },
]
