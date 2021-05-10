<template>
  <div class="app-container">
    <div class="filter-container navbarClassButton">
      <!-- <el-input
        v-model="listQuery.searchUserName"
        :placeholder="$t('companyTable.searchCompanyName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
      <el-date-picker
        class="marginRight-common filterWidth"
        v-model="dateRangeTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <!-- <el-select
        v-model="listQuery.importance"
        :placeholder="$t('table.importance')"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.displayName+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>-->
      <el-button
        v-waves
        class="marginRight-common"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button> -->
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.reviewer') }}
      </el-checkbox> -->
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- <el-table-column
        fixed="left"
        :label="$t('attendanceList.ID')"
        prop="id"
        sortable="custom"
        align="center"
        width="100"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <!-- sortable="custom" -->
      <el-table-column
        fixed="left"
        :label="$t('attendanceList.departmentName')"
        prop="departmentName"
        align="center"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.dept_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        :label="$t('attendanceList.userName')"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.dd_username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.should_attendance_days')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.should_attendance_days }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.attendance_days')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.attendance_days }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.attendance_work_time')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.attendance_work_time }}</span>
        </template>
      </el-table-column>
            <el-table-column
        :label="$t('attendanceList.lateNum')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.late_times }}</span>
        </template>
      </el-table-column><el-table-column
        :label="$t('attendanceList.earlyNum')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_early_times }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_in_lieu')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_in_lieu }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_sick')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_sick }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_personal')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_personal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_annual')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_annual }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_funeral')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_funeral }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_maternity')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_maternity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_paternity')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_paternity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_breastfeeding')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_breastfeeding }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('attendanceList.leave_marriage')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.leave_marriage }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        :label="$t('attendanceList.business_trip_time')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.business_trip_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAttendanceList } from '@/api/attendanceManagement'
import { IAttendanceListData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

const calendarTypeOptions = [
  { key: 'CN', displayName: 'China' },
  { key: 'US', displayName: 'USA' },
  { key: 'JP', displayName: 'Japan' },
  { key: 'EU', displayName: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: { [key: string]: string }, cur) => {
  acc[cur.key] = cur.displayName
  return acc
}, {}) as { [key: string]: string }

@Component({
  name: 'attendanceList',
  components: {
    Pagination
  },
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    }
  }
})
export default class extends Vue {
  private tableKey = 0
  private list: IAttendanceListData[] = []
  private total = 1
  private count = 10
  private listLoading = true
  private dateRangeTime: any[] = []
  private listQuery: any = {
    page: 1,
    limit: 20,
    importance: '',
    type: '',
    sort: '+',
    sortName: '',
    startTime: '',
    endTime: ''
  }

  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]

  created() {
    this.initListQueryTimer()
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    this.listQuery.startTime = this.dateRangeTime[0]
    this.listQuery.endTime = this.dateRangeTime[1]
    const { data } = await getAttendanceList(this.listQuery)
    this.list = data.attendanceList
    this.total = data.total
    console.log(data)
    this.listLoading = false
  }

  private initListQueryTimer() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.dateRangeTime = [this.$moment(start).format('YYYY-MM-DD'), this.$moment(end).format('YYYY-MM-DD')]
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order, prop)
    }
  }

  private sortByID(order: string, prop: string) {
    this.listQuery.sortName = prop
    if (order === 'ascending') {
      this.listQuery.sort = '+'
    } else {
      this.listQuery.sort = '-'
    }
    this.handleFilter()
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort + this.listQuery.sortName
    return sort === `+${key}` ? 'ascending' : 'descending'
  }
}
</script>

<style scoped>
  .navbarClassButton {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .marginRight-common {
    margin-right: 10px;
  }
  .filterWidth {
    width: 400px;
  }
</style>
