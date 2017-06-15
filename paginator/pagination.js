/* eslint-disable no-unused-vars */
class Pagination {
  constructor(obj) {
    const { total, perPage, currentPage, data, itemRender } = obj;
    this.total = total;
    this.perPage = perPage;
    this.currentPage = currentPage;
    this.data = data;
    this.pageNum = Math.ceil(total / perPage);// 总页数
    this.itemRender = itemRender;
  }

  next() {
    this.render(this.currentPage += 1);
  }

  goto(i) {
    this.render(this.currentPage = i);
  }

  prev() {
    this.render(this.currentPage -= 1);
  }

  first() {
    this.render(this.currentPage = 1);
  }

  last() {
    this.render(this.currentPage = this.pageNum);
  }

  renderPageNumber(pageElement) {
    const MAX_Page = 10; // 最多显示10个页码
    const HALF_MAX_PAGE = Math.floor(MAX_Page / 2);
    let template = '';
    const otherTemplates = [
      '<li id="firstBtn" class="pg other">首页</li>',
      '<li id="prevBtn" class="pg other">上一页</li>',
      '<li id="nextBtn" class="pg other">下一页</li>',
      '<li id="lastBtn" class="pg other">尾页</li>',
    ];
    const index = this.currentPage;

    // 构建页码
    let i = index - HALF_MAX_PAGE;
    if (index > 1) template += otherTemplates[0] + otherTemplates[1];// 首页+上一页
    const loopEnd = index < HALF_MAX_PAGE ? MAX_Page : (index + HALF_MAX_PAGE); // 当前页码放在中间位置
    for (i; i < loopEnd; i += 1) {
      if (i > this.pageNum) break;
      template += i > 0 ? `<li id=${`page-${i}`} class="pg">${i}</li>` : '';
    }
    if (index < this.pageNum) template += otherTemplates[2] + otherTemplates[3]; // 下一页+尾页

    // 渲染
    if (typeof pageElement === 'string') {
      $(pageElement).empty();
      $(pageElement).append(template);
    } else {
      pageElement.setAttribute('name', 'paginator');
      $('[name=paginator]').empty();
      $('[name=paginator]').append(template);
    }

    // 给当前页码加样式
    $('li').removeClass('pg-active');
    $(`li#page-${index}`).addClass('pg-active');

    // 绑定事件
    $(() => {
      $('#prevBtn').on('click', () => this.prev());
      $('#nextBtn').on('click', () => this.next());
      $('#firstBtn').on('click', () => this.first());
      $('#lastBtn').on('click', () => this.last());
      $("li[id^='page-']").on('click', e => this.goto($(e.currentTarget).text() - 0));
    });
  }

  renderContent(pageElement) {
    const index = this.currentPage;
    // 取数据
    const dataArr = this.data.slice(this.perPage * (index - 1), this.perPage * index);

    // 渲染
    if (typeof pageElement === 'string') {
      $(pageElement).empty();
    } else {
      pageElement.setAttribute('name', 'paginator-content');
      $('[name=paginator-content]').empty();
    }
    dataArr.forEach((item) => {
      this.itemRender(item);
    });
  }

  render() {
    this.renderPageNumber(document.getElementById('paginator'));
    this.renderContent('#container');

    // css
    $(() => {
      $('li.pg').css({
        display: 'block',
        width: '33px',
        height: '33px',
        lineHeight: '33px',
        float: 'left',
        marginRight: '2px',
        border: ' 1px solid #ddd',
        backgroundColor: '#fff',
        color: '#c8c8c8',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '4px',
        verticalAlign: 'middle',
      });

      $('li.pg-active').css({
        fontWeight: 'bold',
        color: '#b19696',
        border: 0,
      });

      $('li.other').css({
        width: '68px',
      });
    });
  }
}

