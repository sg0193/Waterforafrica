/* ===================================================
 * bootstrap-transition.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);

(function ($) { var smartPhone = window.orientation != undefined; var DateTimePicker = function (element, options) { this.id = dpgId++; this.init(element, options) }; var dateToDate = function (dt) { if (typeof dt === "string") { return new Date(dt) } return dt }; DateTimePicker.prototype = { constructor: DateTimePicker, init: function (element, options) { var icon; if (!(options.pickTime || options.pickDate)) throw new Error("Must choose at least one picker"); this.options = options; this.$element = $(element); this.language = options.language in dates ? options.language : "en"; this.pickDate = options.pickDate; this.pickTime = options.pickTime; this.isInput = this.$element.is("input"); this.component = false; if (this.$element.is(".input-append") || this.$element.is(".input-prepend")) this.component = this.$element.find(".add-on"); this.format = options.format; if (!this.format) { if (this.isInput) this.format = this.$element.data("format"); else this.format = this.$element.find("input").data("format"); if (!this.format) this.format = "MM/dd/yyyy" } this._compileFormat(); if (this.component) { icon = this.component.find("i") } if (this.pickTime) { if (icon && icon.length) this.timeIcon = icon.data("time-icon"); if (!this.timeIcon) this.timeIcon = "icon-time"; icon.addClass(this.timeIcon) } if (this.pickDate) { if (icon && icon.length) this.dateIcon = icon.data("date-icon"); if (!this.dateIcon) this.dateIcon = "icon-calendar"; icon.removeClass(this.timeIcon); icon.addClass(this.dateIcon) } this.widget = $(getTemplate(this.timeIcon, options.pickDate, options.pickTime, options.pick12HourFormat, options.pickSeconds)).appendTo("body"); this.minViewMode = options.minViewMode || this.$element.data("date-minviewmode") || 0; if (typeof this.minViewMode === "string") { switch (this.minViewMode) { case "months": this.minViewMode = 1; break; case "years": this.minViewMode = 2; break; default: this.minViewMode = 0; break } } this.viewMode = options.viewMode || this.$element.data("date-viewmode") || 0; if (typeof this.viewMode === "string") { switch (this.viewMode) { case "months": this.viewMode = 1; break; case "years": this.viewMode = 2; break; default: this.viewMode = 0; break } } this.startViewMode = this.viewMode; this.weekStart = options.weekStart || this.$element.data("date-weekstart") || 0; this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1; this.setStartDate(options.startDate || this.$element.data("date-startdate")); this.setEndDate(options.endDate || this.$element.data("date-enddate")); this.fillDow(); this.fillMonths(); this.fillHours(); this.fillMinutes(); this.fillSeconds(); this.update(); this.showMode(); this._attachDatePickerEvents() }, show: function (e) { this.widget.show(); this.height = this.component ? this.component.outerHeight() : this.$element.outerHeight(); this.place(); this.$element.trigger({ type: "show", date: this._date }); this._attachDatePickerGlobalEvents(); if (e) { e.stopPropagation(); e.preventDefault() } }, disable: function () { this.$element.find("input").prop("disabled", true); this._detachDatePickerEvents() }, enable: function () { this.$element.find("input").prop("disabled", false); this._attachDatePickerEvents() }, hide: function () { var collapse = this.widget.find(".collapse"); for (var i = 0; i < collapse.length; i++) { var collapseData = collapse.eq(i).data("collapse"); if (collapseData && collapseData.transitioning) return } this.widget.hide(); this.viewMode = this.startViewMode; this.showMode(); this.set(); this.$element.trigger({ type: "hide", date: this._date }); this._detachDatePickerGlobalEvents() }, set: function () { var formatted = ""; if (!this._unset) formatted = this.formatDate(this._date); if (!this.isInput) { if (this.component) { var input = this.$element.find("input"); input.val(formatted); this._resetMaskPos(input) } this.$element.data("date", formatted) } else { this.$element.val(formatted); this._resetMaskPos(this.$element) } }, setValue: function (newDate) { if (!newDate) { this._unset = true } else { this._unset = false } if (typeof newDate === "string") { this._date = this.parseDate(newDate) } else if (newDate) { this._date = new Date(newDate) } this.set(); this.viewDate = UTCDate(this._date.getUTCFullYear(), this._date.getUTCMonth(), 1, 0, 0, 0, 0); this.fillDate(); this.fillTime() }, getDate: function () { if (this._unset) return null; return new Date(this._date.valueOf()) }, setDate: function (date) { if (!date) this.setValue(null); else this.setValue(date.valueOf()) }, setStartDate: function (date) { if (date instanceof Date) { this.startDate = date } else if (typeof date === "string") { this.startDate = new UTCDate(date); if (!this.startDate.getUTCFullYear()) { this.startDate = -Infinity } } else { this.startDate = -Infinity } if (this.viewDate) { this.update() } }, setEndDate: function (date) { if (date instanceof Date) { this.endDate = date } else if (typeof date === "string") { this.endDate = new UTCDate(date); if (!this.endDate.getUTCFullYear()) { this.endDate = Infinity } } else { this.endDate = Infinity } if (this.viewDate) { this.update() } }, getLocalDate: function () { if (this._unset) return null; var d = this._date; return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()) }, setLocalDate: function (localDate) { if (!localDate) this.setValue(null); else this.setValue(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds())) }, place: function () { var offset = this.component ? this.component.offset() : this.$element.offset(); this.widget.css({ top: offset.top + this.height, left: offset.left }) }, notifyChange: function () { this.$element.trigger({ type: "changeDate", date: this.getDate(), localDate: this.getLocalDate() }) }, update: function (newDate) { var dateStr = newDate; if (!dateStr) { if (this.isInput) { dateStr = this.$element.val() } else { dateStr = this.$element.find("input").val() } if (!dateStr) { var tmp = new Date; this._date = UTCDate(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(), tmp.getHours(), tmp.getMinutes(), tmp.getSeconds(), tmp.getMilliseconds()) } else { this._date = this.parseDate(dateStr) } } this.viewDate = UTCDate(this._date.getUTCFullYear(), this._date.getUTCMonth(), 1, 0, 0, 0, 0); this.fillDate(); this.fillTime() }, fillDow: function () { var dowCnt = this.weekStart; var html = "<tr>"; while (dowCnt < this.weekStart + 7) { html += '<th class="dow">' + dates[this.language].daysMin[dowCnt++ % 7] + "</th>" } html += "</tr>"; this.widget.find(".datepicker-days thead").append(html) }, fillMonths: function () { var html = ""; var i = 0; while (i < 12) { html += '<span class="month">' + dates[this.language].monthsShort[i++] + "</span>" } this.widget.find(".datepicker-months td").append(html) }, fillDate: function () { var year = this.viewDate.getUTCFullYear(); var month = this.viewDate.getUTCMonth(); var currentDate = UTCDate(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate(), 0, 0, 0, 0); var startYear = typeof this.startDate === "object" ? this.startDate.getUTCFullYear() : -Infinity; var startMonth = typeof this.startDate === "object" ? this.startDate.getUTCMonth() : -1; var endYear = typeof this.endDate === "object" ? this.endDate.getUTCFullYear() : Infinity; var endMonth = typeof this.endDate === "object" ? this.endDate.getUTCMonth() : 12; this.widget.find(".datepicker-days").find(".disabled").removeClass("disabled"); this.widget.find(".datepicker-months").find(".disabled").removeClass("disabled"); this.widget.find(".datepicker-years").find(".disabled").removeClass("disabled"); this.widget.find(".datepicker-days th:eq(1)").text(dates[this.language].months[month] + " " + year); var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0); var day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth()); prevMonth.setUTCDate(day); prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7); if (year == startYear && month <= startMonth || year < startYear) { this.widget.find(".datepicker-days th:eq(0)").addClass("disabled") } if (year == endYear && month >= endMonth || year > endYear) { this.widget.find(".datepicker-days th:eq(2)").addClass("disabled") } var nextMonth = new Date(prevMonth.valueOf()); nextMonth.setUTCDate(nextMonth.getUTCDate() + 42); nextMonth = nextMonth.valueOf(); var html = []; var clsName; while (prevMonth.valueOf() < nextMonth) { if (prevMonth.getUTCDay() === this.weekStart) { html.push("<tr>") } clsName = ""; if (prevMonth.getUTCFullYear() < year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month) { clsName += " old" } else if (prevMonth.getUTCFullYear() > year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month) { clsName += " new" } if (prevMonth.valueOf() === currentDate.valueOf()) { clsName += " active" } if (prevMonth.valueOf() + 864e5 <= this.startDate) { clsName += " disabled" } if (prevMonth.valueOf() > this.endDate) { clsName += " disabled" } html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + "</td>"); if (prevMonth.getUTCDay() === this.weekEnd) { html.push("</tr>") } prevMonth.setUTCDate(prevMonth.getUTCDate() + 1) } this.widget.find(".datepicker-days tbody").empty().append(html.join("")); var currentYear = this._date.getUTCFullYear(); var months = this.widget.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active"); if (currentYear === year) { months.eq(this._date.getUTCMonth()).addClass("active") } if (currentYear - 1 < startYear) { this.widget.find(".datepicker-months th:eq(0)").addClass("disabled") } if (currentYear + 1 > endYear) { this.widget.find(".datepicker-months th:eq(2)").addClass("disabled") } for (var i = 0; i < 12; i++) { if (year == startYear && startMonth > i || year < startYear) { $(months[i]).addClass("disabled") } else if (year == endYear && endMonth < i || year > endYear) { $(months[i]).addClass("disabled") } } html = ""; year = parseInt(year / 10, 10) * 10; var yearCont = this.widget.find(".datepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).end().find("td"); this.widget.find(".datepicker-years").find("th").removeClass("disabled"); if (startYear > year) { this.widget.find(".datepicker-years").find("th:eq(0)").addClass("disabled") } if (endYear < year + 9) { this.widget.find(".datepicker-years").find("th:eq(2)").addClass("disabled") } year -= 1; for (var i = -1; i < 11; i++) { html += '<span class="year' + (i === -1 || i === 10 ? " old" : "") + (currentYear === year ? " active" : "") + (year < startYear || year > endYear ? " disabled" : "") + '">' + year + "</span>"; year += 1 } yearCont.html(html) }, fillHours: function () { var table = this.widget.find(".timepicker .timepicker-hours table"); table.parent().hide(); var html = ""; if (this.options.pick12HourFormat) { var current = 1; for (var i = 0; i < 3; i += 1) { html += "<tr>"; for (var j = 0; j < 4; j += 1) { var c = current.toString(); html += '<td class="hour">' + padLeft(c, 2, "0") + "</td>"; current++ } html += "</tr>" } } else { var current = 0; for (var i = 0; i < 6; i += 1) { html += "<tr>"; for (var j = 0; j < 4; j += 1) { var c = current.toString(); html += '<td class="hour">' + padLeft(c, 2, "0") + "</td>"; current++ } html += "</tr>" } } table.html(html) }, fillMinutes: function () { var table = this.widget.find(".timepicker .timepicker-minutes table"); table.parent().hide(); var html = ""; var current = 0; for (var i = 0; i < 5; i++) { html += "<tr>"; for (var j = 0; j < 4; j += 1) { var c = current.toString(); html += '<td class="minute">' + padLeft(c, 2, "0") + "</td>"; current += 3 } html += "</tr>" } table.html(html) }, fillSeconds: function () { var table = this.widget.find(".timepicker .timepicker-seconds table"); table.parent().hide(); var html = ""; var current = 0; for (var i = 0; i < 5; i++) { html += "<tr>"; for (var j = 0; j < 4; j += 1) { var c = current.toString(); html += '<td class="second">' + padLeft(c, 2, "0") + "</td>"; current += 3 } html += "</tr>" } table.html(html) }, fillTime: function () { if (!this._date) return; var timeComponents = this.widget.find(".timepicker span[data-time-component]"); var table = timeComponents.closest("table"); var is12HourFormat = this.options.pick12HourFormat; var hour = this._date.getUTCHours(); var period = "AM"; if (is12HourFormat) { if (hour >= 12) period = "PM"; if (hour === 0) hour = 12; else if (hour != 12) hour = hour % 12; this.widget.find(".timepicker [data-action=togglePeriod]").text(period) } hour = padLeft(hour.toString(), 2, "0"); var minute = padLeft(this._date.getUTCMinutes().toString(), 2, "0"); var second = padLeft(this._date.getUTCSeconds().toString(), 2, "0"); timeComponents.filter("[data-time-component=hours]").text(hour); timeComponents.filter("[data-time-component=minutes]").text(minute); timeComponents.filter("[data-time-component=seconds]").text(second) }, click: function (e) { e.stopPropagation(); e.preventDefault(); this._unset = false; var target = $(e.target).closest("span, td, th"); if (target.length === 1) { if (!target.is(".disabled")) { switch (target[0].nodeName.toLowerCase()) { case "th": switch (target[0].className) { case "switch": this.showMode(1); break; case "prev": case "next": var vd = this.viewDate; var navFnc = DPGlobal.modes[this.viewMode].navFnc; var step = DPGlobal.modes[this.viewMode].navStep; if (target[0].className === "prev") step = step * -1; vd["set" + navFnc](vd["get" + navFnc]() + step); this.fillDate(); this.set(); break } break; case "span": if (target.is(".month")) { var month = target.parent().find("span").index(target); this.viewDate.setUTCMonth(month) } else { var year = parseInt(target.text(), 10) || 0; this.viewDate.setUTCFullYear(year) } if (this.viewMode !== 0) { this._date = UTCDate(this.viewDate.getUTCFullYear(), this.viewDate.getUTCMonth(), this.viewDate.getUTCDate(), this._date.getUTCHours(), this._date.getUTCMinutes(), this._date.getUTCSeconds(), this._date.getUTCMilliseconds()); this.notifyChange() } this.showMode(-1); this.fillDate(); this.set(); break; case "td": if (target.is(".day")) { var day = parseInt(target.text(), 10) || 1; var month = this.viewDate.getUTCMonth(); var year = this.viewDate.getUTCFullYear(); if (target.is(".old")) { if (month === 0) { month = 11; year -= 1 } else { month -= 1 } } else if (target.is(".new")) { if (month == 11) { month = 0; year += 1 } else { month += 1 } } this._date = UTCDate(year, month, day, this._date.getUTCHours(), this._date.getUTCMinutes(), this._date.getUTCSeconds(), this._date.getUTCMilliseconds()); this.viewDate = UTCDate(year, month, Math.min(28, day), 0, 0, 0, 0); this.fillDate(); this.set(); this.notifyChange() } break } } } }, actions: { incrementHours: function (e) { this._date.setUTCHours(this._date.getUTCHours() + 1) }, incrementMinutes: function (e) { this._date.setUTCMinutes(this._date.getUTCMinutes() + 1) }, incrementSeconds: function (e) { this._date.setUTCSeconds(this._date.getUTCSeconds() + 1) }, decrementHours: function (e) { this._date.setUTCHours(this._date.getUTCHours() - 1) }, decrementMinutes: function (e) { this._date.setUTCMinutes(this._date.getUTCMinutes() - 1) }, decrementSeconds: function (e) { this._date.setUTCSeconds(this._date.getUTCSeconds() - 1) }, togglePeriod: function (e) { var hour = this._date.getUTCHours(); if (hour >= 12) hour -= 12; else hour += 12; this._date.setUTCHours(hour) }, showPicker: function () { this.widget.find(".timepicker > div:not(.timepicker-picker)").hide(); this.widget.find(".timepicker .timepicker-picker").show() }, showHours: function () { this.widget.find(".timepicker .timepicker-picker").hide(); this.widget.find(".timepicker .timepicker-hours").show() }, showMinutes: function () { this.widget.find(".timepicker .timepicker-picker").hide(); this.widget.find(".timepicker .timepicker-minutes").show() }, showSeconds: function () { this.widget.find(".timepicker .timepicker-picker").hide(); this.widget.find(".timepicker .timepicker-seconds").show() }, selectHour: function (e) { var tgt = $(e.target); var value = parseInt(tgt.text(), 10); if (this.options.pick12HourFormat) { var current = this._date.getUTCHours(); if (current >= 12) { if (value != 12) value = (value + 12) % 24 } else { if (value === 12) value = 0; else value = value % 12 } } this._date.setUTCHours(value); this.actions.showPicker.call(this) }, selectMinute: function (e) { var tgt = $(e.target); var value = parseInt(tgt.text(), 10); this._date.setUTCMinutes(value); this.actions.showPicker.call(this) }, selectSecond: function (e) { var tgt = $(e.target); var value = parseInt(tgt.text(), 10); this._date.setUTCSeconds(value); this.actions.showPicker.call(this) } }, doAction: function (e) { e.stopPropagation(); e.preventDefault(); if (!this._date) this._date = UTCDate(1970, 0, 0, 0, 0, 0, 0); var action = $(e.currentTarget).data("action"); var rv = this.actions[action].apply(this, arguments); this.set(); this.fillTime(); this.notifyChange(); return rv }, stopEvent: function (e) { e.stopPropagation(); e.preventDefault() }, keydown: function (e) { var self = this, k = e.which, input = $(e.target); if (k == 8 || k == 46) { setTimeout(function () { self._resetMaskPos(input) }) } }, keypress: function (e) { var k = e.which; if (k == 8 || k == 46) { return } var input = $(e.target); var c = String.fromCharCode(k); var val = input.val() || ""; val += c; var mask = this._mask[this._maskPos]; if (!mask) { return false } if (mask.end != val.length) { return } if (!mask.pattern.test(val.slice(mask.start))) { val = val.slice(0, val.length - 1); while ((mask = this._mask[this._maskPos]) && mask.character) { val += mask.character; this._maskPos++ } val += c; if (mask.end != val.length) { input.val(val); return false } else { if (!mask.pattern.test(val.slice(mask.start))) { input.val(val.slice(0, mask.start)); return false } else { input.val(val); this._maskPos++; return false } } } else { this._maskPos++ } }, change: function (e) { var input = $(e.target); var val = input.val(); if (this._formatPattern.test(val)) { this.update(); this.setValue(this._date.getTime()); this.notifyChange(); this.set() } else if (val && val.trim()) { this.setValue(this._date.getTime()); if (this._date) this.set(); else input.val("") } else { if (this._date) { this.setValue(null); this.notifyChange(); this._unset = true } } this._resetMaskPos(input) }, showMode: function (dir) { if (dir) { this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir)) } this.widget.find(".datepicker > div").hide().filter(".datepicker-" + DPGlobal.modes[this.viewMode].clsName).show() }, destroy: function () { this._detachDatePickerEvents(); this._detachDatePickerGlobalEvents(); this.widget.remove(); this.$element.removeData("datetimepicker"); this.component.removeData("datetimepicker") }, formatDate: function (d) { return this.format.replace(formatReplacer, function (match) { var methodName, property, rv, len = match.length; if (match === "ms") len = 1; property = dateFormatComponents[match].property; if (property === "Hours12") { rv = d.getUTCHours(); if (rv === 0) rv = 12; else if (rv !== 12) rv = rv % 12 } else if (property === "Period12") { if (d.getUTCHours() >= 12) return "PM"; else return "AM" } else { methodName = "get" + property; rv = d[methodName]() } if (methodName === "getUTCMonth") rv = rv + 1; if (methodName === "getUTCYear") rv = rv + 1900 - 2e3; return padLeft(rv.toString(), len, "0") }) }, parseDate: function (str) { var match, i, property, methodName, value, parsed = {}; if (!(match = this._formatPattern.exec(str))) return null; for (i = 1; i < match.length; i++) { property = this._propertiesByIndex[i]; if (!property) continue; value = match[i]; if (/^\d+$/.test(value)) value = parseInt(value, 10); parsed[property] = value } return this._finishParsingDate(parsed) }, _resetMaskPos: function (input) { var val = input.val(); for (var i = 0; i < this._mask.length; i++) { if (this._mask[i].end > val.length) { this._maskPos = i; break } else if (this._mask[i].end === val.length) { this._maskPos = i + 1; break } } }, _finishParsingDate: function (parsed) { var year, month, date, hours, minutes, seconds, milliseconds; year = parsed.UTCFullYear; if (parsed.UTCYear) year = 2e3 + parsed.UTCYear; if (!year) year = 1970; if (parsed.UTCMonth) month = parsed.UTCMonth - 1; else month = 0; date = parsed.UTCDate || 1; hours = parsed.UTCHours || 0; minutes = parsed.UTCMinutes || 0; seconds = parsed.UTCSeconds || 0; milliseconds = parsed.UTCMilliseconds || 0; if (parsed.Hours12) { hours = parsed.Hours12 } if (parsed.Period12) { if (/pm/i.test(parsed.Period12)) { if (hours != 12) hours = (hours + 12) % 24 } else { hours = hours % 12 } } return UTCDate(year, month, date, hours, minutes, seconds, milliseconds) }, _compileFormat: function () { var match, component, components = [], mask = [], str = this.format, propertiesByIndex = {}, i = 0, pos = 0; while (match = formatComponent.exec(str)) { component = match[0]; if (component in dateFormatComponents) { i++; propertiesByIndex[i] = dateFormatComponents[component].property; components.push("\\s*" + dateFormatComponents[component].getPattern(this) + "\\s*"); mask.push({ pattern: new RegExp(dateFormatComponents[component].getPattern(this)), property: dateFormatComponents[component].property, start: pos, end: pos += component.length }) } else { components.push(escapeRegExp(component)); mask.push({ pattern: new RegExp(escapeRegExp(component)), character: component, start: pos, end: ++pos }) } str = str.slice(component.length) } this._mask = mask; this._maskPos = 0; this._formatPattern = new RegExp("^\\s*" + components.join("") + "\\s*$"); this._propertiesByIndex = propertiesByIndex }, _attachDatePickerEvents: function () { var self = this; this.widget.on("click", ".datepicker *", $.proxy(this.click, this)); this.widget.on("click", "[data-action]", $.proxy(this.doAction, this)); this.widget.on("mousedown", $.proxy(this.stopEvent, this)); if (this.pickDate && this.pickTime) { this.widget.on("click.togglePicker", ".accordion-toggle", function (e) { e.stopPropagation(); var $this = $(this); var $parent = $this.closest("ul"); var expanded = $parent.find(".collapse.in"); var closed = $parent.find(".collapse:not(.in)"); if (expanded && expanded.length) { var collapseData = expanded.data("collapse"); if (collapseData && collapseData.transitioning) return; expanded.collapse("hide"); closed.collapse("show"); $this.find("i").toggleClass(self.timeIcon + " " + self.dateIcon); self.$element.find(".add-on i").toggleClass(self.timeIcon + " " + self.dateIcon) } }) } if (this.isInput) { this.$element.on({ focus: $.proxy(this.show, this), change: $.proxy(this.change, this) }); if (this.options.maskInput) { this.$element.on({ keydown: $.proxy(this.keydown, this), keypress: $.proxy(this.keypress, this) }) } } else { this.$element.on({ change: $.proxy(this.change, this) }, "input"); if (this.options.maskInput) { this.$element.on({ keydown: $.proxy(this.keydown, this), keypress: $.proxy(this.keypress, this) }, "input") } if (this.component) { this.component.on("click", $.proxy(this.show, this)) } else { this.$element.on("click", $.proxy(this.show, this)) } } }, _attachDatePickerGlobalEvents: function () { $(window).on("resize.datetimepicker" + this.id, $.proxy(this.place, this)); if (!this.isInput) { $(document).on("mousedown.datetimepicker" + this.id, $.proxy(this.hide, this)) } }, _detachDatePickerEvents: function () { this.widget.off("click", ".datepicker *", this.click); this.widget.off("click", "[data-action]"); this.widget.off("mousedown", this.stopEvent); if (this.pickDate && this.pickTime) { this.widget.off("click.togglePicker") } if (this.isInput) { this.$element.off({ focus: this.show, change: this.change }); if (this.options.maskInput) { this.$element.off({ keydown: this.keydown, keypress: this.keypress }) } } else { this.$element.off({ change: this.change }, "input"); if (this.options.maskInput) { this.$element.off({ keydown: this.keydown, keypress: this.keypress }, "input") } if (this.component) { this.component.off("click", this.show) } else { this.$element.off("click", this.show) } } }, _detachDatePickerGlobalEvents: function () { $(window).off("resize.datetimepicker" + this.id); if (!this.isInput) { $(document).off("mousedown.datetimepicker" + this.id) } } }; $.fn.datetimepicker = function (option, val) { return this.each(function () { var $this = $(this), data = $this.data("datetimepicker"), options = typeof option === "object" && option; if (!data) { $this.data("datetimepicker", data = new DateTimePicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))) } if (typeof option === "string") data[option](val) }) }; $.fn.datetimepicker.defaults = { maskInput: false, pickDate: true, pickTime: true, pick12HourFormat: false, pickSeconds: true, startDate: -Infinity, endDate: Infinity }; $.fn.datetimepicker.Constructor = DateTimePicker; var dpgId = 0; var dates = $.fn.datetimepicker.dates = { en: { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] } }; var dateFormatComponents = { dd: { property: "UTCDate", getPattern: function () { return "(0?[1-9]|[1-2][0-9]|3[0-1])\\b" } }, MM: { property: "UTCMonth", getPattern: function () { return "(0?[1-9]|1[0-2])\\b" } }, yy: { property: "UTCYear", getPattern: function () { return "(\\d{2})\\b" } }, yyyy: { property: "UTCFullYear", getPattern: function () { return "(\\d{4})\\b" } }, hh: { property: "UTCHours", getPattern: function () { return "(0?[0-9]|1[0-9]|2[0-3])\\b" } }, mm: { property: "UTCMinutes", getPattern: function () { return "(0?[0-9]|[1-5][0-9])\\b" } }, ss: { property: "UTCSeconds", getPattern: function () { return "(0?[0-9]|[1-5][0-9])\\b" } }, ms: { property: "UTCMilliseconds", getPattern: function () { return "([0-9]{1,3})\\b" } }, HH: { property: "Hours12", getPattern: function () { return "(0?[1-9]|1[0-2])\\b" } }, PP: { property: "Period12", getPattern: function () { return "(AM|PM|am|pm|Am|aM|Pm|pM)\\b" } } }; var keys = []; for (var k in dateFormatComponents) keys.push(k); keys[keys.length - 1] += "\\b"; keys.push("."); var formatComponent = new RegExp(keys.join("\\b|")); keys.pop(); var formatReplacer = new RegExp(keys.join("\\b|"), "g"); function escapeRegExp(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") } function padLeft(s, l, c) { if (l < s.length) return s; else return Array(l - s.length + 1).join(c || " ") + s } function getTemplate(timeIcon, pickDate, pickTime, is12Hours, showSeconds) { if (pickDate && pickTime) { return '<div class="bootstrap-datetimepicker-widget dropdown-menu">' + "<ul>" + '<li class="collapse in">' + '<div class="datepicker">' + DPGlobal.template + "</div>" + "</li>" + '<li class="picker-switch"><a class="accordion-toggle"><i class="' + timeIcon + '"></i></a></li>' + '<li class="collapse">' + '<div class="timepicker">' + TPGlobal.getTemplate(is12Hours, showSeconds) + "</div>" + "</li>" + "</ul>" + "</div>" } else if (pickTime) { return '<div class="bootstrap-datetimepicker-widget dropdown-menu">' + '<div class="timepicker">' + TPGlobal.getTemplate(is12Hours, showSeconds) + "</div>" + "</div>" } else { return '<div class="bootstrap-datetimepicker-widget dropdown-menu">' + '<div class="datepicker">' + DPGlobal.template + "</div>" + "</div>" } } function UTCDate() { return new Date(Date.UTC.apply(Date, arguments)) } var DPGlobal = { modes: [{ clsName: "days", navFnc: "UTCMonth", navStep: 1 }, { clsName: "months", navFnc: "UTCFullYear", navStep: 1 }, { clsName: "years", navFnc: "UTCFullYear", navStep: 10 }], isLeapYear: function (year) { return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 }, getDaysInMonth: function (year, month) { return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] }, headTemplate: "<thead>" + "<tr>" + '<th class="prev">&lsaquo;</th>' + '<th colspan="5" class="switch"></th>' + '<th class="next">&rsaquo;</th>' + "</tr>" + "</thead>", contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>' }; DPGlobal.template = '<div class="datepicker-days">' + '<table class="table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + "</table>" + "</div>"; var TPGlobal = { hourTemplate: '<span data-action="showHours" data-time-component="hours" class="timepicker-hour"></span>', minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>', secondTemplate: '<span data-action="showSeconds" data-time-component="seconds" class="timepicker-second"></span>' }; TPGlobal.getTemplate = function (is12Hours, showSeconds) { return '<div class="timepicker-picker">' + '<table class="table-condensed"' + (is12Hours ? ' data-hour-format="12"' : "") + ">" + "<tr>" + '<td><a href="#" class="btn" data-action="incrementHours"><i class="icon-chevron-up"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="incrementMinutes"><i class="icon-chevron-up"></i></a></td>' + (showSeconds ? '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="incrementSeconds"><i class="icon-chevron-up"></i></a></td>' : "") + (is12Hours ? '<td class="separator"></td>' : "") + "</tr>" + "<tr>" + "<td>" + TPGlobal.hourTemplate + "</td> " + '<td class="separator">:</td>' + "<td>" + TPGlobal.minuteTemplate + "</td> " + (showSeconds ? '<td class="separator">:</td>' + "<td>" + TPGlobal.secondTemplate + "</td>" : "") + (is12Hours ? '<td class="separator"></td>' + "<td>" + '<button type="button" class="btn btn-primary" data-action="togglePeriod"></button>' + "</td>" : "") + "</tr>" + "<tr>" + '<td><a href="#" class="btn" data-action="decrementHours"><i class="icon-chevron-down"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="decrementMinutes"><i class="icon-chevron-down"></i></a></td>' + (showSeconds ? '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="decrementSeconds"><i class="icon-chevron-down"></i></a></td>' : "") + (is12Hours ? '<td class="separator"></td>' : "") + "</tr>" + "</table>" + "</div>" + '<div class="timepicker-hours" data-action="selectHour">' + '<table class="table-condensed">' + "</table>" + "</div>" + '<div class="timepicker-minutes" data-action="selectMinute">' + '<table class="table-condensed">' + "</table>" + "</div>" + (showSeconds ? '<div class="timepicker-seconds" data-action="selectSecond">' + '<table class="table-condensed">' + "</table>" + "</div>" : "") } })(window.jQuery);