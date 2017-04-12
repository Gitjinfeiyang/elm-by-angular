;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M550.4 780.8c-6.4-6.4-19.2-6.4-25.6-6.4-12.8 0-19.2 0-25.6 6.4l-179.2 96c-32 19.2-51.2 0-44.8-32l32-198.4c0-19.2-6.4-38.4-19.2-51.2l-147.2-140.8c-25.6-25.6-19.2-51.2 19.2-51.2l198.4-32c19.2 0 38.4-19.2 44.8-32l89.6-179.2c6.4-12.8 19.2-25.6 25.6-25.6s19.2 6.4 25.6 25.6l89.6 179.2c6.4 12.8 25.6 32 44.8 32l198.4 32c38.4 6.4 44.8 32 19.2 51.2l-147.2 140.8c-12.8 12.8-19.2 38.4-19.2 51.2l32 198.4c6.4 32-12.8 51.2-44.8 32l-166.4-96z" fill="#FFCC01" ></path>' +
    '' +
    '<path d="M524.8 774.4c-12.8 0-19.2 0-25.6 6.4l-179.2 96c-32 19.2-51.2 0-44.8-32l32-198.4c0-19.2-6.4-38.4-19.2-51.2l-147.2-140.8c-25.6-25.6-19.2-51.2 19.2-51.2l198.4-32c19.2 0 38.4-19.2 44.8-32l89.6-179.2c6.4-12.8 19.2-25.6 25.6-25.6" fill="#FFCC01" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-pingfenwujiaoxing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M561.711 859.972c-8.285-8.285-24.854-8.285-33.14-8.285-16.57 0-24.854 0-33.14 8.285l-231.982 124.276c-41.425 24.854-66.281 0-57.996-41.425l41.425-256.836c0-24.854-8.285-49.711-24.854-66.281l-190.556-182.271c-33.14-33.14-24.854-66.281 24.854-66.281l256.836-41.425c24.854 0 49.711-24.854 57.996-41.425l115.99-231.982c8.285-16.57 24.854-33.14 33.14-33.14s24.854 8.285 33.14 33.14l115.99 231.982c8.285 16.57 33.14 41.425 57.996 41.425l256.836 41.425c49.711 8.285 57.996 41.425 24.854 66.281l-190.556 182.271c-16.57 16.57-24.854 49.711-24.854 66.281l41.425 256.836c8.285 41.425-16.57 66.281-57.996 41.425l-215.411-124.276z" fill="#E5EAED" ></path>' +
    '' +
    '<path d="M528.57 851.687c-16.57 0-24.854 0-33.14 8.285l-231.982 124.276c-41.425 24.854-66.281 0-57.996-41.425l41.425-256.836c0-24.854-8.285-49.711-24.854-66.281l-190.556-182.271c-33.14-33.14-24.854-66.281 24.854-66.281l256.836-41.425c24.854 0 49.711-24.854 57.996-41.425l115.99-231.982c8.285-16.57 24.854-33.14 33.14-33.14z" fill="#FFCC01" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-pingfenwujiaoxing1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M550.4 780.8c-6.4-6.4-19.2-6.4-25.6-6.4-12.8 0-19.2 0-25.6 6.4l-179.2 96c-32 19.2-51.2 0-44.8-32l32-198.4c0-19.2-6.4-38.4-19.2-51.2l-147.2-140.8c-25.6-25.6-19.2-51.2 19.2-51.2l198.4-32c19.2 0 38.4-19.2 44.8-32l89.6-179.2c6.4-12.8 19.2-25.6 25.6-25.6s19.2 6.4 25.6 25.6l89.6 179.2c6.4 12.8 25.6 32 44.8 32l198.4 32c38.4 6.4 44.8 32 19.2 51.2l-147.2 140.8c-12.8 12.8-19.2 38.4-19.2 51.2l32 198.4c6.4 32-12.8 51.2-44.8 32l-166.4-96z" fill="#cdcdcd" ></path>' +
    '' +
    '<path d="M524.8 774.4c-12.8 0-19.2 0-25.6 6.4l-179.2 96c-32 19.2-51.2 0-44.8-32l32-198.4c0-19.2-6.4-38.4-19.2-51.2l-147.2-140.8c-25.6-25.6-19.2-51.2 19.2-51.2l198.4-32c19.2 0 38.4-19.2 44.8-32l89.6-179.2c6.4-12.8 19.2-25.6 25.6-25.6" fill="#cdcdcd" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)