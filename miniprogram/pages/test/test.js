const DEFAULT_PAGE = 0;

Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    
    activeNames: ['0'],
    toView: `card_${DEFAULT_PAGE}`,
    list: [
    {name:'Javascript',proUrl:'../../../images/11.png',des:"hhh1"},
    {name: 'Typescript',proUrl:'../../../images/12.png',des:"hhh2"},
    {name: 'Java',proUrl: '../../../images/5.png',des:"hhh3"},
    {name:'PHP',proUrl:'../../../images/6.jpg',des:"hhh4"}, 
    {name:'Go',proUrl:'../../../images/1.png',des:"hhh5"}
  ]
  },

  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },

  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 100){
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
})