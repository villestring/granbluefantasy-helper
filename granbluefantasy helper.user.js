// ==UserScript==
// @name         碧蓝幻想助手
// @namespace    https://gist.github.com/biuuu/gbf-hell
// @version      0.0.2
// @description  无
// @icon         http://game.granbluefantasy.jp/favicon.ico
// @author       biuuu
// @author       You
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @run-at       document-end
// @grant        GM_notification
// ==/UserScript==
(function () {
  'use strict';


   const addStyle = (css) => {
    const style = document.createElement('style')
    style.innerText = css
    document.head.appendChild(style)
  }
    // 隐藏滚动条
  addStyle(`
    ::-webkit-scrollbar {
      display: none;
    }
  `)

    // 可以复制救援或房间码
//  addStyle(`
//    .txt-info-content,
//    .txt-room-id,
//    .prt-battle-id {
//      user-select: text !important;
//    }
 // `)

    // 保持BGM播放
  window.addEventListener('blur', function (e) {
    e.stopImmediatePropagation()
  }, false)


    /*
     *以下为多人提醒
     */
  const send = (title) => {
    GM_notification({
      title: title,
      text: '碧君很担心你有没有查看raid结算',
      timeout: 10000
    })
  }

  let eventOn = false
  window.addEventListener('hashchange', () => {
    let hash = location.hash
    if (/^#result(_multi)?\/\d/.test(hash)) {

      /*
       * 有变动说明raid结束
       */

      //send('raid结束') // uncomment this line below if needed

      /*
       * 如果有活动，并且在结算时出现了新的数据，则代表出现了HELL
       * =>跳出HELL提醒
       */
      if (!eventOn) {
        eventOn = true
        $(document).ajaxSuccess(function(event, xhr, settings, data) {
          if (/\/result(multi)?\/data\/\d+/.test(settings.url)) {
            if (data.appearance) {
              send('出HELL了')
            }
          }
        })
      }
    }
  })
}())