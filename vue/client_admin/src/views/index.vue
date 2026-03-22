<template>
  <div class="page_root" id="root_index">
    <div class="warp">
      <div class="container-fluid">
        <!-- 用户数量统计 -->
        <el-row>
          <el-col :span="4">
            <mm_label bg_color="bg_purple" icon="el-icon-user-solid" :url="url_user_count" unit="人"
                      title="用户数量"></mm_label>
          </el-col>
        </el-row>

        <!-- 航班数据筛选 -->
        <el-row>
          <el-col :span="24">
            <div class="filter-container">
              <el-select v-model="filters.departure" placeholder="出发地" clearable @change="updateCharts">
                <el-option v-for="item in departureOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select v-model="filters.destination" placeholder="目的地" clearable @change="updateCharts">
                <el-option v-for="item in destinationOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select v-model="filters.flightType" placeholder="航班类型" clearable @change="updateCharts">
                <el-option v-for="item in flightTypeOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-refresh" @click="fetchFlightData">刷新数据</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 航班统计卡片 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="stat-card">
              <i class="el-icon-tickets stat-card__icon"></i>
              <div class="stat-card__value">{{ filteredFlightData.length }}</div>
              <div class="stat-card__title">航班总数</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-card">
              <i class="el-icon-user-solid stat-card__icon"></i>
              <div class="stat-card__value">{{ totalRemainingVotes }}</div>
              <div class="stat-card__title">剩余票数总计</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-card">
              <i class="el-icon-view stat-card__icon"></i>
              <div class="stat-card__value">{{ totalHits }}</div>
              <div class="stat-card__title">总点击量</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-card">
              <i class="el-icon-s-promotion stat-card__icon"></i>
              <div class="stat-card__value">{{ averagePrice }}</div>
              <div class="stat-card__title">平均票价</div>
            </div>
          </el-col>
        </el-row>

        <!-- 图表展示 - 每个图表占满一行 -->
        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">各出发地航班数量</div>
              <div id="departureChart" class="full-width-chart"></div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">剩余票数分布</div>
              <div id="votesChart" class="full-width-chart"></div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">点击量TOP5航班</div>
              <div id="hitsChart" class="full-width-chart"></div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">票价与剩余票数关系</div>
              <div id="priceVotesChart" class="full-width-chart"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
import mm_label from "@/components/mm_label.vue";

export default {
  mixins: [mixin],
  name: "Home",
  components: {
    mm_label
  },
  data() {
    return {
      isAdmin: false,
      recognitionType: "",
      activeName: "third",
      url_user_count: "~/api/user/count?",
      flightData: [],
      filters: {
        departure: '',
        destination: '',
        flightType: ''
      },
      departureChart: null,
      votesChart: null,
      hitsChart: null,
      priceVotesChart: null,
      chartsInitialized: false
    };
  },
  computed: {
    filteredFlightData() {
      let data = this.flightData;
      if (this.filters.departure) {
        data = data.filter(item => item.place_of_departure === this.filters.departure);
      }
      if (this.filters.destination) {
        data = data.filter(item => item.destination === this.filters.destination);
      }
      if (this.filters.flightType) {
        data = data.filter(item => item.flight_type === this.filters.flightType);
      }
      return data;
    },
    departureOptions() {
      return [...new Set(this.flightData.map(item => item.place_of_departure))];
    },
    destinationOptions() {
      return [...new Set(this.flightData.map(item => item.destination))];
    },
    flightTypeOptions() {
      return [...new Set(this.flightData.map(item => item.flight_type))];
    },
    totalRemainingVotes() {
      return this.filteredFlightData.reduce((sum, item) => sum + item.remaining_votes, 0);
    },
    totalHits() {
      return this.filteredFlightData.reduce((sum, item) => sum + item.hits, 0);
    },
    averagePrice() {
      if (this.filteredFlightData.length === 0) return '0';
      const sum = this.filteredFlightData.reduce((sum, item) => sum + item.priceValue, 0);
      return (sum / this.filteredFlightData.length).toFixed(2);
    }
  },
  watch: {
    filteredFlightData() {
      if (this.chartsInitialized) {
        this.$nextTick(() => {
          this.updateCharts();
        });
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.initCharts();
    this.fetchFlightData();
  },
  methods: {
    processFlightData(data) {
      return data.map(item => {
        let price = 0;
        if (item.ticket_price && typeof item.ticket_price === 'string') {
          const priceMatch = item.ticket_price.match(/\d+/);
          price = priceMatch ? parseInt(priceMatch[0]) : 0;
        }
        
        return {
          ...item,
          priceValue: price,
          remaining_votes: parseInt(item.remaining_votes) || 0,
          hits: parseInt(item.hits) || 0
        };
      });
    },

    async fetchFlightData() {
      try {
        const res = await this.$get("http://127.0.0.1:5000/api/flight_information/get_list?like=0&size=70000&page=1&orderby=create_time%20desc");
        
        if (res && res.result && res.result.list) {
          this.flightData = this.processFlightData(res.result.list);
          this.$message.success(`成功加载${this.flightData.length}条航班数据`);
          
          this.$nextTick(() => {
            if (this.chartsInitialized) {
              this.updateCharts();
            } else {
              this.initCharts();
            }
          });
        } else {
          console.error('API返回数据格式不正确:', res);
          this.$message.error('获取航班数据失败：数据格式不正确');
        }
      } catch (error) {
        console.error('获取航班数据出错:', error);
        this.$message.error('获取航班数据失败，请检查网络连接');
      }
    },

    initCharts() {
      this.$nextTick(() => {
        try {
          this.departureChart = echarts.init(document.getElementById('departureChart'));
          this.votesChart = echarts.init(document.getElementById('votesChart'));
          this.hitsChart = echarts.init(document.getElementById('hitsChart'));
          this.priceVotesChart = echarts.init(document.getElementById('priceVotesChart'));
          
          this.chartsInitialized = true;
          
          window.addEventListener('resize', () => {
            this.departureChart && this.departureChart.resize();
            this.votesChart && this.votesChart.resize();
            this.hitsChart && this.hitsChart.resize();
            this.priceVotesChart && this.priceVotesChart.resize();
          });
        } catch (error) {
          console.error('图表初始化失败:', error);
          setTimeout(() => this.initCharts(), 100);
        }
      });
    },

    updateCharts() {
      if (!this.chartsInitialized || this.filteredFlightData.length === 0) {
        return;
      }
      
      try {
        // 1. 各出发地航班数量柱状图
        const departureCount = {};
        this.filteredFlightData.forEach(item => {
          const departure = item.place_of_departure;
          departureCount[departure] = (departureCount[departure] || 0) + 1;
        });
        
        this.departureChart.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          xAxis: { type: 'category', data: Object.keys(departureCount) },
          yAxis: { type: 'value', name: '航班数量' },
          series: [{ data: Object.values(departureCount), type: 'bar', itemStyle: { color: '#409EFF' } }]
        });

         // 2. 剩余票数分布饼图 - 只显示前5个主要航班，其余归为"其他"
  const sortedVotesData = [...this.filteredFlightData]
    .sort((a, b) => b.remaining_votes - a.remaining_votes);
  
  const topN = 100; // 显示前5个主要航班
  const mainData = sortedVotesData.slice(0, topN);
  const otherData = sortedVotesData.slice(topN);
  
  const otherTotal = otherData.reduce((sum, item) => sum + item.remaining_votes, 0);
  
  const votesData = [
    ...mainData.map(item => ({
      value: item.remaining_votes,
      name: `航班${item.flight_information_id}`
    })),
    {
      value: otherTotal,
      name: '其他航班'
    }
  ];
  
  this.votesChart.setOption({
    tooltip: { 
      trigger: 'item', 
      formatter: '{a} <br/>{b}: {c} ({d}%)' 
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: votesData.map(item => item.name),
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12
      }
    },
    series: [{
      name: '剩余票数',
      type: 'pie',
      center: ['40%', '50%'],
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: { 
        show: false, 
        position: 'center' 
      },
      emphasis: { 
        label: { 
          show: true, 
          fontSize: '18', 
          fontWeight: 'bold' 
        } 
      },
      labelLine: { show: false },
      data: votesData
    }]
  });

        // 3. 点击量TOP5航班条形图
        const topHits = [...this.filteredFlightData]
          .sort((a, b) => b.hits - a.hits)
          .slice(0, 5);
        
        this.hitsChart.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          xAxis: { type: 'value', name: '点击量' },
          yAxis: { type: 'category', data: topHits.map(item => `航班${item.flight_information_id}`) },
          series: [{
            name: '点击量',
            type: 'bar',
            data: topHits.map(item => item.hits),
            itemStyle: { color: '#67C23A' }
          }]
        });

        // 4. 票价与剩余票数关系散点图
        const priceVotesData = this.filteredFlightData.map(item => [
          item.priceValue,
          item.remaining_votes,
          item.flight_information_id
        ]);
        
        this.priceVotesChart.setOption({
          tooltip: {
            formatter: function (params) {
              return `航班${params.value[2]}<br/>票价: ${params.value[0]}<br/>剩余票数: ${params.value[1]}`;
            }
          },
          xAxis: { type: 'value', name: '票价', nameLocation: 'end', nameGap: 15 },
          yAxis: { type: 'value', name: '剩余票数', nameLocation: 'end', nameGap: 15 },
          series: [{
            type: 'scatter',
            data: priceVotesData,
            symbolSize: function (data) { return Math.sqrt(data[1]) * 2; },
            itemStyle: { color: '#E6A23C' }
          }]
        });

      } catch (error) {
        console.error('更新图表出错:', error);
      }
    }
  }
};
</script>

<style scoped>
.full-width-chart {
  display: block;
  width: 100%;
  height: 400px;
  padding: 1rem;
  position: relative;
}

.el-col {
  padding: 0.5rem;
}

.card {
  overflow: hidden;
}

.filter-container {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.full-width-chart-container {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.stat-card {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.stat-card__value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin: 10px 0;
}

.stat-card__title {
  color: #909399;
  font-size: 14px;
}

.stat-card__icon {
  font-size: 40px;
  color: #67C23A;
}

@media (max-width: 768px) {
  .el-col {
    width: 100%;
  }
  
  .stat-card {
    margin-bottom: 15px;
  }
  
  .full-width-chart {
    height: 350px;
  }
}
</style>