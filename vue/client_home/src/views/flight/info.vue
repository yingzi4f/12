<template>
  <div class="flight-info-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1>航空信息</h1>
        <p class="subtitle">查看所有航班信息</p>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <div class="filter-section">
      <div class="container">
        <div class="filter-box">
          <div class="filter-field">
            <el-input
              v-model="filters.departure"
              placeholder="出发地"
              clearable
              @clear="handleFilter"
              @keyup.enter.native="handleFilter">
              <template slot="prepend">出发地</template>
            </el-input>
          </div>
          <div class="filter-field">
            <el-input
              v-model="filters.destination"
              placeholder="目的地"
              clearable
              @clear="handleFilter"
              @keyup.enter.native="handleFilter">
              <template slot="prepend">目的地</template>
            </el-input>
          </div>
          <div class="filter-field">
            <el-select
              v-model="filters.flightType"
              placeholder="航班类型"
              clearable
              @change="handleFilter">
              <el-option label="全部" value=""></el-option>
              <el-option label="国内航班" value="国内航班"></el-option>
              <el-option label="国际航班" value="国际航班"></el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="handleFilter" icon="el-icon-search">搜索</el-button>
          <el-button @click="resetFilters" icon="el-icon-refresh-left">重置</el-button>
        </div>
      </div>
    </div>

    <!-- 航班列表 -->
    <div class="flight-list-section">
      <div class="container">
        <div class="list-header">
          <h2>航班列表</h2>
          <div class="list-info">
            <span>共 {{ totalFlights }} 条航班</span>
            <span style="margin-left: 10px; color: #999;">
              (原始数据: {{ flightList.length }} 条, 
              筛选后: {{ filteredList.length }} 条, 
              当前页: {{ displayList.length }} 条)
            </span>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="5" animated></el-skeleton>
        </div>

        <!-- 航班卡片列表 -->
        <div v-else-if="displayList.length > 0" class="flight-cards">
          <div
            v-for="(flight, index) in displayList"
            :key="index"
            class="flight-card"
            @click="viewDetails(flight)">
            <div class="card-header">
              <div class="route">
                <div class="departure">
                  <div class="city">{{ flight.place_of_departure }}</div>
                  <div class="time">{{ formatDate(flight.departure_time) }}</div>
                </div>
                <div class="duration">
                  <i class="el-icon-d-arrow-right"></i>
                  <span>{{ calculateDuration(flight.departure_time, flight.arrival_time) }}</span>
                </div>
                <div class="arrival">
                  <div class="city">{{ flight.destination }}</div>
                  <div class="time">{{ formatDate(flight.arrival_time) }}</div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="icon">✈️</span>
                  <div class="content">
                    <div class="label">航班号</div>
                    <div class="value">{{ flight.passenger_plane_number || '暂无' }}</div>
                  </div>
                </div>
                <div class="info-item">
                  <span class="icon">🛫</span>
                  <div class="content">
                    <div class="label">机型</div>
                    <div class="value">{{ flight.aircraft_model || '暂无' }}</div>
                  </div>
                </div>
                <div class="info-item">
                  <span class="icon">💺</span>
                  <div class="content">
                    <div class="label">座位类型</div>
                    <div class="value">{{ flight.seat_type || '暂无' }}</div>
                  </div>
                </div>
                <div class="info-item">
                  <span class="icon">🎫</span>
                  <div class="content">
                    <div class="label">剩余票数</div>
                    <div class="value" :class="{'low-stock': flight.remaining_votes <= 5}">
                      {{ flight.remaining_votes || 0 }} 张
                    </div>
                  </div>
                </div>
                <div class="info-item">
                  <span class="icon">💰</span>
                  <div class="content">
                    <div class="label">票价</div>
                    <div class="value price">{{ flight.ticket_price || '暂无价格' }}</div>
                  </div>
                </div>
                <div class="info-item">
                  <span class="icon">🏷️</span>
                  <div class="content">
                    <div class="label">航班类型</div>
                    <div class="value">{{ flight.flight_type || '暂无' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <el-button type="primary" size="small" @click.stop="goToBooking(flight)">
                预订
              </el-button>
              <el-button size="small" @click.stop="viewDetails(flight)">
                查看详情
              </el-button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="empty-state">
          <el-empty description="暂无航班信息"></el-empty>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="totalFlights > pageSize">
          <el-pagination
            @current-change="handlePageChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalFlights"
            layout="prev, pager, next, jumper, total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightInfo',
  data() {
    return {
      flightList: [],
      filteredList: [], // 初始化为空数组，在 applyFilters 中会被填充
      loading: false,
      currentPage: 1,
      pageSize: 12,
      totalFlights: 0,
      filters: {
        departure: '',
        destination: '',
        flightType: ''
      }
    };
  },
  created() {
    // 在 created 钩子中加载数据
    this.loadFlightList();
  },
  mounted() {
  },
  methods: {
    // 加载航班列表
    loadFlightList() {
      this.loading = true;
      console.log('=== 开始加载航班列表 ===');

      this.$get('~/api/flight_information/get_list?', {
        page: 1,
        size: 10000
      }, (res) => {
        console.log('API 返回数据:', res);
        this.loading = false;

        if (res && res.result) {
          if (Array.isArray(res.result.list)) {
            console.log('使用 res.result.list，数量:', res.result.list.length);
            this.flightList = res.result.list;
            this.totalFlights = this.flightList.length;
            this.applyFilters();
            console.log('applyFilters 后 filteredList 长度:', this.filteredList.length);
            console.log('displayList 长度:', this.displayList.length);
            this.$message.success(`成功加载 ${this.totalFlights} 条航班信息`);
          } else if (Array.isArray(res.result)) {
            console.log('使用 res.result，数量:', res.result.length);
            this.flightList = res.result;
            this.totalFlights = this.flightList.length;
            this.applyFilters();
            this.$message.success(`成功加载 ${this.totalFlights} 条航班信息`);
          } else {
            console.error('数据格式不正确:', res);
            this.$message.error('数据格式不正确');
          }
        } else if (res && res.error) {
          console.error('API 错误:', res.error);
          this.$message.error('获取航班信息失败: ' + (res.error.message || res.error));
        } else {
          console.error('未知响应格式:', res);
          this.$message.error('获取航班信息失败');
        }
      });
    },

    // 应用筛选条件
    applyFilters() {
      console.log('=== applyFilters 被调用 ===');
      console.log('flightList 长度:', this.flightList.length);
      
      let list = [...this.flightList];

      if (this.filters.departure) {
        list = list.filter(item =>
          item.place_of_departure && item.place_of_departure.includes(this.filters.departure)
        );
      }

      if (this.filters.destination) {
        list = list.filter(item =>
          item.destination && item.destination.includes(this.filters.destination)
        );
      }

      if (this.filters.flightType) {
        list = list.filter(item =>
          item.flight_type === this.filters.flightType
        );
      }

      this.filteredList = list;
      this.totalFlights = list.length;
      // 重置到第一页
      this.currentPage = 1;
      
      console.log('applyFilters 完成，filteredList 长度:', this.filteredList.length);

      // 强制触发重新渲染
      this.$forceUpdate();
    },

    // 处理筛选
    handleFilter() {
      this.applyFilters();
    },

    // 重置筛选
    resetFilters() {
      this.filters = {
        departure: '',
        destination: '',
        flightType: ''
      };
      this.applyFilters();
    },

    // 分页改变
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // 查看详情
    viewDetails(flight) {
      this.$router.push({
        path: '/flight_information/details',
        query: { flight_information_id: flight.flight_information_id }
      });
    },

    // 跳转到预订页面
    goToBooking(flight) {
      this.$router.push({
        path: '/flight/booking',
        query: {
          departure: flight.place_of_departure,
          destination: flight.destination
        }
      });
    },

    // 格式化日期时间
    formatDate(dateValue) {
      if (!dateValue) return '--';

      try {
        let date;
        
        // 如果是数字（Unix时间戳）
        if (typeof dateValue === 'number') {
          date = new Date(dateValue);
        }
        // 如果是Date对象
        else if (dateValue instanceof Date) {
          date = dateValue;
        }
        // 如果是字符串
        else if (typeof dateValue === 'string') {
          date = new Date(dateValue);
        }
        else {
          return '--';
        }

        // 检查日期是否有效
        if (isNaN(date.getTime())) {
          return '--';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
      } catch (e) {
        console.error('formatDate 错误:', e, dateValue);
        return '--';
      }
    },

    // 格式化时间（保留，以防其他地方使用）
    formatTime(timeValue) {
      if (!timeValue) return '--:--';

      try {
        // 如果是数字（Unix时间戳）
        if (typeof timeValue === 'number') {
          const date = new Date(timeValue);
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${hours}:${minutes}`;
        }

        // 如果是Date对象
        if (timeValue instanceof Date) {
          const hours = String(timeValue.getHours()).padStart(2, '0');
          const minutes = String(timeValue.getMinutes()).padStart(2, '0');
          return `${hours}:${minutes}`;
        }

        // 如果是字符串
        if (typeof timeValue === 'string') {
          // 处理 ISO 格式 (如 "2024-01-01T10:30:00")
          if (timeValue.includes('T')) {
            const date = new Date(timeValue);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
          }
          
          // 处理时间格式 (如 "10:30:00" 或 "10:30")
          if (timeValue.includes(':')) {
            const parts = timeValue.split(':');
            if (parts.length >= 2) {
              return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
            }
          }
          
          return timeValue;
        }

        return '--:--';
      } catch (e) {
        console.error('formatTime 错误:', e, timeValue);
        return '--:--';
      }
    },

    // 计算飞行时长
    calculateDuration(departure, arrival) {
      if (!departure || !arrival) return '--';

      try {
        let depMinutes = 0, arrMinutes = 0;

        // 处理出发时间
        if (typeof departure === 'number') {
          const depDate = new Date(departure);
          depMinutes = depDate.getHours() * 60 + depDate.getMinutes();
        } else if (departure instanceof Date) {
          depMinutes = departure.getHours() * 60 + departure.getMinutes();
        } else if (typeof departure === 'string') {
          if (departure.includes('T')) {
            const depDate = new Date(departure);
            depMinutes = depDate.getHours() * 60 + depDate.getMinutes();
          } else if (departure.includes(':')) {
            const depParts = departure.split(':');
            depMinutes = parseInt(depParts[0]) * 60 + parseInt(depParts[1]);
          } else {
            return '--';
          }
        } else {
          return '--';
        }

        // 处理到达时间
        if (typeof arrival === 'number') {
          const arrDate = new Date(arrival);
          arrMinutes = arrDate.getHours() * 60 + arrDate.getMinutes();
        } else if (arrival instanceof Date) {
          arrMinutes = arrival.getHours() * 60 + arrival.getMinutes();
        } else if (typeof arrival === 'string') {
          if (arrival.includes('T')) {
            const arrDate = new Date(arrival);
            arrMinutes = arrDate.getHours() * 60 + arrDate.getMinutes();
          } else if (arrival.includes(':')) {
            const arrParts = arrival.split(':');
            arrMinutes = parseInt(arrParts[0]) * 60 + parseInt(arrParts[1]);
          } else {
            return '--';
          }
        } else {
          return '--';
        }

        let diff = arrMinutes - depMinutes;
        if (diff < 0) diff += 24 * 60;

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        return `${hours}小时${minutes}分`;
      } catch (e) {
        console.error('calculateDuration 错误:', e, departure, arrival);
        return '--';
      }
    }
  },
  computed: {
    // 当前页显示的航班列表
    displayList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredList.slice(start, end);
    }
  }
};
</script>

<style scoped>
.flight-info-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.filter-section {
  background: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.filter-box {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-field {
  flex: 1;
  min-width: 200px;
}

.flight-list-section {
  padding: 2rem 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h2 {
  margin: 0;
  color: #333;
}

.list-info {
  color: #666;
  font-size: 0.9rem;
}

.loading-container {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.flight-cards {
  display: grid;
  gap: 1.5rem;
}

.flight-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.flight-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  color: white;
}

.route {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.departure,
.arrival {
  text-align: center;
}

.city {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.time {
  font-size: 1.1rem;
  opacity: 0.9;
}

.duration {
  text-align: center;
  flex: 1;
  font-size: 0.9rem;
  opacity: 0.9;
}

.duration i {
  font-size: 1.2rem;
  margin: 0 0.5rem;
}

.card-body {
  padding: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.5rem;
}

.content {
  flex: 1;
}

.label {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

.value.low-stock {
  color: #f56c6c;
  font-weight: bold;
}

.value.price {
  color: #f56c6c;
  font-size: 1.1rem;
  font-weight: bold;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.empty-state {
  background: white;
  border-radius: 8px;
  padding: 4rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .filter-box {
    flex-direction: column;
  }

  .filter-field {
    width: 100%;
  }

  .route {
    flex-direction: column;
    gap: 1rem;
  }

  .duration {
    transform: rotate(90deg);
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-footer {
    flex-direction: column;
  }
}
</style>
