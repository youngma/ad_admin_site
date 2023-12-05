<template>
  <div class="dashboard-editor-container">
    <DailyCount
      :advertiser-count="dailyCount.advertiserCount"
      :partner-count="dailyCount.partnerCount"
      :campaign-count="dailyCount.campaignCount"
      :group-count="dailyCount.groupCount"
    />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <DailyChart ref="quizChart" :options="options" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col>
        <el-row justify="end" class="mb_15" >
          <el-col class="t_r small" tag="span" style="font-size: smaller">
            * 마지막 업데이트 시간 : {{ sinkSchedule.lastUpdateTim }} (00:10 분 업데이트)
          </el-col>
        </el-row>
        <el-row justify="end" class="mb_15" >
          <el-col class="t_r comm_form_box" tag="span">
            <el-date-picker
              v-model="datepicker"
              type="daterange"
              size="large"
              class="mt_5"
              start-placeholder="광고 시작 일자"
              end-placeholder="광고 종료 일자"
              :disabled-date="disabledDate"
              format="YYYY/MM/DD"
              value-format="YYYYMMDD"
              @change="(v) => reload(v)"
            />
          </el-col>
        </el-row>
        <DailyTable :list="list" />

      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import { computed, watch } from 'vue'
import DailyCount from './components/DailyCount.vue'
import DailyTable from '@/views/dashboard/admin/components/DailyTable.vue'
import DailyChart from '@/views/dashboard/admin/components/DailyChart.vue'

import * as REPORT_API from '@/api/REPORT_QUIZ_API.js'

import { ref } from 'vue'
import moment from 'moment'
import { dateFormatter } from '@/utils/customElTableFormatter.js'
// import Flicking from '@egjs/vue3-flicking'

defineOptions({
  name: 'DashboardAdmin'
})

const dailyCount = ref({
  advertiserCount: 0,
  partnerCount: 0,
  campaignCount: 0,
  groupCount: 0
})

const quizChart = ref(null)
const sinkSchedule = ref({})
const list = ref([])
const options = ref({})
const datepicker = ref([
  moment().add(-10, 'days').format('YYYYMMDD'),
  moment().add(0, 'days').format('YYYYMMDD')
]
)
// const defaultDate = ref([moment().add(-10, 'days').toDate(), moment().add(-1, 'days').toDate()])
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const posList = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight'
]

const configParameters = {
  rotate: {
    min: -90,
    max: 90
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  position: {
    options: posList.reduce(function(map, pos) {
      map[pos] = pos
      return map
    }, {})
  },
  distance: {
    min: 0,
    max: 10
  }
}

const labelOption = {
  rotate: configParameters.rotate,
  align: configParameters.align,
  verticalAlign: configParameters.verticalAlign,
  position: configParameters.position,
  distance: configParameters.distance
}

function genOptions() {
  const legend = ['요청', '노출', '상세 진입', '클릭', '정답']
  const xAxisValue = list.value.map(t => dateFormatter(t.rptDate))

  const reqCntValues = []
  const impressionCntValues = []
  const detailCntValues = []
  const clickCntValues = []
  const answerCntValues = []

  list.value.forEach((value) => {
    const { reqCnt, impressionCnt, detailCnt, clickCnt, answerCnt } = value
    reqCntValues.push(reqCnt)
    impressionCntValues.push(impressionCnt)
    detailCntValues.push(detailCnt)
    clickCntValues.push(clickCnt)
    answerCntValues.push(answerCnt)
  })

  options.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legend
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: false },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: xAxisValue
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '요청',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: reqCntValues
      },
      {
        name: '노출',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: impressionCntValues
      },
      {
        name: '상세 진입',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: detailCntValues
      },
      {
        name: '클릭',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: clickCntValues
      },
      {
        name: '정답',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: answerCntValues
      }
    ]
  }
}

async function reload(v) {
  const data = await REPORT_API.searchDashboard({
    startDate: datepicker.value[0],
    endDate: datepicker.value[1]
  })

  const { advertiserCount, partnerCount, campaignCount, groupCount, rptQuizDailyList, lastUpdate } = data

  dailyCount.value.advertiserCount = advertiserCount
  dailyCount.value.partnerCount = partnerCount
  dailyCount.value.campaignCount = campaignCount
  dailyCount.value.groupCount = groupCount
  sinkSchedule.value = lastUpdate

  list.value = rptQuizDailyList

  genOptions()
  quizChart.value.initChart(options.value)
}

reload()

</script>

<style lang="scss" scoped>
@use '@/styles/dashboard/ficking.css';

.flicking-camera {
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  width: 100%;
  will-change: transform;
  z-index: 1
}

.flicking-panel {
  align-items: flex-end;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  height: 200px;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 30px 20px;
  position: relative;
  width: 100%;

  .high {
    height: 300px
  }

  .higher {
    height: 400px
  }

}
.flicking-index {
  min-width: 60px;
  height: 65px;
  position: relative;
  text-align: center;

  :after {
    bottom: -1.2rem;
    content: "PANEL";
    font-size: 1rem;
    font-weight: 700;
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%
  }

  :before {
    border-bottom: 2px solid #fff;
    bottom: .5rem;
    content: "";
    left: 10%;
    position: absolute;
    width: 80%
  }

}

.panel {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.has-background-primary {
  background-color: #f2a65e!important;
}

.has-text-white {
  color: #fff!important
}

a.has-text-white:focus,a.has-text-white:hover {
  color: #e6e6e6!important
}

.has-background-white {
  background-color: #fff!important
}

.is-size-1 {
  font-size: 3rem!important;
}

.is-size-2 {
  font-size: 2.5rem!important
}

.is-size-3 {
  font-size: 2rem!important
}

.is-size-4 {
  font-size: 1.5rem!important
}

.is-size-5 {
  font-size: 1.25rem!important
}

.is-size-6 {
  font-size: 1rem!important
}

.is-size-7 {
  font-size: .75rem!important
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>

