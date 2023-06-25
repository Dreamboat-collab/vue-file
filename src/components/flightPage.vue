<script setup>
import {onMounted, ref} from 'vue';

import $ from 'jquery';
// 引入bootstrap样式
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'wowjs/css/libs/animate.css';
import '@/assets/CSS/fontawesome-all.min.css';
import '@/assets/CSS/bootstrap-datepicker.min.css';
import '@/assets/CSS/odometer.css';
import '@/assets/CSS/flaticon.css';
import '@/assets/CSS/jquery-ui.css';
import '@/assets/CSS/default.css';
import '@/assets/CSS/styleFlight.css';
import '@/assets/CSS/responsive.css';
import '@/assets/js/jquery.odometer.min.js';
import "@/assets/js/jquery-ui.min.js";
import IndexHeader1 from "@/components/indexHeader1.vue";
import IndexFooter1 from "@/components/indexFooter1.vue";
import axios from "axios";
import router from "@/router";
import {ElMessageBox} from "element-plus";

const address = ref([]);
const depart = ref();
const arrival = ref();
const grade = ref('Economy');
const prices = ref([])
const departs = ref([])
const arrivals = ref([])
const depart_time = ref([])
const arrival_time = ref([])


onMounted(() => {
  const jump = localStorage.getItem('jump')
  if (jump == '1') {
    localStorage.setItem('jump', 0)
    console.log(jump)
    location.reload()
  }
// 这里是原来的 JavaScript 代码 bootstrap-datepicker.min.js
  (function ($, undefined) {

    var $window = $(window);

    function UTCDate() {
      return new Date(Date.UTC.apply(Date, arguments));
    }

    function UTCToday() {
      var today = new Date();
      return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
    }

    function alias(method) {
      return function () {
        return this[method].apply(this, arguments);
      };
    }

    var DateArray = (function () {
      var extras = {
        get: function (i) {
          return this.slice(i)[0];
        },
        contains: function (d) {
          // Array.indexOf is not cross-browser;
          // $.inArray doesn't work with Dates
          var val = d && d.valueOf();
          for (var i = 0, l = this.length; i < l; i++)
            if (this[i].valueOf() === val)
              return i;
          return -1;
        },
        remove: function (i) {
          this.splice(i, 1);
        },
        replace: function (new_array) {
          if (!new_array)
            return;
          if (!$.isArray(new_array))
            new_array = [new_array];
          this.clear();
          this.push.apply(this, new_array);
        },
        clear: function () {
          this.splice(0);
        },
        copy: function () {
          var a = new DateArray();
          a.replace(this);
          return a;
        }
      };

      return function () {
        var a = [];
        a.push.apply(a, arguments);
        $.extend(a, extras);
        return a;
      };
    })();


    // Picker object

    var Datepicker = function (element, options) {
      this.dates = new DateArray();
      this.viewDate = UTCToday();
      this.focusDate = null;

      this._process_options(options);

      this.element = $(element);
      this.isInline = false;
      this.isInput = this.element.is('input');
      this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
      this.hasInput = this.component && this.element.find('input').length;
      if (this.component && this.component.length === 0)
        this.component = false;

      this.picker = $(DPGlobal.template);
      this._buildEvents();
      this._attachEvents();

      if (this.isInline) {
        this.picker.addClass('datepicker-inline').appendTo(this.element);
      } else {
        this.picker.addClass('datepicker-dropdown dropdown-menu');
      }

      if (this.o.rtl) {
        this.picker.addClass('datepicker-rtl');
      }

      this.viewMode = this.o.startView;

      if (this.o.calendarWeeks)
        this.picker.find('tfoot th.today')
            .attr('colspan', function (i, val) {
              return parseInt(val) + 1;
            });

      this._allow_update = false;

      this.setStartDate(this._o.startDate);
      this.setEndDate(this._o.endDate);
      this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

      this.fillDow();
      this.fillMonths();

      this._allow_update = true;

      this.update();
      this.showMode();

      if (this.isInline) {
        this.show();
      }
    };

    Datepicker.prototype = {
      constructor: Datepicker,

      _process_options: function (opts) {
        // Store raw options for reference
        this._o = $.extend({}, this._o, opts);
        // Processed options
        var o = this.o = $.extend({}, this._o);

        // Check if "de-DE" style date is available, if not language should
        // fallback to 2 letter code eg "de"
        var lang = o.language;
        if (!dates[lang]) {
          lang = lang.split('-')[0];
          if (!dates[lang])
            lang = defaults.language;
        }
        o.language = lang;

        switch (o.startView) {
          case 2:
          case 'decade':
            o.startView = 2;
            break;
          case 1:
          case 'year':
            o.startView = 1;
            break;
          default:
            o.startView = 0;
        }

        switch (o.minViewMode) {
          case 1:
          case 'months':
            o.minViewMode = 1;
            break;
          case 2:
          case 'years':
            o.minViewMode = 2;
            break;
          default:
            o.minViewMode = 0;
        }

        o.startView = Math.max(o.startView, o.minViewMode);

        // true, false, or Number > 0
        if (o.multidate !== true) {
          o.multidate = Number(o.multidate) || false;
          if (o.multidate !== false)
            o.multidate = Math.max(0, o.multidate);
          else
            o.multidate = 1;
        }
        o.multidateSeparator = String(o.multidateSeparator);

        o.weekStart %= 7;
        o.weekEnd = ((o.weekStart + 6) % 7);

        var format = DPGlobal.parseFormat(o.format);
        if (o.startDate !== -Infinity) {
          if (!o.startDate) {
            if (o.startDate instanceof Date)
              o.startDate = this._local_to_utc(this._zero_time(o.startDate));
            else
              o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
          } else {
            o.startDate = -Infinity;
          }
        }
        if (o.endDate !== Infinity) {
          if (!o.endDate) {
            if (o.endDate instanceof Date)
              o.endDate = this._local_to_utc(this._zero_time(o.endDate));
            else
              o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
          } else {
            o.endDate = Infinity;
          }
        }

        o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
        if (!$.isArray(o.daysOfWeekDisabled))
          o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
        o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
          return parseInt(d, 10);
        });

        var plc = String(o.orientation).toLowerCase().split(/\s+/g),
            _plc = o.orientation.toLowerCase();
        plc = $.grep(plc, function (word) {
          return (/^auto|left|right|top|bottom$/).test(word);
        });
        o.orientation = {x: 'auto', y: 'auto'};
        if (!_plc || _plc === 'auto')
          ; // no action
        else if (plc.length === 1) {
          switch (plc[0]) {
            case 'top':
            case 'bottom':
              o.orientation.y = plc[0];
              break;
            case 'left':
            case 'right':
              o.orientation.x = plc[0];
              break;
          }
        } else {
          _plc = $.grep(plc, function (word) {
            return (/^left|right$/).test(word);
          });
          o.orientation.x = _plc[0] || 'auto';

          _plc = $.grep(plc, function (word) {
            return (/^top|bottom$/).test(word);
          });
          o.orientation.y = _plc[0] || 'auto';
        }
      },
      _events: [],
      _secondaryEvents: [],
      _applyEvents: function (evs) {
        for (var i = 0, el, ch, ev; i < evs.length; i++) {
          el = evs[i][0];
          if (evs[i].length === 2) {
            ch = undefined;
            ev = evs[i][1];
          } else if (evs[i].length === 3) {
            ch = evs[i][1];
            ev = evs[i][2];
          }
          el.on(ev, ch);
        }
      },
      _unapplyEvents: function (evs) {
        for (var i = 0, el, ev, ch; i < evs.length; i++) {
          el = evs[i][0];
          if (evs[i].length === 2) {
            ch = undefined;
            ev = evs[i][1];
          } else if (evs[i].length === 3) {
            ch = evs[i][1];
            ev = evs[i][2];
          }
          el.off(ev, ch);
        }
      },
      _buildEvents: function () {
        if (this.isInput) { // single input
          this._events = [
            [this.element, {
              focus: $.proxy(this.show, this),
              keyup: $.proxy(function (e) {
                if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                  this.update();
              }, this),
              keydown: $.proxy(this.keydown, this)
            }]
          ];
        } else if (this.component && this.hasInput) { // component: input + button
          this._events = [
            // For components that are not readonly, allow keyboard nav
            [this.element.find('input'), {
              focus: $.proxy(this.show, this),
              keyup: $.proxy(function (e) {
                if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                  this.update();
              }, this),
              keydown: $.proxy(this.keydown, this)
            }],
            [this.component, {
              click: $.proxy(this.show, this)
            }]
          ];
        } else if (this.element.is('div')) {  // inline datepicker
          this.isInline = true;
        } else {
          this._events = [
            [this.element, {
              click: $.proxy(this.show, this)
            }]
          ];
        }
        this._events.push(
            // Component: listen for blur on element descendants
            [this.element, '*', {
              blur: $.proxy(function (e) {
                this._focused_from = e.target;
              }, this)
            }],
            // Input: listen for blur on element
            [this.element, {
              blur: $.proxy(function (e) {
                this._focused_from = e.target;
              }, this)
            }]
        );

        this._secondaryEvents = [
          [this.picker, {
            click: $.proxy(this.click, this)
          }],
          [$(window), {
            resize: $.proxy(this.place, this)
          }],
          [$(document), {
            'mousedown touchstart': $.proxy(function (e) {
              // Clicked outside the datepicker, hide it
              if (!(
                  this.element.is(e.target) ||
                  this.element.find(e.target).length ||
                  this.picker.is(e.target) ||
                  this.picker.find(e.target).length
              )) {
                this.hide();
              }
            }, this)
          }]
        ];
      },
      _attachEvents: function () {
        this._detachEvents();
        this._applyEvents(this._events);
      },
      _detachEvents: function () {
        this._unapplyEvents(this._events);
      },
      _attachSecondaryEvents: function () {
        this._detachSecondaryEvents();
        this._applyEvents(this._secondaryEvents);
      },
      _detachSecondaryEvents: function () {
        this._unapplyEvents(this._secondaryEvents);
      },
      _trigger: function (event, altdate) {
        var date = altdate || this.dates.get(-1),
            local_date = this._utc_to_local(date);

        this.element.trigger({
          type: event,
          date: local_date,
          dates: $.map(this.dates, this._utc_to_local),
          format: $.proxy(function (ix, format) {
            if (arguments.length === 0) {
              ix = this.dates.length - 1;
              format = this.o.format;
            } else if (typeof ix === 'string') {
              format = ix;
              ix = this.dates.length - 1;
            }
            format = format || this.o.format;
            var date = this.dates.get(ix);
            return DPGlobal.formatDate(date, format, this.o.language);
          }, this)
        });
      },

      show: function () {
        if (!this.isInline)
          this.picker.appendTo('body');
        this.picker.show();
        this.place();
        this._attachSecondaryEvents();
        this._trigger('show');
      },

      hide: function () {
        if (this.isInline)
          return;
        if (!this.picker.is(':visible'))
          return;
        this.focusDate = null;
        this.picker.hide().detach();
        this._detachSecondaryEvents();
        this.viewMode = this.o.startView;
        this.showMode();

        if (
            this.o.forceParse &&
            (
                this.isInput && this.element.val() ||
                this.hasInput && this.element.find('input').val()
            )
        )
          this.setValue();
        this._trigger('hide');
      },

      remove: function () {
        this.hide();
        this._detachEvents();
        this._detachSecondaryEvents();
        this.picker.remove();
        delete this.element.data().datepicker;
        if (!this.isInput) {
          delete this.element.data().date;
        }
      },

      _utc_to_local: function (utc) {
        return utc && new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));
      },
      _local_to_utc: function (local) {
        return local && new Date(local.getTime() - (local.getTimezoneOffset() * 60000));
      },
      _zero_time: function (local) {
        return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
      },
      _zero_utc_time: function (utc) {
        return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
      },

      getDates: function () {
        return $.map(this.dates, this._utc_to_local);
      },

      getUTCDates: function () {
        return $.map(this.dates, function (d) {
          return new Date(d);
        });
      },

      getDate: function () {
        return this._utc_to_local(this.getUTCDate());
      },

      getUTCDate: function () {
        return new Date(this.dates.get(-1));
      },

      setDates: function () {
        var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
        this.update.apply(this, args);
        this._trigger('changeDate');
        this.setValue();
      },

      setUTCDates: function () {
        var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
        this.update.apply(this, $.map(args, this._utc_to_local));
        this._trigger('changeDate');
        this.setValue();
      },

      setDate: alias('setDates'),
      setUTCDate: alias('setUTCDates'),

      setValue: function () {
        var formatted = this.getFormattedDate();
        if (!this.isInput) {
          if (this.component) {
            this.element.find('input').val(formatted).change();
          }
        } else {
          this.element.val(formatted).change();
        }
      },

      getFormattedDate: function (format) {
        if (format === undefined)
          format = this.o.format;

        var lang = this.o.language;
        return $.map(this.dates, function (d) {
          return DPGlobal.formatDate(d, format, lang);
        }).join(this.o.multidateSeparator);
      },

      setStartDate: function (startDate) {
        this._process_options({startDate: startDate});
        this.update();
        this.updateNavArrows();
      },

      setEndDate: function (endDate) {
        this._process_options({endDate: endDate});
        this.update();
        this.updateNavArrows();
      },

      setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
        this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
        this.update();
        this.updateNavArrows();
      },

      place: function () {
        if (this.isInline)
          return;
        var calendarWidth = this.picker.outerWidth(),
            calendarHeight = this.picker.outerHeight(),
            visualPadding = 10,
            windowWidth = $window.width(),
            windowHeight = $window.height(),
            scrollTop = $window.scrollTop();

        var zIndex = parseInt(this.element.parents().filter(function () {
          return $(this).css('z-index') !== 'auto';
        }).first().css('z-index')) + 10;
        var offset = this.component ? this.component.parent().offset() : this.element.offset();
        var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
        var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
        var left = offset.left,
            top = offset.top;

        this.picker.removeClass(
            'datepicker-orient-top datepicker-orient-bottom ' +
            'datepicker-orient-right datepicker-orient-left'
        );

        if (this.o.orientation.x !== 'auto') {
          this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
          if (this.o.orientation.x === 'right')
            left -= calendarWidth - width;
        }
            // auto x orientation is best-placement: if it crosses a window
        // edge, fudge it sideways
        else {
          // Default to left
          this.picker.addClass('datepicker-orient-left');
          if (offset.left < 0)
            left -= offset.left - visualPadding;
          else if (offset.left + calendarWidth > windowWidth)
            left = windowWidth - calendarWidth - visualPadding;
        }

        // auto y orientation is best-situation: top or bottom, no fudging,
        // decision based on which shows more of the calendar
        var yorient = this.o.orientation.y,
            top_overflow, bottom_overflow;
        if (yorient === 'auto') {
          top_overflow = -scrollTop + offset.top - calendarHeight;
          bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
          if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
            yorient = 'top';
          else
            yorient = 'bottom';
        }
        this.picker.addClass('datepicker-orient-' + yorient);
        if (yorient === 'top')
          top += height;
        else
          top -= calendarHeight + parseInt(this.picker.css('padding-top'));

        this.picker.css({
          top: top,
          left: left,
          zIndex: zIndex
        });
      },

      _allow_update: true,
      update: function () {
        if (!this._allow_update)
          return;

        var oldDates = this.dates.copy(),
            dates = [],
            fromArgs = false;
        if (arguments.length) {
          $.each(arguments, $.proxy(function (i, date) {
            if (date instanceof Date)
              date = this._local_to_utc(date);
            dates.push(date);
          }, this));
          fromArgs = true;
        } else {
          dates = this.isInput
              ? this.element.val()
              : this.element.data('date') || this.element.find('input').val();
          if (dates && this.o.multidate)
            dates = dates.split(this.o.multidateSeparator);
          else
            dates = [dates];
          delete this.element.data().date;
        }

        dates = $.map(dates, $.proxy(function (date) {
          return DPGlobal.parseDate(date, this.o.format, this.o.language);
        }, this));
        dates = $.grep(dates, $.proxy(function (date) {
          return (
              date < this.o.startDate ||
              date > this.o.endDate ||
              !date
          );
        }, this), true);
        this.dates.replace(dates);

        if (this.dates.length)
          this.viewDate = new Date(this.dates.get(-1));
        else if (this.viewDate < this.o.startDate)
          this.viewDate = new Date(this.o.startDate);
        else if (this.viewDate > this.o.endDate)
          this.viewDate = new Date(this.o.endDate);

        if (fromArgs) {
          // setting date by clicking
          this.setValue();
        } else if (dates.length) {
          // setting date by typing
          if (String(oldDates) !== String(this.dates))
            this._trigger('changeDate');
        }
        if (!this.dates.length && oldDates.length)
          this._trigger('clearDate');

        this.fill();
      },

      fillDow: function () {
        var dowCnt = this.o.weekStart,
            html = '<tr>';
        if (this.o.calendarWeeks) {
          var cell = '<th class="cw">&nbsp;</th>';
          html += cell;
          this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
        }
        while (dowCnt < this.o.weekStart + 7) {
          html += '<th class="dow">' + dates[this.o.language].daysMin[(dowCnt++) % 7] + '</th>';
        }
        html += '</tr>';
        this.picker.find('.datepicker-days thead').append(html);
      },

      fillMonths: function () {
        var html = '',
            i = 0;
        while (i < 12) {
          html += '<span class="month">' + dates[this.o.language].monthsShort[i++] + '</span>';
        }
        this.picker.find('.datepicker-months td').html(html);
      },

      setRange: function (range) {
        if (!range || !range.length)
          delete this.range;
        else
          this.range = $.map(range, function (d) {
            return d.valueOf();
          });
        this.fill();
      },

      getClassNames: function (date) {
        var cls = [],
            year = this.viewDate.getUTCFullYear(),
            month = this.viewDate.getUTCMonth(),
            today = new Date();
        if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)) {
          cls.push('old');
        } else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)) {
          cls.push('new');
        }
        if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
          cls.push('focused');
        // Compare internal UTC date with local today, not UTC today
        if (this.o.todayHighlight &&
            date.getUTCFullYear() === today.getFullYear() &&
            date.getUTCMonth() === today.getMonth() &&
            date.getUTCDate() === today.getDate()) {
          cls.push('today');
        }
        if (this.dates.contains(date) !== -1)
          cls.push('active');
        if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
            $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
          cls.push('disabled');
        }
        if (this.range) {
          if (date > this.range[0] && date < this.range[this.range.length - 1]) {
            cls.push('range');
          }
          if ($.inArray(date.valueOf(), this.range) !== -1) {
            cls.push('selected');
          }
        }
        return cls;
      },

      fill: function () {
        var d = new Date(this.viewDate),
            year = d.getUTCFullYear(),
            month = d.getUTCMonth(),
            startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
            startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
            endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
            endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
            todaytxt = dates[this.o.language].today || dates['en'].today || '',
            cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
            tooltip;
        this.picker.find('.datepicker-days thead th.datepicker-switch')
            .text(dates[this.o.language].months[month] + ' ' + year);
        this.picker.find('tfoot th.today')
            .text(todaytxt)
            .toggle(this.o.todayBtn !== false);
        this.picker.find('tfoot th.clear')
            .text(cleartxt)
            .toggle(this.o.clearBtn !== false);
        this.updateNavArrows();
        this.fillMonths();
        var prevMonth = UTCDate(year, month - 1, 28),
            day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
        prevMonth.setUTCDate(day);
        prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
        var nextMonth = new Date(prevMonth);
        nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
        nextMonth = nextMonth.valueOf();
        var html = [];
        var clsName;
        while (prevMonth.valueOf() < nextMonth) {
          if (prevMonth.getUTCDay() === this.o.weekStart) {
            html.push('<tr>');
            if (this.o.calendarWeeks) {
              // ISO 8601: First week contains first thursday.
              // ISO also states week starts on Monday, but we can be more abstract here.
              var
                  // Start of current week: based on weekstart/current date
                  ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
                  // Thursday of this week
                  th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
                  // First Thursday of year, year from thursday
                  yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
                  // Calendar week: ms between thursdays, div ms per day, div 7 days
                  calWeek = (th - yth) / 864e5 / 7 + 1;
              html.push('<td class="cw">' + calWeek + '</td>');

            }
          }
          clsName = this.getClassNames(prevMonth);
          clsName.push('day');

          if (this.o.beforeShowDay !== $.noop) {
            var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
            if (before === undefined)
              before = {};
            else if (typeof (before) === 'boolean')
              before = {enabled: before};
            else if (typeof (before) === 'string')
              before = {classes: before};
            if (before.enabled === false)
              clsName.push('disabled');
            if (before.classes)
              clsName = clsName.concat(before.classes.split(/\s+/));
            if (before.tooltip)
              tooltip = before.tooltip;
          }

          clsName = $.unique(clsName);
          html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + prevMonth.getUTCDate() + '</td>');
          if (prevMonth.getUTCDay() === this.o.weekEnd) {
            html.push('</tr>');
          }
          prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
        }
        this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

        var months = this.picker.find('.datepicker-months')
            .find('th:eq(1)')
            .text(year)
            .end()
            .find('span').removeClass('active');

        $.each(this.dates, function (i, d) {
          if (d.getUTCFullYear() === year)
            months.eq(d.getUTCMonth()).addClass('active');
        });

        if (year < startYear || year > endYear) {
          months.addClass('disabled');
        }
        if (year === startYear) {
          months.slice(0, startMonth).addClass('disabled');
        }
        if (year === endYear) {
          months.slice(endMonth + 1).addClass('disabled');
        }

        html = '';
        year = parseInt(year / 10, 10) * 10;
        var yearCont = this.picker.find('.datepicker-years')
            .find('th:eq(1)')
            .text(year + '-' + (year + 9))
            .end()
            .find('td');
        year -= 1;
        var years = $.map(this.dates, function (d) {
              return d.getUTCFullYear();
            }),
            classes;
        for (var i = -1; i < 11; i++) {
          classes = ['year'];
          if (i === -1)
            classes.push('old');
          else if (i === 10)
            classes.push('new');
          if ($.inArray(year, years) !== -1)
            classes.push('active');
          if (year < startYear || year > endYear)
            classes.push('disabled');
          html += '<span class="' + classes.join(' ') + '">' + year + '</span>';
          year += 1;
        }
        yearCont.html(html);
      },

      updateNavArrows: function () {
        if (!this._allow_update)
          return;

        var d = new Date(this.viewDate),
            year = d.getUTCFullYear(),
            month = d.getUTCMonth();
        switch (this.viewMode) {
          case 0:
            if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
              this.picker.find('.prev').css({visibility: 'hidden'});
            } else {
              this.picker.find('.prev').css({visibility: 'visible'});
            }
            if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
              this.picker.find('.next').css({visibility: 'hidden'});
            } else {
              this.picker.find('.next').css({visibility: 'visible'});
            }
            break;
          case 1:
          case 2:
            if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
              this.picker.find('.prev').css({visibility: 'hidden'});
            } else {
              this.picker.find('.prev').css({visibility: 'visible'});
            }
            if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
              this.picker.find('.next').css({visibility: 'hidden'});
            } else {
              this.picker.find('.next').css({visibility: 'visible'});
            }
            break;
        }
      },

      click: function (e) {
        e.preventDefault();
        var target = $(e.target).closest('span, td, th'),
            year, month, day;
        if (target.length === 1) {
          switch (target[0].nodeName.toLowerCase()) {
            case 'th':
              switch (target[0].className) {
                case 'datepicker-switch':
                  this.showMode(1);
                  break;
                case 'prev':
                case 'next':
                  var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
                  switch (this.viewMode) {
                    case 0:
                      this.viewDate = this.moveMonth(this.viewDate, dir);
                      this._trigger('changeMonth', this.viewDate);
                      break;
                    case 1:
                    case 2:
                      this.viewDate = this.moveYear(this.viewDate, dir);
                      if (this.viewMode === 1)
                        this._trigger('changeYear', this.viewDate);
                      break;
                  }
                  this.fill();
                  break;
                case 'today':
                  var date = new Date();
                  date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

                  this.showMode(-2);
                  var which = this.o.todayBtn === 'linked' ? null : 'view';
                  this._setDate(date, which);
                  break;
                case 'clear':
                  var element;
                  if (this.isInput)
                    element = this.element;
                  else if (this.component)
                    element = this.element.find('input');
                  if (element)
                    element.val("").change();
                  this.update();
                  this._trigger('changeDate');
                  if (this.o.autoclose)
                    this.hide();
                  break;
              }
              break;
            case 'span':
              if (!target.is('.disabled')) {
                this.viewDate.setUTCDate(1);
                if (target.is('.month')) {
                  day = 1;
                  month = target.parent().find('span').index(target);
                  year = this.viewDate.getUTCFullYear();
                  this.viewDate.setUTCMonth(month);
                  this._trigger('changeMonth', this.viewDate);
                  if (this.o.minViewMode === 1) {
                    this._setDate(UTCDate(year, month, day));
                  }
                } else {
                  day = 1;
                  month = 0;
                  year = parseInt(target.text(), 10) || 0;
                  this.viewDate.setUTCFullYear(year);
                  this._trigger('changeYear', this.viewDate);
                  if (this.o.minViewMode === 2) {
                    this._setDate(UTCDate(year, month, day));
                  }
                }
                this.showMode(-1);
                this.fill();
              }
              break;
            case 'td':
              if (target.is('.day') && !target.is('.disabled')) {
                day = parseInt(target.text(), 10) || 1;
                year = this.viewDate.getUTCFullYear();
                month = this.viewDate.getUTCMonth();
                if (target.is('.old')) {
                  if (month === 0) {
                    month = 11;
                    year -= 1;
                  } else {
                    month -= 1;
                  }
                } else if (target.is('.new')) {
                  if (month === 11) {
                    month = 0;
                    year += 1;
                  } else {
                    month += 1;
                  }
                }
                this._setDate(UTCDate(year, month, day));
              }
              break;
          }
        }
        if (this.picker.is(':visible') && this._focused_from) {
          $(this._focused_from).focus();
        }
        delete this._focused_from;
      },

      _toggle_multidate: function (date) {
        var ix = this.dates.contains(date);
        if (!date) {
          this.dates.clear();
        } else if (ix !== -1) {
          this.dates.remove(ix);
        } else {
          this.dates.push(date);
        }
        if (typeof this.o.multidate === 'number')
          while (this.dates.length > this.o.multidate)
            this.dates.remove(0);
      },

      _setDate: function (date, which) {
        if (!which || which === 'date')
          this._toggle_multidate(date && new Date(date));
        if (!which || which === 'view')
          this.viewDate = date && new Date(date);

        this.fill();
        this.setValue();
        this._trigger('changeDate');
        var element;
        if (this.isInput) {
          element = this.element;
        } else if (this.component) {
          element = this.element.find('input');
        }
        if (element) {
          element.change();
        }
        if (this.o.autoclose && (!which || which === 'date')) {
          this.hide();
        }
      },

      moveMonth: function (date, dir) {
        if (!date)
          return undefined;
        if (!dir)
          return date;
        var new_date = new Date(date.valueOf()),
            day = new_date.getUTCDate(),
            month = new_date.getUTCMonth(),
            mag = Math.abs(dir),
            new_month, test;
        dir = dir > 0 ? 1 : -1;
        if (mag === 1) {
          test = dir === -1
              // If going back one month, make sure month is not current month
              // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
              ? function () {
                return new_date.getUTCMonth() === month;
              }
              // If going forward one month, make sure month is as expected
              // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
              : function () {
                return new_date.getUTCMonth() !== new_month;
              };
          new_month = month + dir;
          new_date.setUTCMonth(new_month);
          // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
          if (new_month < 0 || new_month > 11)
            new_month = (new_month + 12) % 12;
        } else {
          // For magnitudes >1, move one month at a time...
          for (var i = 0; i < mag; i++)
              // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
            new_date = this.moveMonth(new_date, dir);
          // ...then reset the day, keeping it in the new month
          new_month = new_date.getUTCMonth();
          new_date.setUTCDate(day);
          test = function () {
            return new_month !== new_date.getUTCMonth();
          };
        }
        // Common date-resetting loop -- if date is beyond end of month, make it
        // end of month
        while (test()) {
          new_date.setUTCDate(--day);
          new_date.setUTCMonth(new_month);
        }
        return new_date;
      },

      moveYear: function (date, dir) {
        return this.moveMonth(date, dir * 12);
      },

      dateWithinRange: function (date) {
        return date >= this.o.startDate && date <= this.o.endDate;
      },

      keydown: function (e) {
        if (this.picker.is(':not(:visible)')) {
          if (e.keyCode === 27) // allow escape to hide and re-show picker
            this.show();
          return;
        }
        var dateChanged = false,
            dir, newDate, newViewDate,
            focusDate = this.focusDate || this.viewDate;
        switch (e.keyCode) {
          case 27: // escape
            if (this.focusDate) {
              this.focusDate = null;
              this.viewDate = this.dates.get(-1) || this.viewDate;
              this.fill();
            } else
              this.hide();
            e.preventDefault();
            break;
          case 37: // left
          case 39: // right
            if (!this.o.keyboardNavigation)
              break;
            dir = e.keyCode === 37 ? -1 : 1;
            if (e.ctrlKey) {
              newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
              newViewDate = this.moveYear(focusDate, dir);
              this._trigger('changeYear', this.viewDate);
            } else if (e.shiftKey) {
              newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
              newViewDate = this.moveMonth(focusDate, dir);
              this._trigger('changeMonth', this.viewDate);
            } else {
              newDate = new Date(this.dates.get(-1) || UTCToday());
              newDate.setUTCDate(newDate.getUTCDate() + dir);
              newViewDate = new Date(focusDate);
              newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
            }
            if (this.dateWithinRange(newDate)) {
              this.focusDate = this.viewDate = newViewDate;
              this.setValue();
              this.fill();
              e.preventDefault();
            }
            break;
          case 38: // up
          case 40: // down
            if (!this.o.keyboardNavigation)
              break;
            dir = e.keyCode === 38 ? -1 : 1;
            if (e.ctrlKey) {
              newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
              newViewDate = this.moveYear(focusDate, dir);
              this._trigger('changeYear', this.viewDate);
            } else if (e.shiftKey) {
              newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
              newViewDate = this.moveMonth(focusDate, dir);
              this._trigger('changeMonth', this.viewDate);
            } else {
              newDate = new Date(this.dates.get(-1) || UTCToday());
              newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
              newViewDate = new Date(focusDate);
              newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
            }
            if (this.dateWithinRange(newDate)) {
              this.focusDate = this.viewDate = newViewDate;
              this.setValue();
              this.fill();
              e.preventDefault();
            }
            break;
          case 32: // spacebar
            // Spacebar is used in manually typing dates in some formats.
            // As such, its behavior should not be hijacked.
            break;
          case 13: // enter
            focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
            this._toggle_multidate(focusDate);
            dateChanged = true;
            this.focusDate = null;
            this.viewDate = this.dates.get(-1) || this.viewDate;
            this.setValue();
            this.fill();
            if (this.picker.is(':visible')) {
              e.preventDefault();
              if (this.o.autoclose)
                this.hide();
            }
            break;
          case 9: // tab
            this.focusDate = null;
            this.viewDate = this.dates.get(-1) || this.viewDate;
            this.fill();
            this.hide();
            break;
        }
        if (dateChanged) {
          if (this.dates.length)
            this._trigger('changeDate');
          else
            this._trigger('clearDate');
          var element;
          if (this.isInput) {
            element = this.element;
          } else if (this.component) {
            element = this.element.find('input');
          }
          if (element) {
            element.change();
          }
        }
      },

      showMode: function (dir) {
        if (dir) {
          this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
        }
        this.picker
            .find('>div')
            .hide()
            .filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
            .css('display', 'block');
        this.updateNavArrows();
      }
    };

    var DateRangePicker = function (element, options) {
      this.element = $(element);
      this.inputs = $.map(options.inputs, function (i) {
        return i.jquery ? i[0] : i;
      });
      delete options.inputs;

      $(this.inputs)
          .datepicker(options)
          .bind('changeDate', $.proxy(this.dateUpdated, this));

      this.pickers = $.map(this.inputs, function (i) {
        return $(i).data('datepicker');
      });
      this.updateDates();
    };
    DateRangePicker.prototype = {
      updateDates: function () {
        this.dates = $.map(this.pickers, function (i) {
          return i.getUTCDate();
        });
        this.updateRanges();
      },
      updateRanges: function () {
        var range = $.map(this.dates, function (d) {
          return d.valueOf();
        });
        $.each(this.pickers, function (i, p) {
          p.setRange(range);
        });
      },
      dateUpdated: function (e) {
        // `this.updating` is a workaround for preventing infinite recursion
        // between `changeDate` triggering and `setUTCDate` calling.  Until
        // there is a better mechanism.
        if (this.updating)
          return;
        this.updating = true;

        var dp = $(e.target).data('datepicker'),
            new_date = dp.getUTCDate(),
            i = $.inArray(e.target, this.inputs),
            l = this.inputs.length;
        if (i === -1)
          return;

        $.each(this.pickers, function (i, p) {
          if (!p.getUTCDate())
            p.setUTCDate(new_date);
        });

        if (new_date < this.dates[i]) {
          // Date being moved earlier/left
          while (i >= 0 && new_date < this.dates[i]) {
            this.pickers[i--].setUTCDate(new_date);
          }
        } else if (new_date > this.dates[i]) {
          // Date being moved later/right
          while (i < l && new_date > this.dates[i]) {
            this.pickers[i++].setUTCDate(new_date);
          }
        }
        this.updateDates();

        delete this.updating;
      },
      remove: function () {
        $.map(this.pickers, function (p) {
          p.remove();
        });
        delete this.element.data().datepicker;
      }
    };

    function opts_from_el(el, prefix) {
      // Derive options from element data-attrs
      var data = $(el).data(),
          out = {}, inkey,
          replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
      prefix = new RegExp('^' + prefix.toLowerCase());

      function re_lower(_, a) {
        return a.toLowerCase();
      }

      for (var key in data)
        if (prefix.test(key)) {
          inkey = key.replace(replace, re_lower);
          out[inkey] = data[key];
        }
      return out;
    }

    function opts_from_locale(lang) {
      // Derive options from locale plugins
      var out = {};
      // Check if "de-DE" style date is available, if not language should
      // fallback to 2 letter code eg "de"
      if (!dates[lang]) {
        lang = lang.split('-')[0];
        if (!dates[lang])
          return;
      }
      var d = dates[lang];
      $.each(locale_opts, function (i, k) {
        if (k in d)
          out[k] = d[k];
      });
      return out;
    }

    var old = $.fn.datepicker;
    $.fn.datepicker = function (option) {
      var args = Array.apply(null, arguments);
      args.shift();
      var internal_return;
      this.each(function () {
        var $this = $(this),
            data = $this.data('datepicker'),
            options = typeof option === 'object' && option;
        if (!data) {
          var elopts = opts_from_el(this, 'date'),
              // Preliminary otions
              xopts = $.extend({}, defaults, elopts, options),
              locopts = opts_from_locale(xopts.language),
              // Options priority: js args, data-attrs, locales, defaults
              opts = $.extend({}, defaults, locopts, elopts, options);
          if ($this.is('.input-daterange') || opts.inputs) {
            var ropts = {
              inputs: opts.inputs || $this.find('input').toArray()
            };
            $this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
          } else {
            $this.data('datepicker', (data = new Datepicker(this, opts)));
          }
        }
        if (typeof option === 'string' && typeof data[option] === 'function') {
          internal_return = data[option].apply(data, args);
          if (internal_return !== undefined)
            return false;
        }
      });
      if (internal_return !== undefined)
        return internal_return;
      else
        return this;
    };

    var defaults = $.fn.datepicker.defaults = {
      autoclose: false,
      beforeShowDay: $.noop,
      calendarWeeks: false,
      clearBtn: false,
      daysOfWeekDisabled: [],
      endDate: Infinity,
      forceParse: true,
      format: 'mm/dd/yyyy',
      keyboardNavigation: true,
      language: 'en',
      minViewMode: 0,
      multidate: false,
      multidateSeparator: ',',
      orientation: "auto",
      rtl: false,
      startDate: -Infinity,
      startView: 0,
      todayBtn: false,
      todayHighlight: false,
      weekStart: 0
    };
    var locale_opts = $.fn.datepicker.locale_opts = [
      'format',
      'rtl',
      'weekStart'
    ];
    $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
      en: {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: "Today",
        clear: "Clear"
      }
    };

    var DPGlobal = {
      modes: [
        {
          clsName: 'days',
          navFnc: 'Month',
          navStep: 1
        },
        {
          clsName: 'months',
          navFnc: 'FullYear',
          navStep: 1
        },
        {
          clsName: 'years',
          navFnc: 'FullYear',
          navStep: 10
        }],
      isLeapYear: function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
      },
      getDaysInMonth: function (year, month) {
        return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      },
      validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
      nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
      parseFormat: function (format) {
        // IE treats \0 as a string end in inputs (truncating the value),
        // so it's a bad format delimiter, anyway
        var separators = format.replace(this.validParts, '\0').split('\0'),
            parts = format.match(this.validParts);
        if (!separators || !separators.length || !parts || parts.length === 0) {
          throw new Error("Invalid date format.");
        }
        return {separators: separators, parts: parts};
      },
      parseDate: function (date, format, language) {
        if (!date)
          return undefined;
        if (date instanceof Date)
          return date;
        if (typeof format === 'string')
          format = DPGlobal.parseFormat(format);
        var part_re = /([\-+]\d+)([dmwy])/,
            parts = date.match(/([\-+]\d+)([dmwy])/g),
            part, dir, i;
        if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
          date = new Date();
          for (i = 0; i < parts.length; i++) {
            part = part_re.exec(parts[i]);
            dir = parseInt(part[1]);
            switch (part[2]) {
              case 'd':
                date.setUTCDate(date.getUTCDate() + dir);
                break;
              case 'm':
                date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                break;
              case 'w':
                date.setUTCDate(date.getUTCDate() + dir * 7);
                break;
              case 'y':
                date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
                break;
            }
          }
          return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
        }
        parts = date && date.match(this.nonpunctuation) || [];
        date = new Date();
        var parsed = {},
            setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
            setters_map = {
              yyyy: function (d, v) {
                return d.setUTCFullYear(v);
              },
              yy: function (d, v) {
                return d.setUTCFullYear(2000 + v);
              },
              m: function (d, v) {
                if (isNaN(d))
                  return d;
                v -= 1;
                while (v < 0) v += 12;
                v %= 12;
                d.setUTCMonth(v);
                while (d.getUTCMonth() !== v)
                  d.setUTCDate(d.getUTCDate() - 1);
                return d;
              },
              d: function (d, v) {
                return d.setUTCDate(v);
              }
            },
            val, filtered;
        setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
        setters_map['dd'] = setters_map['d'];
        date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        var fparts = format.parts.slice();
        // Remove noop parts
        if (parts.length !== fparts.length) {
          fparts = $(fparts).filter(function (i, p) {
            return $.inArray(p, setters_order) !== -1;
          }).toArray();
        }

        // Process remainder
        function match_part() {
          var m = this.slice(0, parts[i].length),
              p = parts[i].slice(0, m.length);
          return m === p;
        }

        if (parts.length === fparts.length) {
          var cnt;
          for (i = 0, cnt = fparts.length; i < cnt; i++) {
            val = parseInt(parts[i], 10);
            part = fparts[i];
            if (isNaN(val)) {
              switch (part) {
                case 'MM':
                  filtered = $(dates[language].months).filter(match_part);
                  val = $.inArray(filtered[0], dates[language].months) + 1;
                  break;
                case 'M':
                  filtered = $(dates[language].monthsShort).filter(match_part);
                  val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                  break;
              }
            }
            parsed[part] = val;
          }
          var _date, s;
          for (i = 0; i < setters_order.length; i++) {
            s = setters_order[i];
            if (s in parsed && !isNaN(parsed[s])) {
              _date = new Date(date);
              setters_map[s](_date, parsed[s]);
              if (!isNaN(_date))
                date = _date;
            }
          }
        }
        return date;
      },
      formatDate: function (date, format, language) {
        if (!date)
          return '';
        if (typeof format === 'string')
          format = DPGlobal.parseFormat(format);
        var val = {
          d: date.getUTCDate(),
          D: dates[language].daysShort[date.getUTCDay()],
          DD: dates[language].days[date.getUTCDay()],
          m: date.getUTCMonth() + 1,
          M: dates[language].monthsShort[date.getUTCMonth()],
          MM: dates[language].months[date.getUTCMonth()],
          yy: date.getUTCFullYear().toString().substring(2),
          yyyy: date.getUTCFullYear()
        };
        val.dd = (val.d < 10 ? '0' : '') + val.d;
        val.mm = (val.m < 10 ? '0' : '') + val.m;
        date = [];
        var seps = $.extend([], format.separators);
        for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
          if (seps.length)
            date.push(seps.shift());
          date.push(val[format.parts[i]]);
        }
        return date.join('');
      },
      headTemplate: '<thead>' +
          '<tr>' +
          '<th class="prev">&laquo;</th>' +
          '<th colspan="5" class="datepicker-switch"></th>' +
          '<th class="next">&raquo;</th>' +
          '</tr>' +
          '</thead>',
      contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
      footTemplate: '<tfoot>' +
          '<tr>' +
          '<th colspan="7" class="today"></th>' +
          '</tr>' +
          '<tr>' +
          '<th colspan="7" class="clear"></th>' +
          '</tr>' +
          '</tfoot>'
    };
    DPGlobal.template = '<div class="datepicker">' +
        '<div class="datepicker-days">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplate +
        '<tbody></tbody>' +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '<div class="datepicker-months">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '<div class="datepicker-years">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplate +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate +
        '</table>' +
        '</div>' +
        '</div>';

    $.fn.datepicker.DPGlobal = DPGlobal;


    /* DATEPICKER NO CONFLICT
    * =================== */

    $.fn.datepicker.noConflict = function () {
      $.fn.datepicker = old;
      return this;
    };


    /* DATEPICKER DATA-API
    * ================== */

    $(document).on(
        'focus.datepicker.data-api click.datepicker.data-api',
        '[data-provide="datepicker"]',
        function (e) {
          var $this = $(this);
          if ($this.data('datepicker'))
            return;
          e.preventDefault();
          // component click requires us to explicitly show it
          $this.datepicker('show');
        }
    );
    $(function () {
      $('[data-provide="datepicker-inline"]').datepicker();
    });

  })($);
// 这里是原来的 JavaScript 代码 jquery.appear.js
  (function ($) {
    $.fn.appear = function (fn, options) {

      var settings = $.extend({

        //arbitrary data to pass to fn
        data: undefined,

        //call fn only on the first appear?
        one: true,

        // X & Y accuracy
        accX: 0,
        accY: 0

      }, options);

      return this.each(function () {

        var t = $(this);

        //whether the element is currently visible
        t.appeared = false;

        if (!fn) {

          //trigger the custom event
          t.trigger('appear', settings.data);
          return;
        }

        var w = $(window);

        //fires the appear event when appropriate
        var check = function () {

          //is the element hidden?
          if (!t.is(':visible')) {

            //it became hidden
            t.appeared = false;
            return;
          }

          //is the element inside the visible window?
          var a = w.scrollLeft();
          var b = w.scrollTop();
          var o = t.offset();
          var x = o.left;
          var y = o.top;

          var ax = settings.accX;
          var ay = settings.accY;
          var th = t.height();
          var wh = w.height();
          var tw = t.width();
          var ww = w.width();

          if (y + th + ay >= b &&
              y <= b + wh + ay &&
              x + tw + ax >= a &&
              x <= a + ww + ax) {

            //trigger the custom event
            if (!t.appeared) t.trigger('appear', settings.data);

          } else {

            //it scrolled out of view
            t.appeared = false;
          }
        };

        //create a modified fn with some additional logic
        var modifiedFn = function () {

          //mark the element as visible
          t.appeared = true;

          //is this supposed to happen only once?
          if (settings.one) {

            //remove the check
            w.unbind('scroll', check);
            var i = $.inArray(check, $.fn.appear.checks);
            if (i >= 0) $.fn.appear.checks.splice(i, 1);
          }

          //trigger the original fn
          fn.apply(this, arguments);
        };

        //bind the modified fn to the element
        if (settings.one) t.one('appear', settings.data, modifiedFn);
        else t.bind('appear', settings.data, modifiedFn);

        //check whenever the window scrolls
        w.scroll(check);

        //check whenever the dom changes
        $.fn.appear.checks.push(check);

        //check now
        (check)();
      });
    };

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

      checks: [],
      timeout: null,

      //process the queue
      checkAll: function () {
        var length = $.fn.appear.checks.length;
        if (length > 0) while (length--) ($.fn.appear.checks[length])();
      },

      //check the queue asynchronously
      run: function () {
        if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
        $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
      }
    });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
      'removeAttr', 'addClass', 'removeClass', 'toggleClass',
      'remove', 'css', 'show', 'hide'], function (i, n) {
      var old = $.fn[n];
      if (old) {
        $.fn[n] = function () {
          var r = old.apply(this, arguments);
          $.fn.appear.run();
          return r;
        }
      }
    });

  })($);
// 这里是原来的 JavaScript 代码 main1.js
  (function ($) {
    "use strict";


    /*=============================================
              =     Menu sticky & Scroll to top      =
          =============================================*/
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $("#sticky-header").removeClass("sticky-menu");
        $('.scroll-to-target').removeClass('open');

      } else {
        $("#sticky-header").addClass("sticky-menu");
        $('.scroll-to-target').addClass('open');
      }
    });

    /*=============================================
              =    		 Scroll Up  	         =
          =============================================*/
    if ($('.scroll-to-target').length) {
      $(".scroll-to-target").on('click', function () {
        var target = $(this).attr('data-target');
        // animate
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000);

      });
    }

    /*=============================================
              =           DatePicker Active             =
          =============================================*/
    $(function () {
      $(".form-grp .date").datepicker({
        autoclose: true,
        todayHighlight: true
      }).datepicker('update', new Date());
    });


    /*=============================================
              =    		Odometer Active  	       =
          =============================================*/
    $('.odometer').appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });


//for menu active class
    $('.fly-next-nav button, .content-top li, .gender-select ul li').on('click', function (event) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
    });

  })($);
  // 获取航班地点
  axios.get('http://localhost:8080/starAirlines/flight_address').then((response) => {
    console.log(response.data.data);
    address.value = response.data.data
    depart.value = address.value[0]
    arrival.value = address.value[1]
  })
  axios.get('http://localhost:8080/starAirlines/flight?date=2023-06-30').then((response) => {
    console.log(response.data.data)
    let all_flights = []
    let filtered_flights=[]
    let depart_T = ''
    let arrival_T = ''
    const temp = [[], [], [], [], []]
    all_flights = response.data.data
    for (let i = 0; i < all_flights.length; i++) {
      if (all_flights[i]['type']==1)
        filtered_flights.push(all_flights[i])
    }
    console.log(filtered_flights)
    for (let i = 0; i < 7; i++) {
      if (i==4 || i==5){
        continue
      }
      temp[0].push(filtered_flights[i]['depart'])
      temp[1].push(filtered_flights[i]['arrival'])
      depart_T = filtered_flights[i]['departTime']
      temp[2].push(depart_T.substring(0, 4) + '/' + depart_T.substring(5, 7) + '/' + depart_T.substring(8, 10))
      arrival_T = filtered_flights[i]['arrivalTime']
      temp[3].push(arrival_T.substring(0, 4) + '/' + arrival_T.substring(5, 7) + '/' + arrival_T.substring(8, 10))
      temp[4].push(filtered_flights[i]['price'])
    }
    console.log(temp)
    departs.value = temp[0]
    arrivals.value = temp[1]
    depart_time.value = temp[2]
    arrival_time.value = temp[3]
    prices.value = temp[4]
  })
});
const open = () => {
  ElMessageBox.alert('Blanket<br> Gift card<br>Canvas bag', 'Redemption Items', {
    confirmButtonText: 'OK', dangerouslyUseHTMLString: true,
  })
}


// 实现页面跳转
const navigateToAnotherPage1 = () => {
  router.push('/userinfo'); // 替换 '/another-page' 为你想要跳转的实际路由路径
  console.log('true')
};
const navigateToAnotherPage2 = () => {
  router.push('/login'); // 替换 '/another-page' 为你想要跳转的实际路由路径
  console.log('true')
};
const methods = {
  navigateToAnotherPage1,
};

//忽略element-plus 报错 ResizeObserver loop limit exceeded
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

</script>


<template>
  <html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="public/favicon.ico">
  </head>

  <body>


  <!-- Scroll-top 返回页顶按钮 在style.css-->
  <button class="scroll-top scroll-to-target" data-target="html">
    <i class="fas fa-angle-up"></i>
  </button>
  <!-- Scroll-top-end-->

   <index-header1></index-header1>

  <!-- main-area -->
  <main>

    <!-- slider-area -->
    <section class="slider-area">
      <div class="slider-active">
        <el-carousel height="auto" autoplay>
          <el-carousel-item style="height: 800px">
            <div class="single-slider slider-bg"><!--第一条轮播-->
              <div class="container">
                <div class="row">
                  <div class="col-xl-8 col-lg-10">
                    <div class="slider-content">
                      <h2 class="title" data-animation="fadeInUp" data-delay=".2s">Start your journey with us.</h2>
                      <p data-animation="fadeInUp" data-delay=".4s">Get rewarded for your travels – unlock instant
                        savings of 10% or more with a free Star Airlines account</p>
                      <!--                  <a href="#" class="btn" data-animation="fadeInUp" data-delay=".6s">Sign in / Register</a>-->
<!--                      <button class="btn" data-animation="fadeInUp" data-delay=".6s" @click="navigateToAnotherPage2">-->
                        <button class="btn" data-animation="fadeInUp" data-delay=".6s" @click="navigateToAnotherPage2">
                        Sign in / Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item style="height: 800px">
            <div class="single-slider slider-bg2">
              <div class="container">
                <div class="row">
                  <div class="col-xl-8 col-lg-10">
                    <div class="slider-content">
                      <h2 class="title" data-animation="fadeInUp" data-delay=".2s">A Lifetime of Discounts? It's
                        Genius.</h2>
                      <p data-animation="fadeInUp" data-delay=".4s">Get rewarded for your travels – unlock instant
                        savings of 10% or more with a free Star Airlines account</p>
                      <button class="btn" data-animation="fadeInUp" data-delay=".6s" @click="navigateToAnotherPage2">
                        Sign in / Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item style="height: 800px">
            <div class="single-slider slider-bg3">
              <div class="container">
                <div class="row">
                  <div class="col-xl-8 col-lg-10">
                    <div class="slider-content">
                      <h2 class="title" data-animation="fadeInUp" data-delay=".2s">A Lifetime of Discounts? It's
                        Genius.</h2>
                      <p data-animation="fadeInUp" data-delay=".4s">Get rewarded for your travels – unlock instant
                        savings of 10% or more with a free Star Airlines account</p>
                      <button class="btn" data-animation="fadeInUp" data-delay=".6s" @click="navigateToAnotherPage2">
                        Sign in / Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <!-- slider-area-end -->

    <!-- booking-area -->
    <div class="booking-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="booking-wrap">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="air-tab" data-bs-toggle="tab" data-bs-target="#air-tab-pane"
                          type="button"
                          role="tab" aria-controls="air-tab-pane" aria-selected="true"><i class="flaticon-flight"></i>air
                    BOOKing
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="hotel-tab" data-bs-toggle="tab" data-bs-target="#hotel-tab-pane"
                          type="button"
                          role="tab" aria-controls="hotel-tab-pane" aria-selected="false"><i class="flaticon-home"></i>
                    Hotel Booking
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="status-tab" data-bs-toggle="tab" data-bs-target="#status-tab-pane"
                          type="button"
                          role="tab" aria-controls="status-tab-pane" aria-selected="false"><i
                      class="flaticon-clock"></i> Flight status
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="air-tab-pane" role="tabpanel" aria-labelledby="air-tab"
                     tabindex="0"><!--航班-->
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="tab-content-wrap">
                        <form action="#" class="booking-form">
                          <ul>
                            <li>
                              <div class="form-grp select">
                                <label for="From">From</label>
                                <select id="From" name="select" class="form-select" aria-label="Default select example"
                                        :value="depart">
                                  <!--                                  <option value="">Guangzhou</option>-->
                                  <option v-for="i in address" :key="i.id" :value="i">{{ i }}</option>
                                </select>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp select">
                                <label for="To">To</label>
                                <select id="To" name="select" class="form-select" aria-label="Default select example"
                                        :value="arrival">
                                  <option v-for="i in address" :key="i.id">{{ i }}</option>
                                </select>
                                <button class="exchange-icon"><i class="flaticon-exchange-1"></i></button>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp date">
                                <ul>
                                  <li>
                                    <label for="flightDate">Departure Date</label>
                                    <input type="text" class="date" placeholder="Select Date" id="flightDate">
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp economy">
                                <label for="text">Class</label>
                                <el-select v-model="grade">
                                  <!--                                  style="background-color:rgba(0,0,0,0);border: none"-->
                                  <el-option value="Economy">Economy</el-option>
                                  <el-option value="Business">Business</el-option>
                                  <el-option value="First">First</el-option>
                                </el-select>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp economy" style="border-left:rgba(144,144,144,0.29) 1px solid;">
                                <label for="text" style="text-decoration: underline" @click="open">Redeem points</label>
                              </div>
                            </li>
                          </ul>
                        </form>
                        <div class="content-bottom">
                          <router-link to="/bklist" class="btn">Show Flights <i class="flaticon-flight-1"></i></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="hotel-tab-pane" role="tabpanel" aria-labelledby="hotel-tab" tabindex="0">
                  <!--酒店-->
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="tab-content-wrap">
                        <form action="#" class="booking-form">
                          <ul>
                            <li>
                              <div class="form-grp select">
                                <label for="shortByThree">Trip</label>
                                <select id="shortByThree" name="select" class="form-select"
                                        aria-label="Default select example">
                                  <option value="">Tour type</option>
                                  <option>Adventure Travel</option>
                                  <option>Family Tours</option>
                                  <option>Newest Item</option>
                                  <option>Nature & wildlife</option>
                                </select>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp date">
                                <ul>
                                  <li>
                                    <label for="inDate">Check-in Date</label>
                                    <input type="text" class="date" placeholder="Select Date" id="inDate">
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp date">
                                <ul>
                                  <li>
                                    <label for="outDate">Check-out Date</label>
                                    <input type="text" class="date" placeholder="Select Date" id="outDate">
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </form>
                        <div class="content-bottom">
                          <a href="booking-details.html" class="btn">Show Hotels <i class="flaticon-home"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="status-tab-pane" role="tabpanel" aria-labelledby="status-tab"
                     tabindex="0">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="tab-content-wrap">
                        <form action="#" class="booking-form">
                          <ul>
                            <li>
                              <div class="form-grp">
                                <input type="text" placeholder="Flight No.">
                              </div>
                            </li>

                          </ul>
                        </form>
                        <div class="content-bottom">
                          <a href="booking-details.html" class="btn">Show Flight Status <i
                              class="flaticon-flight-1"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div><!--航班状态-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- booking-area-end -->

    <!-- features-area -->
    <section class="features-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6 col-sm-10">
            <div class="features-item">
              <div class="features-icon">
                <i class="flaticon-help"></i>
              </div>
              <div class="features-content"><a href="https://github.com/hikeerer/vue-file">
                <h6 class="title">We are now available</h6>
                <p>Visit github.com/hikeerer/vue-file to contact with us</p>
              </a></div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-sm-10">
            <div class="features-item">
              <div class="features-icon">
                <i class="flaticon-plane"></i>
              </div>
              <div class="features-content">
                <h6 class="title">International Flight</h6>
                <p>Call +86 114 5141 9198 for booking assistance</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- features-area-end -->

    <!-- flight-offer-area -->
    <section class="flight-offer-area">
      <div class="container">
        <div class="row align-items-center mb-35">
          <div class="col-md-8">
            <div class="section-title">
              <span class="sub-title">Offer Deals</span>
              <h2 class="title">Flight Offer Deals</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="best-price text-end">
              <a href="#">Best Price Guarantee <i class="flaticon-check"></i></a>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-10">
            <div class="flight-offer-item">
              <div class="flight-offer-thumb">
                <img src="../assets/img/images/Guangzhou_1.jpg" alt="">
              </div>
              <div class="flight-offer-content">
                <h2 class="title">{{ departs[3] }} to {{ arrivals[3] }}</h2>
                <span>{{ depart_time[3] }}</span>
                <p>Economy from</p>
                <h4 class="price">$ {{ prices[3] }}</h4>
              </div>
              <div class="overlay-content">
                <h2 class="title">{{ departs[3] }} to {{ arrivals[3] }}</h2>
                <span>{{ depart_time[3] }}</span>
                <p>Economy from</p>
                <h4 class="price">$ {{ prices[3] }}</h4>
                <div class="content-bottom">
                  <a href="booking-details.html" class="btn">Book Now</a>
                  <a href="booking-list.html" class="discover">Discover</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-10">
            <div class="row">
              <div class="col-sm-6">
                <div class="flight-offer-item offer-item-two">
                  <div class="flight-offer-thumb">
                    <img src="../assets/img/images/durban.jpg" alt="">
                  </div>
                  <div class="flight-offer-content">
                    <h2 class="title">{{ departs[2] }} to {{ arrivals[2] }}</h2>
                    <span>{{ depart_time[2] }} </span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[2] }}</h4>
                  </div>
                  <div class="overlay-content">
                    <h2 class="title">{{ departs[2] }} to {{ arrivals[2] }}</h2>
                    <span>{{ depart_time[2] }}</span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[2] }}</h4>
                    <div class="content-bottom">
                      <a href="booking-details.html" class="btn">Book Now</a>
                      <a href="booking-list.html" class="discover">Discover</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="flight-offer-item offer-item-two">
                  <div class="flight-offer-thumb">
                    <img src="../assets/img/images/tokyo.jpg" alt="">
                  </div>
                  <div class="flight-offer-content">
                    <h2 class="title">{{ departs[1] }} to {{ arrivals[1] }}</h2>
                    <span>{{ depart_time[1] }} </span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[1] }}</h4>
                  </div>
                  <div class="overlay-content">
                    <h2 class="title">{{ departs[1] }} to {{ arrivals[1] }}</h2>
                    <span>{{ depart_time[1] }}</span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[1] }}</h4>
                    <div class="content-bottom">
                      <a href="booking-details.html" class="btn">Book Now</a>
                      <a href="booking-list.html" class="discover">Discover</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="flight-offer-item offer-item-two">
                  <div class="flight-offer-thumb">
                    <img src="../assets/img/images/paris.jpg" alt="">
                  </div>
                  <div class="flight-offer-content">
                    <h2 class="title">{{ departs[0] }} to {{ arrivals[0] }}</h2>
                    <span>{{ depart_time[0] }}</span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[0] }}</h4>
                  </div>
                  <div class="overlay-content">
                    <h2 class="title">{{ departs[0] }} to {{ arrivals[0] }}</h2>
                    <span>{{ depart_time[0] }}</span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[0] }}</h4>
                    <div class="content-bottom">
                      <a href="booking-details.html" class="btn">Book Now</a>
                      <a href="booking-list.html" class="discover">Discover</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="flight-offer-item offer-item-two">
                  <div class="flight-offer-thumb">
                    <img src="../assets/img/images/brussels.jpg" alt="">
                  </div>
                  <div class="flight-offer-content">
                    <h2 class="title">{{ departs[4] }} to {{ arrivals[4] }}</h2>
                    <span>{{ depart_time[4] }}</span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[4] }}</h4>
                  </div>
                  <div class="overlay-content">
                    <h2 class="title">{{ departs[4] }} to {{ arrivals[4] }}</h2>
                    <span>{{ depart_time[4] }}</span>
                    <p>Economy from</p>
                    <h4 class="price">$ {{ prices[4] }}</h4>
                    <div class="content-bottom">
                      <a href="booking-details.html" class="btn">Book Now</a>
                      <a href="booking-list.html" class="discover">Discover</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- flight-offer-area-end -->

    <!-- destination-area -->
    <section class="destination-area destination-bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-title">
              <span class="sub-title">Offer Deals</span>
              <h2 class="title">Your Great Destination</h2>
            </div>
            <div class="destination-content">
              <p>Get rewarded for your travels – unlock instant savings of 10% or more with a free
                <span>Star Airlines</span> account</p>
              <ul>
                <li>
                  <div class="counter-item">
                    <div class="counter-content">
                      <h2 class="count"><span class="odometer" data-count="1234"></span>+</h2>
                      <p>Happy Customers</p>
                    </div>
                    <div class="counter-icon">
                      <i class="flaticon-group"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="counter-item">
                    <div class="counter-content">
                      <h2 class="count"><span class="odometer" data-count="100"></span>%</h2>
                      <p>Client Setisfied</p>
                    </div>
                    <div class="counter-icon">
                      <i class="flaticon-globe"></i>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="content-bottom">
                <p>Discover the latest offers & news and start planning</p>
                <a href="https://github.com/hikeerer/vue-file">contact us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- destination-area-end -->

    <!-- fly-next-area -->
    <section class="fly-next-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-title text-center">
              <span class="sub-title">Flynext Package</span>
              <h2 class="title">Destination Hotels</h2>
            </div>
          </div>
        </div>
        <div class="row fly-next-active justify-content-center">
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img01.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Four Seasons Hotel</h4>
                <h4 class="title">Guangzhou</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$195</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-one cat-two">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img02.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Switzerland (SWL)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$800</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img03.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Denmark (DEK)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$ 350</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-one">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img04.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Jakarta (DXB)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$ 220</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img05.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Dubai (DXB)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$195</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-one">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img06.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Dubai (DXB)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$175</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two cat-one">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img07.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Switzerland (SWL)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$195</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two">
            <div class="fly-next-item">
              <div class="fly-next-thumb">
                <a href="booking-details.html"><img src="../assets/img/images/fly_img08.jpg" alt=""></a>
              </div>
              <div class="fly-next-content">
                <span>09 Jun 2022 - 16 Jun 2022</span>
                <h4 class="title">Turkish (SWL)</h4>
                <h4 class="title">New York (USA)</h4>
                <div class="content-bottom">
                  <p>Room from</p>
                  <h4 class="price">$350</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- fly-next-area-end -->

    <!-- brand-area -->
    <div class="brand-area brand-bg">
      <div class="container">

        <div class="row brand-active">
          <div class="col-2">
            <div class="brand-item">
              <img src="../assets/img/brand/brand_img01.png" alt="">
            </div>
          </div>
          <div class="col-2">
            <div class="brand-item">
              <img src="../assets/img/brand/brand_img02.png" alt="">
            </div>
          </div>
          <div class="col-2">
            <div class="brand-item">
              <img src="../assets/img/brand/brand_img03.png" alt="">
            </div>
          </div>
          <div class="col-2">
            <div class="brand-item">
              <img src="../assets/img/brand/brand_img04.png" alt="">
            </div>
          </div>
          <div class="col-2">
            <div class="brand-item">
              <img src="../assets/img/brand/brand_img05.png" alt="">
            </div>
          </div>
          <div class="col-2">
            <div class="brand-item">
              <img src="../assets/img/brand/brand_img06.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- brand-area-end -->

    <!-- service-area -->
    <section class="service-area">
      <div class="container">
        <div class="row align-items-end mb-50">
          <div class="col-md-8">
            <div class="section-title">
              <span class="sub-title">Why Star Airlines</span>
              <h2 class="title">Our Great Flight Options</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="service-nav"></div>
          </div>
        </div>
        <div class="row service-active">
          <el-carousel type="card" height="auto" interval="5000" autoplay>
            <div class="col-lg-4">
              <el-carousel-item style="height: 400px">
                <div class="service-item">
                  <div class="service-icon">
                    <img src="../assets/img/icon/service_icon01.png" alt="">
                  </div>
                  <div class="service-content">
                    <span>Service</span>
                    <h2 class="title">Pre-Book Your Baggage</h2>
                    <div class="service-list">
                      <ul>
                        <li>Pre-book your baggage <i class="flaticon-check-mark"></i></li>
                        <li>Allowance now and save up <i class="flaticon-check-mark"></i></li>
                        <li>90% of baggage charges <i class="flaticon-check-mark"></i></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </div>
            <div class="col-lg-4">
              <el-carousel-item style="height: 400px">
                <div class="service-item">
                  <div class="service-icon">
                    <img src="../assets/img/icon/service_icon02.png" alt="">
                  </div>
                  <div class="service-content">
                    <span>Service</span>
                    <h2 class="title">Reserve preferred seat!</h2>
                    <div class="service-list">
                      <ul>
                        <li>What will it be, window or aisle? <i class="flaticon-check-mark"></i></li>
                        <li>Select your preferred seat prior <i class="flaticon-check-mark"></i></li>
                        <li>Reserved for you. <i class="flaticon-check-mark"></i></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </div>
            <div class="col-lg-4">
              <el-carousel-item style="height: 400px">
                <div class="service-item">
                  <div class="service-icon">
                    <img src="../assets/img/icon/service_icon03.png" alt="">
                  </div>
                  <div class="service-content">
                    <span>Service</span>
                    <h2 class="title">Enjoy stress-free travel</h2>
                    <div class="service-list">
                      <ul>
                        <li>Travel stress-free by getting<i class="flaticon-check-mark"></i></li>
                        <li>Covered for flight modification <i class="flaticon-check-mark"></i></li>
                        <li>Cancellation, accident & medical <i class="flaticon-check-mark"></i></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </div>
          </el-carousel>
        </div>
      </div>
    </section>
    <!-- service-area-end -->

    <!-- blog-area -->
    <section class="blog-area blog-bg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-title text-center">
              <span class="sub-title">our News Feeds</span>
              <h2 class="title">Latest News Update</h2>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-53">
            <div class="blog-item">
              <div class="blog-thumb">
                <a href="blog-details.html"><img src="../assets/img/blog/blog_img01.jpg" alt=""></a>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <ul>
                    <li><i class="fa-regular fa-user"></i> <a href="#">Emely Watson</a></li>
                    <li><i class="fa-solid fa-calendar-days"></i> February 19, 2022</li>
                  </ul>
                </div>
                <h2 class="title"><a href="blog-details.html">Depending on your departure point and destination
                  flights</a></h2>
              </div>
            </div>
          </div>
          <div class="col-47">
            <div class="blog-item small-item">
              <div class="blog-thumb">
                <a href="blog-details.html"><img src="../assets/img/blog/blog_img02.jpg" alt=""></a>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <ul>
                    <li><i class="fa-regular fa-user"></i> <a href="#">Emely Watson</a></li>
                    <li><i class="fa-solid fa-calendar-days"></i> February 19, 2022</li>
                  </ul>
                </div>
                <h2 class="title"><a href="blog-details.html">Happy International Country Flight Attendant Day</a></h2>
              </div>
            </div>
            <div class="blog-item small-item">
              <div class="blog-thumb">
                <a href="blog-details.html"><img src="../assets/img/blog/blog_img03.jpg" alt=""></a>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <ul>
                    <li><i class="fa-regular fa-user"></i> <a href="#">Emely Watson</a></li>
                    <li><i class="fa-solid fa-calendar-days"></i> February 19, 2022</li>
                  </ul>
                </div>
                <h2 class="title"><a href="blog-details.html">The US is a Large Country and Climate Varies by Region</a>
                </h2>
              </div>
            </div>
            <div class="blog-item small-item">
              <div class="blog-thumb">
                <a href="blog-details.html"><img src="../assets/img/blog/blog_img04.jpg" alt=""></a>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <ul>
                    <li><i class="fa-regular fa-user"></i> <a href="#">Emely Watson</a></li>
                    <li><i class="fa-solid fa-calendar-days"></i> February 19, 2022</li>
                  </ul>
                </div>
                <h2 class="title"><a href="blog-details.html">But There are Dozen of Low-cost Airlines Including</a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- blog-area-end -->

  </main>
  <!-- main-area-end -->

  <!-- footer-area -->
  <index-footer1></index-footer1>
  <!-- footer-area-end -->

  </body>
  </html>
</template>


<style scoped>

</style>
