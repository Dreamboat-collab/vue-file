<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import IndexFooter1 from "@/components/indexFooter1.vue";
import IndexHeader1 from "@/components/indexHeader1.vue";

import $ from 'jquery';
// 引入bootstrap样式
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'wowjs/css/libs/animate.css'
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
import axios from "axios";

import '@/assets/js/slick.min.js';
import '@/assets/CSS/slick.css';
import moment from "moment";

const address = ref([]);
const depart = ref();
const arrival = ref();
const today = moment().format("YYYY-MM-DD")
const dateTime = ref(today);
const grade = ref('All');
// const prices = ref([])
// const departs = ref([])
// const arrivals = ref([])
// const depart_date = ref([])
// const arrival_date = ref([])
// const depart_t_details = ref([])
// const arrival_t_details = ref([])
// const types = ref([])
const len_result = ref(0)
const flight_names = ref([])
const hotel_names = ref([])
const hotel_prices = ref([])
const hotel_locations = ref([])
const depart_list = ref([])
const filter_l = ref(0)
const filter_r = ref(5000)
const search_results = ref([])
watch(filter_l, (newVal, oldVal) => {
  console.log(newVal)
})
const arrival_list = computed(() => {
  return depart_list.value.filter(item => item !== depart.value)
})

// const arrival_list=computed(()=>{
//   return depart_list.value.filter(item=>item!==depart.value)
// })


const showInfo = () => {
  console.log(depart, arrival, dateTime, grade)
  let type = null
  switch (grade.value) {
    case 'Economy':
      type = 1;
      break;
    case  'Business':
      type = 2;
      break;
    case 'First':
      type = 3;
      break;
  }
  // axios.get('/api/starAirlines/flight', {params:{
  //     depart:depart.value,
  //     arrival:arrival.value,
  //     date:dateTime.value,
  //     type:type
  //   }
  // })
  //     .then(response => {
  //       let flight_result=response.data.data
  //       console.log(flight_result)
  //       len_result.value=flight_result.length
  //       let temp=[[],[],[],[],[],[],[],[],[]]
  //       for (let i = 0; i < len_result.value; i++) {
  //         temp[0].push(flight_result[i]['depart'])
  //         temp[1].push(flight_result[i]['arrival'])
  //         let dp_time=flight_result[i]['departTime']
  //         temp[2].push(dp_time.substring(0,10))
  //         temp[7].push(dp_time.substring(11,16))
  //         let ar_time=flight_result[i]['arrivalTime']
  //         temp[3].push(ar_time.substring(0,10))
  //         temp[8].push(dp_time.substring(11,16))
  //         temp[4].push(flight_result[i]['price'])
  //         temp[6].push(flight_result[i]['name'])
  //         let type=flight_result[i]['type']
  //         switch (type){
  //           case 1:
  //             temp[5].push("Economy");
  //             break;
  //           case 2:
  //             temp[5].push("Business");
  //             break;
  //           case 3:
  //             temp[5].push("First")
  //             break;
  //         }
  //       }
  //       prices.value=temp[4]
  //       departs.value=temp[0]
  //       arrivals.value=temp[1]
  //       depart_date.value=temp[2]
  //       arrival_date.value=temp[3]
  //       types.value=temp[5]
  //       flight_names.value=temp[6]
  //       depart_t_details.value=temp[7]
  //       arrival_t_details.value=temp[8]
  //       console.log(temp);
  //     })
  axios.get('/api/starAirlines/flight', {
    params: {
      depart: depart.value,
      arrival: arrival.value,
      date: dateTime.value,
      type: type
    }
  })
      .then(response => {
        let flight_result = response.data.data
        console.log(flight_result)
        len_result.value = flight_result.length
        let temp = []
        for (let i = 0; i < len_result.value; i++) {

          let dp_time = flight_result[i]['departTime']
          let ar_time = flight_result[i]['arrivalTime']
          let grade
          switch (flight_result[i]['type']) {
            case 1:
              grade="Economy";
              break;
            case 2:
              grade="Business";
              break;
            case 3:
              grade="First"
              break;
          }
          temp.push({
            name: flight_result[i]['name'],
            price:flight_result[i]['price'],
            depart:flight_result[i]['depart'],
            arrival:flight_result[i]['arrival'],
            depart_date:dp_time.substring(0, 10),
            arrival_date:ar_time.substring(0, 10),
            depart_time:dp_time.substring(11, 16),
            arrival_time:ar_time.substring(11, 16),
            grade:grade
          })
        }
        search_results.value = temp
        console.log(search_results.value)
      })
}

onMounted(() => {
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
        }, 300);

      });
    }
    /*=============================================
      =    	   Toggle Active  	         =
    =============================================*/
    $('.flight-detail-wrap').slideUp();
    $('.detail').on('click', function () {
      $(this).toggleClass('show');
      $(this).parent().parent().parent().parent().find('.flight-detail-wrap').slideToggle();
    });


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
              =    	 Slider Range Active  价格范围滑块	   =
          =============================================*/
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 60000,
      values: [0, 60000],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        filter_l.value = ui.values[0]
        filter_r.value = ui.values[1]
      }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

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
  axios.get('http://localhost:8080/starAirlines/flight_address').then((response) => {
    depart_list.value = response.data.data
    depart.value = depart_list.value[0]
    arrival.value = arrival_list.value[0]
  })
  axios.get('http://localhost:8080/starAirlines/hotels').then((response) => {
    let hotels = response.data.data
    let temp = [[], [], []]
    for (let i = 0; i < 8; i++) {
      temp[0].push(hotels[i]['name'])
      temp[1].push(hotels[i]['price'])
      temp[2].push(hotels[i]['address'])
    }
    hotel_names.value = temp[0]
    hotel_prices.value = temp[1]
    hotel_locations.value = temp[2]
  })

});

</script>

<template>
  <html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body class="white-background">

  <!-- Scroll-top -->
  <button class="scroll-top scroll-to-target" data-target="html">
    <i class="fas fa-angle-up"></i>
  </button>
  <!-- Scroll-top-end-->

  <!-- header-area -->
  <index-header1></index-header1>
  <!-- header-area-end -->

  <!-- main-area -->
  <main>

    <!-- breadcrumb-area -->
    <section class="breadcrumb-area breadcrumb-bg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="breadcrumb-content text-center">
              <h2 class="title">Booking List</h2>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/flight">Home</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Booking List</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- breadcrumb-area-end -->

    <!-- booking-area -->
    <div class="booking-area booking-style-two">
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
                                        v-model="depart">
                                  <!--                                  <option value="">Guangzhou</option>-->
                                  <option v-for="i in depart_list" :key="i.id" :value="i">{{ i }}</option>
                                </select>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp select">
                                <label for="To">To</label>
                                <select id="To" name="select" class="form-select" aria-label="Default select example"
                                        v-model="arrival">
                                  <option v-for="i in arrival_list" :key="i.id">{{ i }}</option>
                                </select>
                                <button class="exchange-icon"><i class="flaticon-exchange-1"></i></button>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp date">
                                <ul>
                                  <li>
                                    <label for="flightDate">Departure Date</label>
                                    <input type="date" placeholder="Select Date" id="flightDate" v-model="dateTime">
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div class="form-grp economy">
                                <label for="text">Class</label>
                                <el-select v-model="grade">
                                  <!--style="background-color:rgba(0,0,0,0);border: none"-->
                                  <el-option value="All">All</el-option>
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
                          <router-link to="/bklist" class="btn" @click="showInfo">Show Flights <i
                              class="flaticon-flight-1"></i></router-link>
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

    <!-- booking-list-area -->
    <div class="booking-list-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-27 order-2 order-xl-0"> <!--filter列-->
            <aside class="booking-sidebar">
              <div class="widget filters">
                <h2 class="title">filters</h2>
                <div class="filters-wrap">
                  <h2 class="widget-title">Price Range</h2>
                  <div class="price_filter">
                    <div id="slider-range"></div>
                    <div class="price_slider_amount">
                      <span>Price :</span>
                      <input type="text" id="amount" name="price" placeholder="Add Your Price"/>
                      <!--                      <input type="submit" class="btn" value="Filter">-->
                    </div>
                  </div>
                </div>
              </div>
              <!--              <div class="widget">-->
              <!--                <h2 class="widget-title">Departure Time</h2>-->
              <!--                <ul class="departure-wrap">-->
              <!--                  <li><a href="#"><i class="flaticon-sunrise"></i>00:00 - 05:59</a></li>-->
              <!--                  <li><a href="#"><i class="flaticon-sunny"></i>06:00 - 11:59</a></li>-->
              <!--                  <li><a href="#"><i class="flaticon-sunset"></i>12:00 - 17:59</a></li>-->
              <!--                  <li><a href="#"><i class="flaticon-crescent-moon"></i>18:00 - 23:59</a></li>-->
              <!--                </ul>-->
              <!--              </div>-->
              <!--              <div class="widget">-->
              <!--                <h2 class="widget-title">Number of Stops</h2>-->
              <!--                <form action="#" class="flight-stops">-->
              <!--                  <label for="stopNumber"><i class="flaticon-flight"></i></label>-->
              <!--                  <select id="stopNumber" name="select" class="form-select" aria-label="Default select example">-->
              <!--                    <option value="">Direct</option>-->
              <!--                    <option>One Stops</option>-->
              <!--                    <option>Two Stops</option>-->
              <!--                  </select>-->
              <!--                </form>-->
              <!--              </div>-->
              <!--              <div class="widget">-->
              <!--                <h2 class="widget-title">Refundable</h2>-->
              <!--                <ul class="airlines-cat-list">-->
              <!--                  <li>-->
              <!--                    <div class="form-check">-->
              <!--                      <input class="form-check-input" type="checkbox" value="" id="refOne">-->
              <!--                      <label class="form-check-label" for="refOne">Non Refundable</label>-->
              <!--                    </div>-->
              <!--                  </li>-->
              <!--                  <li>-->
              <!--                    <div class="form-check">-->
              <!--                      <input class="form-check-input" type="checkbox" value="" id="refTwo">-->
              <!--                      <label class="form-check-label" for="refTwo">Refundable</label>-->
              <!--                    </div>-->
              <!--                  </li>-->
              <!--                  <li>-->
              <!--                    <div class="form-check">-->
              <!--                      <input class="form-check-input" type="checkbox" value="" id="refThree">-->
              <!--                      <label class="form-check-label" for="refThree">Rules Wise</label>-->
              <!--                    </div>-->
              <!--                  </li>-->
              <!--                </ul>-->
              <!--              </div>-->
            </aside>
          </div>
          <div class="col-73" v-if="len_result==0">- NULL -</div>
          <div class="col-73"><!--航班结果列-->
<!--            <div class="booking-list-item" v-for="i in departs.length" :key="i.id">&lt;!&ndash;其中一个航班&ndash;&gt;-->
<!--              <div class="booking-list-item-inner">-->
<!--                <div class="booking-list-top">-->
<!--                  <div class="flight-airway">-->
<!--                    <div class="flight-logo">-->
<!--                      <img src="../assets/img/brand/brand_img02.png" alt="">-->
<!--                      <h5 class="title">Star Airlines</h5>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <ul class="flight-info">-->
<!--                    <li>Depart Time<span>{{ depart_date[i - 1] }} {{ depart_t_details[i - 1] }}</span></li>-->
<!--                    <li class="time"><span>Arrive Time</span>{{ arrival_date[i - 1] }} {{ arrival_t_details[i - 1] }}-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                  <div class="flight-price">-->
<!--                    <h4 class="title">US$ {{ prices[i - 1] }}.00</h4>-->
<!--                    <router-link to="/bkdtls" class="btn">Select <i class="flaticon-flight-1"></i></router-link>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="booking-list-bottom">-->
<!--                  <ul>-->
<!--                    <li class="detail"><i class="fa-solid fa-angle-down"></i> Flight Detail</li>-->
<!--                    <li>Price per person (incl. taxes & fees)</li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="flight-detail-wrap">-->
<!--                <div class="flight-date">-->
<!--                  <ul>-->
<!--                    <li>{{ flight_names[i - 1] }}</li>-->
<!--                    <li>{{ depart_date[i - 1] }} - {{ depart_t_details[i - 1] }}</li>-->
<!--                    <li>To</li>-->
<!--                    <li>{{ arrival_date[i - 1] }} - {{ arrival_t_details[i - 1] }}</li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--                <div class="flight-detail-right">-->
<!--                  <h4 class="title">{{ departs[i - 1] }} &#45;&#45;&ndash;&gt; {{ arrivals[i - 1] }}</h4>-->
<!--                  <div class="flight-detail-info">-->
<!--                    <img src="../assets/img/icon/brand_img02.png" alt="">-->
<!--                    <ul>-->
<!--                      <li>Class: {{ types[i - 1] }}</li>-->
<!--                      <li>Flight No.: {{ flight_names[i - 1] }}</li>-->
<!--                      <li>Aircraft: BOEING 777-300ER</li>-->
<!--                      <li>Adult(s): 25KG luggage free</li>-->
<!--                    </ul>-->
<!--                  </div>-->
<!--                  <h4 class="title title-two"></h4>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
            <!--            <div class="booking-list-item">&lt;!&ndash;其中一个航班&ndash;&gt;-->
            <!--              <div class="booking-list-item-inner">-->
            <!--                <div class="booking-list-top">-->
            <!--                  <div class="flight-airway">-->
            <!--                    <div class="flight-logo">-->
            <!--                      <img src="../assets/img/brand/brand_img02.png" alt="">-->
            <!--                      <h5 class="title">Star Airlines</h5>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <ul class="flight-info">-->
            <!--                    <li>Thursday, <span>Jun 16</span></li>-->
            <!--                    <li class="time"><span>12: 55</span>DAC</li>-->
            <!--                    <li>22h<span>2 Stops</span></li>-->
            <!--                  </ul>-->
            <!--                  <div class="flight-price">-->
            <!--                    <h4 class="title">US$ 1,056.40</h4>-->
            <!--                    <router-link to="/bkdtls" class="btn">Select <i class="flaticon-flight-1"></i></router-link>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="booking-list-bottom">-->
            <!--                  <ul>-->
            <!--                    <li class="detail"><i class="fa-solid fa-angle-down"></i> Flight Detail</li>-->
            <!--                    <li>Price per person (incl. taxes & fees)</li>-->
            <!--                  </ul>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="flight-detail-wrap">-->
            <!--                <div class="flight-date">-->
            <!--                  <ul>-->
            <!--                    <li>EK585</li>-->
            <!--                    <li>Thursday, Jun 16 - 23:20 <span>22h 50m</span></li>-->
            <!--                    <li>Friday, Jun 17 - 03:20</li>-->
            <!--                  </ul>-->
            <!--                </div>-->
            <!--                <div class="flight-detail-right">-->
            <!--                  <h4 class="title">IST - Istanbul Airport, Turkish</h4>-->
            <!--                  <div class="flight-detail-info">-->
            <!--                    <img src="../assets/img/icon/brand_img02.png" alt="">-->
            <!--                    <ul>-->
            <!--                      <li>Class: Economy</li>-->
            <!--                      <li>Flight No.: EK585</li>-->
            <!--                      <li>Aircraft: BOEING 777-300ER</li>-->
            <!--                      <li>Adult(s): 25KG luggage free</li>-->
            <!--                    </ul>-->
            <!--                  </div>-->
            <!--                  <h4 class="title title-two">DXB - Dubai, United Arab Emirates</h4>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <!-- booking-list-area-end -->

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
