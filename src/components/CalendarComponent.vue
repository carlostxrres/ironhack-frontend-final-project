<script setup>
import { ref, defineProps } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const props = defineProps({
  year: {
    type: Number,
    required: false,
    default: new Date().getFullYear()
  },
  month: {
    type: Number,
    required: false,
    default: new Date().getMonth()
  },
  events: {
    type: Array,
    required: false,
    default: () => []
  }
})

const LOCALE = 'en-US'

const currentYear = ref(props.year)
const currentMonth = ref(props.month)

const getDaysOfMonth = (year, month) => {
  const nextMonthIndex = (month + 1) % 12
  return new Date(year, nextMonthIndex, 0).getDate()
}

const getMonthName = (year, month) => {
  const date = new Date(year, month)
  const monthIntl = new Intl.DateTimeFormat(LOCALE, { month: 'long' })
  return monthIntl.format(date)
}

const getWeekDayName = (weekdayIndex) => {
  const date = new Date(2024, 0, weekdayIndex + 1) // Use any month where the first day is Monday, such as January 2024
  const weekIntl = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow' })
  return weekIntl.format(date)
}

const getFirstWeekDay = (year, month) => {
  return new Date(year, month, 1).getDay()
}

const getCount = (length) => {
  return [...Array(length).keys()]
}

const isSameDay = (date1, date2) => {
  const date1parsed = new Date(date1)
  const date2parsed = new Date(date2)
  // to do: handle errors

  return (
    date1parsed.getFullYear() === date2parsed.getFullYear() &&
    date1parsed.getMonth() === date2parsed.getMonth() &&
    date1parsed.getDate() === date2parsed.getDate()
  )
}

const dayToDate = (day) => {
  return new Date(currentYear.value, currentMonth.value, day)
}

const isToday = (day) => {
  const today = new Date()
  return isSameDay(today, dayToDate(day))
}

const getEventsInDay = (day) => {
  return props.events.filter((event) => isSameDay(event.date, dayToDate(day)))
}

const getMonthData = () => {
  const daysOfMonth = getDaysOfMonth(currentYear.value, currentMonth.value)
  return {
    daysList: getCount(daysOfMonth).map((index) => index + 1),
    monthName: getMonthName(currentYear.value, currentMonth.value),
    firstWeekDay: getFirstWeekDay(currentYear.value, currentMonth.value)
  }
}

const monthData = ref(getMonthData())
const weekDayNames = ref(getCount(7).map(getWeekDayName))

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
  monthData.value = getMonthData()
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
  monthData.value = getMonthData()
}
</script>

<template>
  <div>
    <header>
      <button @click="prevMonth" class="button-tertiary button-icon">
        <IconArrowLeft size="18" />
      </button>
      <h3>{{ monthData.monthName }} {{ currentYear }}</h3>
      <button @click="nextMonth" class="button-tertiary button-icon">
        <IconArrowRight size="18" />
      </button>
    </header>
    <ol>
      <li v-for="weekDayName in weekDayNames" :key="weekDayName" class="day-name">
        {{ weekDayName }}
      </li>
      <li
        v-for="day in monthData.daysList"
        :key="day"
        :class="{ 'first-day': day === 1, today: isToday(day), day: true }"
        :style="day === 1 ? { '--first-day-start': monthData.firstWeekDay } : {}"
      >
        <div class="day-number">{{ day }}</div>
        <ul class="events-list" v-if="getEventsInDay(day).length">
          <li v-for="event in getEventsInDay(day)" :key="event.id">
            <RouterLink
              :to="`/tasks/${event.id}`"
              :style="{ backgroundColor: event.color }"
              :title="event.title"
              class="discreet-anchor event"
            >
              &nbsp;
            </RouterLink>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<style scoped>
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(6, 1fr);
  border: 1px solid #eee;
}

.day-name {
  background: #eee;
  font-weight: bold;
  margin-bottom: 2px;
  padding: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8rem;
  border: 1px solid transparent;
  user-select: none;
  position: relative;
}

.day-number {
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.3rem;
  text-align: center;
  transition: background-color var(--transition-fast);
}

.day:hover .day-number {
  background-color: #ccc;
}

.today .day-number {
  background-color: var(--primary-color-1);
  color: white;
  font-weight: bold;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin-bottom: 4px;
  padding: 0;
}

.first-day {
  grid-column-start: var(--first-day-start, 0);
}

.events-list {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
}

.event {
  border-radius: var(--border-radius-small);
  width: 0.8rem;
  height: 0.8rem;
  margin: 1px;
  display: block;
}
</style>
