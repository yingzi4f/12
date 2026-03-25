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
              <div class="chart-title">目的地分布</div>
              <div id="departureChart" class="full-width-chart"></div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">剩余票数分布</div>
              <div class="votes-grid-container">
                <div v-for="(item, index) in topVotesFlights" :key="index" class="vote-card-frame">
                  <div class="vote-card-inner">
                    <div class="vote-card-header">
                      <i class="el-icon-tickets"></i>
                      <span class="flight-id">航班 {{ item.flight_information_id }}</span>
                    </div>
                    <div class="vote-card-body">
                      <div class="vote-count">{{ item.remaining_votes }}</div>
                      <div class="vote-label">剩余票数</div>
                    </div>
                    <div class="vote-card-footer">
                      <span class="departure">{{ item.place_of_departure }}</span>
                      <i class="el-icon-d-arrow-right arrow-icon"></i>
                      <span class="destination">{{ item.destination }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">TOP5航班点击量</div>
              <div id="hitsChart" class="full-width-chart"></div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="full-width-chart-container">
              <div class="chart-title">出发地数量统计</div>
              <div id="hotDestinationChart" class="full-width-chart"></div>
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
      hitsChart: null,
      hotDestinationChart: null,
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
    topVotesFlights() {
      return [...this.filteredFlightData]
        .sort((a, b) => b.remaining_votes - a.remaining_votes)
        .slice(0, 12); // 显示前12个航班
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
        const res = await this.$get("http://127.0.0.1:5000/api/flight_information/get_list?like=0&size=100000&page=1&orderby=create_time%20desc");

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
          this.hitsChart = echarts.init(document.getElementById('hitsChart'));
          this.hotDestinationChart = echarts.init(document.getElementById('hotDestinationChart'));

          this.chartsInitialized = true;

          window.addEventListener('resize', () => {
            this.departureChart && this.departureChart.resize();
            this.hitsChart && this.hitsChart.resize();
            this.hotDestinationChart && this.hotDestinationChart.resize();
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
        // 1. 目的地分布柱状图
        const destinationCount = {};
        this.filteredFlightData.forEach(item => {
          const dest = item.destination;
          destinationCount[dest] = (destinationCount[dest] || 0) + 1;
        });

        // 按数量排序，取前15个
        const sortedDestinations = Object.entries(destinationCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15);

        this.departureChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
              return `${params[0].name}<br/>航班数量: ${params[0].value}`;
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: sortedDestinations.map(item => item[0]),
            axisLabel: {
              interval: 0,
              rotate: 30
            }
          },
          yAxis: {
            type: 'value',
            name: '航班数量',
            minInterval: 1
          },
          series: [{
            data: sortedDestinations.map(item => item[1]),
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}',
              color: '#333',
              fontSize: 12
            }
          }]
        });

        // 3. TOP5航班点击量条形图
        const topHits = [...this.filteredFlightData]
          .sort((a, b) => b.hits - a.hits)
          .slice(0, 5);

        this.hitsChart.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          xAxis: { type: 'value', name: '点击量' },
          yAxis: { type: 'category', data: topHits.map(item => `${item.place_of_departure} → ${item.destination}`) },
          series: [{
            name: '点击量',
            type: 'bar',
            data: topHits.map(item => item.hits),
            itemStyle: { color: '#67C23A' }
          }]
        });

        // 4. 出发地数量统计柱状图
        const departureCount = {};
        this.filteredFlightData.forEach(item => {
          const departure = item.place_of_departure;
          departureCount[departure] = (departureCount[departure] || 0) + 1;
        });

        // 按数量排序，取前15个
        const sortedDepartures = Object.entries(departureCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15);

        this.hotDestinationChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function (params) {
              return `${params[0].name}<br/>航班数量: ${params[0].value}`;
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: sortedDepartures.map(item => item[0]),
            axisLabel: {
              interval: 0,
              rotate: 45
            }
          },
          yAxis: {
            type: 'value',
            name: '航班数量'
          },
          series: [{
            name: '航班数量',
            type: 'bar',
            data: sortedDepartures.map(item => item[1]),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#f093fb' },
                { offset: 0.5, color: '#f5576c' },
                { offset: 1, color: '#f5576c' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#f093fb' },
                  { offset: 1, color: '#f5576c' }
                ])
              }
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }
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

/* 剩余票数卡片网格样式 */
.votes-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px;
}

.vote-card-frame {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.vote-card-frame:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

.vote-card-inner {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vote-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 12px;
}

.vote-card-header i {
  font-size: 20px;
  color: #667eea;
}

.flight-id {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.vote-card-body {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vote-count {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  line-height: 1;
}

.vote-label {
  font-size: 14px;
  color: #999;
}

.vote-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 2px solid #f0f0f0;
  margin-top: 12px;
  font-size: 13px;
}

.departure, .destination {
  color: #666;
  font-weight: 500;
}

.arrow-icon {
  color: #667eea;
  font-size: 14px;
}
</style>