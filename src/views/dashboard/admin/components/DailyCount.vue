<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <el-icon :size="74" class="card-panel-icon-wrapper icon-people">
          <User/>
        </el-icon>
        <div class="card-panel-description">
          <div class="card-panel-text">
            매체사
          </div>
          <count-to :start-val="0" :end-val="partnerCount" :duration="2.5" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <el-icon :size="74" class="card-panel-icon-wrapper icon-message">
          <User/>
        </el-icon>
        <div class="card-panel-description">
          <div class="card-panel-text">
            광고주
          </div>
          <count-to  :start-val="0" :end-val="advertiserCount" :duration="2.5" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <el-icon :size="74" class="card-panel-icon-wrapper icon-money">
          <Money/>
        </el-icon>
        <div class="card-panel-description">
          <div class="card-panel-text">
            광고 그룹
          </div>
          <count-to :start-val="0" :end-val="groupCount" :duration="2.5" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <el-icon :size="74" class="card-panel-icon-wrapper icon-shopping">
          <Money/>
        </el-icon>
        <div class="card-panel-description">
          <div class="card-panel-text">
            광고 캠페인
          </div>
          <count-to :start-val="0" :end-val="campaignCount" :duration="2.5" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import CountTo from 'vue-countup-v3'
import { defineProps } from 'vue'

const { advertiserCount, partnerCount, campaignCount, groupCount } = defineProps({
  advertiserCount: {
    type: Number,
    default: 0,
    required: true
  },
  campaignCount: {
    type: Number,
    default: 0,
    required: true
  },
  partnerCount: {
    type: Number,
    default: 0,
    required: true
  },
  groupCount: {
    type: Number,
    default: 0,
    required: true
  }
})

</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
