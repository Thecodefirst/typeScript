<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.searchUserName"
        :placeholder="$t('personalTable.searchUserName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.companyId"
        :placeholder="$t('personalTable.companyList')"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in enumPersonalManagement.companyList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.departmentId"
        :placeholder="$t('personalTable.departmentList')"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in enumPersonalManagement.departmentList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.jobsId"
        :placeholder="$t('personalTable.jobsList')"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in enumPersonalManagement.jobsList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.educationId"
        :placeholder="$t('personalTable.education')"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in enumPersonalManagement.education"
          :key="item.id"
          :label="item.config_name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.workingStateId"
        :placeholder="$t('personalTable.working_state')"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in enumPersonalManagement.working_state"
          :key="item.id"
          :label="item.config_name"
          :value="item.id"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
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
      <el-table-column
        fixed="left"
        :label="$t('personalList.num')"
        prop="num"
        sortable="custom"
        align="center"
        width="70"
        :class-name="getSortClass('num')"
      >
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        :label="$t('personalList.company_name')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.company_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        :label="$t('personalList.file_num')"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.file_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        :label="$t('personalList.usableDay_annual')"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.usableDay }}/{{ row.leave_annual===null ? 0 : row.leave_annual }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        :label="$t('personalList.name')"
        min-width="150"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
          <span v-if="getProbation(row)" class="marginRight">
            <el-tag size="mini" type="warning" effect="plain">试用</el-tag>
          </span>
          <span v-if="getContractOverDate(row)" class="marginRight">
            <el-tag size="mini" type="danger" effect="plain">合同</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.department_name')"
        width="110px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.department_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.jobs_name')"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.jobs_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.grades')"
        align="center"
        width="95"
      >
        <template slot-scope="{row}">
          <span>{{ row.grades }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.gender_name')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.gender_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.nation')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.nation }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.date_birth')"
        class-name="status-col"
        width="130"
      >
        <template slot-scope="{row}">
          <span>{{ row.date_birth !== null ? $moment(row.date_birth).format('YYYY-MM-DD') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.idcard')"
        class-name="status-col"
        width="180"
      >
        <template slot-scope="{row}">
          <span>{{ row.idcard }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.tel')"
        class-name="status-col"
        width="130"
      >
        <template slot-scope="{row}">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.marital_name')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.marital_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.education_name')"
        class-name="status-col"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.education_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.graduate_institutions')"
        class-name="status-col"
        width="150"
      >
        <template slot-scope="{row}">
          <span>{{ row.graduate_institutions }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.major')"
        class-name="status-col"
        width="150"
      >
        <template slot-scope="{row}">
          <span>{{ row.major }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="hiredate"
        :label="$t('personalList.hiredate')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.hiredate !== null ? $moment(row.hiredate).format('YYYY-MM-DD') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.probation')"
        class-name="status-col"
        width="130"
      >
        <template slot-scope="{row}">
          <span>{{ row.probation }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.positive')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.positive !== null ? $moment(row.positive).format('YYYY-MM-DD') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.politics_status')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.politics_status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.working_state_name')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.working_state_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.departure_date')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.departure_date !== null ? $moment(row.departure_date).format('YYYY-MM-DD') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.account_type_name')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.account_type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.take_job_date')"
        class-name="status-col"
        width="120"
      >
        <template slot-scope="{row}">
          <span>{{ row.take_job_date !== null ? $moment(row.take_job_date).format('YYYY-MM-DD') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.present_address')"
        class-name="status-col"
        width="150"
      >
        <template slot-scope="{row}">
          <span>{{ row.present_address }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.contract_over_date')"
        class-name="status-col"
        width="120"
      >
        <template slot-scope="{row}">
          <span>{{ row.contract_over_date !== null ? $moment(row.contract_over_date).format('YYYY-MM-DD') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.bank_deposit')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.bank_deposit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.card_no')"
        class-name="status-col"
        width="180"
      >
        <template slot-scope="{row}">
          <span>{{ row.card_no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.payment_information')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.payment_information }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.create_date')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ $moment(row.create_date).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('personalList.update_date')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ $moment(row.update_date).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        :label="$t('personalList.operate')"
        align="center"
        min-width="200"
        class-name="fixed-width"
      >
        <template slot-scope="{row, $index}">
          <span class="marginRight">
            <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
              >
                {{ $t('table.edit') }}
              </el-button>
          </span>
          <span class="marginRight">
            <el-button
              v-if="row.status!=='deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              {{ $t('table.delete') }}
            </el-button>
          </span>
          <!-- <el-button
            v-if="row.status!=='published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'published')"
          >
            {{ $t('table.publish') }}
          </el-button>
          <el-button
            v-if="row.status!=='draft'"
            size="mini"
            @click="handleModifyStatus(row,'draft')"
          >
            {{ $t('table.draft') }}
          </el-button>
           -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog
      :top="dialogMark().dialogTop"
      :close-on-click-modal="false"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <div :style="`height: ${dialogMark().childDivHeight}; overflow: scroll`">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="tempPersonalData"
          label-position="left"
          label-width="150px"
          :style="`width: 400px; margin-left:50px;`"
        >
          <el-form-item
            :label="$t('personalList.num')"
            prop="num"
          >
            <el-input v-model="tempPersonalData.num" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.company_name')"
            prop="company_id"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.company_id"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.companyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.file_num')"
            prop="file_num"
          >
            <el-input v-model="tempPersonalData.file_num" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.name')"
            prop="name"
          >
            <el-input v-model="tempPersonalData.name" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.department_name')"
            prop="department"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.department"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.jobs_name')"
            prop="jobs"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.jobs"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.jobsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.grades')"
            prop="grades"
          >
            <el-input v-model="tempPersonalData.grades" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.idcard')"
            prop="idcard"
          >
            <el-input v-model="tempPersonalData.idcard" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.gender_name')"
            prop="gender"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.gender"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.gender"
                :key="item.id"
                :label="item.config_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.date_birth')"
            prop="date_birth"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="tempPersonalData.date_birth"
              type="date"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.nation')"
            prop="nation"
          >
            <el-input v-model="tempPersonalData.nation" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.tel')"
            prop="tel"
          >
            <el-input v-model="tempPersonalData.tel" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.marital_name')"
            prop="marital"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.marital"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.marital"
                :key="item.id"
                :label="item.config_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.education_name')"
            prop="education"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.education"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.education"
                :key="item.id"
                :label="item.config_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.graduate_institutions')"
            prop="graduate_institutions"
          >
            <el-input v-model="tempPersonalData.graduate_institutions" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.major')"
            prop="major"
          >
            <el-input v-model="tempPersonalData.major" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.hiredate')"
            prop="hiredate"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="tempPersonalData.hiredate"
              type="date"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.probation')"
            prop="probation"
          >
            <el-input v-model="tempPersonalData.probation" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.positive')"
            prop="positive"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="tempPersonalData.positive"
              type="date"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.politics_status')"
            prop="politics_status"
          >
            <el-input v-model="tempPersonalData.politics_status" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.working_state_name')"
            prop="working_state"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.working_state"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.working_state"
                :key="item.id"
                :label="item.config_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.departure_date')"
            prop="departure_date"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="tempPersonalData.departure_date"
              type="date"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.account_type_name')"
            prop="account_type"
          >
            <el-select
              value-key="id"
              v-model="tempPersonalData.account_type"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
                v-for="item in enumPersonalManagement.account_type"
                :key="item.id"
                :label="item.config_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('personalList.take_job_date')"
            prop="take_job_date"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="tempPersonalData.take_job_date"
              type="date"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.present_address')"
            prop="present_address"
          >
            <el-input v-model="tempPersonalData.present_address" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.contract_over_date')"
            prop="contract_over_date"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="tempPersonalData.contract_over_date"
              type="date"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.bank_deposit')"
            prop="bank_deposit"
          >
            <el-input v-model="tempPersonalData.bank_deposit" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.card_no')"
            prop="card_no"
          >
            <el-input v-model="tempPersonalData.card_no" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.payment_information')"
            prop="payment_information"
          >
            <el-input v-model="tempPersonalData.payment_information" />
          </el-form-item>
          <el-form-item
            :label="$t('personalList.dd_username')"
            prop="dd_username"
          >
            <el-select v-model="tempPersonalData.dd_userid" filterable placeholder="请选择">
              <el-option
                v-for="item in enumPersonalManagement.userList_typeList"
                :key="item.dd_userid"
                :label="item.dept_name+'：'+item.dd_username"
                :value="item.dd_userid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData()"
          >
            {{ $t('table.confirm') }}
          </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPageviewsVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pageviewsData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pageviews"
          label="Pageviews"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPageviewsVisible = false"
        >{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getPageviews, defaultArticleData } from '@/api/articles'
import { addPersonal, deletePersonal, getPersonalList, updatePersonal, getPersonalSelectArr, defaultPersonalListData } from '@/api/personalManagement'
import { IPersonalListData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
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
  name: 'personalList',
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
  private list: IPersonalListData[] = []
  private total = 1
  private count = 10
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20,
    importance: '',
    type: '',
    sort: '+',
    sortName: '',
    searchUserName: '',
    companyId: '',
    departmentId: '',
    jobsId: '',
    educationId: '',
    workingStateId: ''
  }

  private enumPersonalManagement = {
    companyList: [],
    departmentList: [],
    jobsList: []
  }

  private importanceOptions = [1, 2, 3]
  private calendarTypeOptions = calendarTypeOptions
  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]

  private statusOptions = ['published', 'draft', 'deleted']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private pageviewsData = []
  private rules = {
    num: [
      { required: true, message: '序号为必填项' },
      { pattern: /^-?\d+\.?\d*$/, message: '序号为数字' }
    ],
    // file_num: [{ required: true, message: '档案编号为必填项', trigger: 'blur' }],
    name: [{ required: true, message: '姓名为必填项', trigger: 'blur' }],
    // grades: [{ required: true, message: '职级为必填项', trigger: 'blur' }],
    // nation: [{ required: true, message: '民族为必填项', trigger: 'blur' }],
    date_birth: [
      { required: true, message: '出生日期为必填项', trigger: 'blur' },
      { type: 'string', message: '出生日期为日期格式' }
    ],
    idcard: [
      { required: true, message: '身份证号为必填项', trigger: 'blur' },
      { validator: this.handleIdCardChange, trigger: 'blur' }
      // { pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号码' }
    ],
    tel: [
      { required: true, message: '联系电话为必填项', trigger: 'blur' },
      { pattern: /^-?\d+\.?\d*$/, message: '联系电话为数字' }
    ],
    // graduate_institutions: [{ required: true, message: '毕业院校为必填项', trigger: 'blur' }],
    // major: [{ required: true, message: '专业为必填项', trigger: 'blur' }],
    hiredate: [
      { required: true, message: '入职时间为必填项', trigger: 'blur' },
      { type: 'string', message: '入职时间为日期格式' }
    ],
    // probation: [{ required: true, message: '试用期合同为必填项', trigger: 'blur' }],
    // positive: [
    //   { required: true, message: '转正时间为必填项', trigger: 'blur' },
    //   { type: 'string', message: '转正时间为日期格式' }
    // ],
    // politics_status: [{ required: true, message: '整治面貌为必填项', trigger: 'blur' }],
    take_job_date: [
      { required: true, message: '参加工作日期为必填项', trigger: 'blur' },
      { type: 'string', message: '参加工作日期为日期格式' }
    ]
    // present_address: [{ required: true, message: '现住址为必填项', trigger: 'blur' }],
    // contract_over_date: [
    //   { required: true, message: '合同到期日期为必填项', trigger: 'blur' },
    //   { type: 'string', message: '合同到期日期为日期格式' }
    // ],
    // bank_deposit: [{ required: true, message: '开户银行为必填项', trigger: 'blur' }],
    // card_no: [
    //   { required: true, message: '银行卡号为必填项', trigger: 'blur' },
    //   { pattern: /^-?\d+\.?\d*$/, message: '银行卡号为数字' }
    // ]
  }

  private downloadLoading = false
  private tempArticleData = defaultArticleData
  private tempPersonalData = defaultPersonalListData
  private thresholdNum = 1

  created() {
    this.getEmueList()
    this.getList()
  }

  private dialogMark() {
    const height = document.body.clientHeight
    return {
      dialogTop: height * 0.1 + 'px',
      childDivHeight: height * 0.7 + 'px'
    }
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getPersonalList(this.listQuery)
    this.thresholdNum = data.thresholdNum
    this.list = data.personalList
    this.total = data.total
    console.log(data)
    this.listLoading = false
  }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'num' || prop === 'hiredate') {
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

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  // 试用期状态
  private getProbation(row: any) {
    const hisTime = this.$moment(row.hiredate).add(row.probation, 'M').format('X')
    const newTime = this.$moment().add(this.thresholdNum, 'M').format('X')
    if (newTime > hisTime && row.working_state === 1) return true
    else return false
  }

  // 合同状态
  private getContractOverDate(row: any) {
    const hisTime = this.$moment(row.contract_over_date).format('X')
    const newTime = this.$moment().add(this.thresholdNum, 'M').format('X')
    if (newTime > hisTime && row.working_state === 0) return true
    else return false
  }

  // 身份证解析
  private handleIdCardChange(rule: any, value: any, callback: any) {
    const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (reg.test(value) === false) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      const carInfo = this.getCarInfo(value)
      console.log(carInfo)
      this.tempPersonalData.date_birth = carInfo.birthday
      this.tempPersonalData.gender = carInfo.sex
      callback()
    }
  }

  private getCarInfo(UUserCard: any) {
    const arr = {
      birthday: '',
      sex: 1,
      age: 0
    }
    if (UUserCard !== null && UUserCard !== '') {
      const birthday = UUserCard.substring(6, 10) + '-' + UUserCard.substring(10, 12) + '-' + UUserCard.substring(12, 14)
      arr.birthday = birthday
      if (parseInt(UUserCard.substr(16, 1)) % 2 === 1) {
        arr.sex = 1
      } else {
        arr.sex = 2
      }
      var myDate = new Date()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
      if (((UUserCard.substring(10, 12) < month) || (UUserCard.substring(10, 12) === month)) && (UUserCard.substring(12, 14) <= day)) {
        age++
      }
      arr.age = age
    }
    return arr
  }
  // private handleModifyStatus(row: any, status: string) {
  //   this.$message({
  //     message: '操作成功',
  //     type: 'success'
  //   })
  //   row.status = status
  // }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort + this.listQuery.sortName
    return sort === `+${key}` ? 'ascending' : 'descending'
  }

  private resetTempArticleData() {
    this.tempArticleData = cloneDeep(defaultArticleData)
  }

  private resetTempPersonalData() {
    this.tempPersonalData = cloneDeep(defaultPersonalListData)
  }

  private async getEmueList() {
    const { data } = await getPersonalSelectArr()
    this.enumPersonalManagement = data
    console.log(data)
  }

  private async handleCreate() {
    this.resetTempPersonalData()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private async createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const { data } = await addPersonal(this.tempPersonalData)
        if (data.status === 'success') {
          // this.list.unshift(data.result)
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  private handleUpdate(row: any) {
    // this.tempPersonalData = Object.assign({}, row)
    this.tempPersonalData = {
      num: row.num,
      company_id: row.company_id,
      file_num: row.file_num,
      name: row.name,
      department: row.department,
      jobs: row.jobs,
      grades: row.grades,
      gender: row.gender,
      nation: row.nation,
      date_birth: row.date_birth,
      idcard: row.idcard,
      tel: row.tel,
      marital: row.marital,
      education: row.education,
      graduate_institutions: row.graduate_institutions,
      major: row.major,
      hiredate: row.hiredate,
      probation: row.probation,
      positive: row.positive,
      politics_status: row.politics_status,
      working_state: row.working_state,
      departure_date: row.departure_date,
      account_type: row.account_type,
      take_job_date: row.take_job_date,
      present_address: row.present_address,
      contract_over_date: row.contract_over_date,
      bank_deposit: row.bank_deposit,
      card_no: row.card_no,
      payment_information: row.payment_information,
      create_date: row.create_date,
      update_date: row.update_date,
      create_userid: row.create_userid,
      dd_userid: row.dd_userid,
      del: row.del,
      id: row.id
    }
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const { data } = await updatePersonal(this.tempPersonalData)
        if (data.status === 'success') {
          this.getList()
          // const index = this.list.findIndex(v => v.num === data.result.num)
          // console.log(index)
          // this.list.splice(index, 1, data.result)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  // private handleDelete(row: any, index: number) {
  //   this.$notify({
  //     title: 'Success',
  //     message: 'Delete Successfully',
  //     type: 'success',
  //     duration: 2000
  //   })
  //   this.list.splice(index, 1)
  // }
  private async handleDelete(row: any, index: number) {
    const { data } = await deletePersonal({ id: row.id })
    if (data.status === 'success') {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }

  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ pageviews })
    this.pageviewsData = data.pageviews
    this.dialogPageviewsVisible = true
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(tHeader, data, 'table-list')
    this.downloadLoading = false
  }
}
</script>

<style scoped>
  .marginRight {
    display: inline-block;
    margin-right: 10px;
  }
</style>
