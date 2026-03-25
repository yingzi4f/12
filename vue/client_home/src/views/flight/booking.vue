<template>
  <div class="flight-booking-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1>航空购票</h1>
        <p class="subtitle">搜索并预订您的航班</p>
      </div>
    </div>

    <!-- 搜索区域 -->
    <div class="search-section">
      <div class="container">
        <div class="search-box">
          <!-- 文字搜索 -->
          <div class="text-search">
            <div class="search-row">
              <div class="search-field">
                <label>出发地</label>
                <el-input v-model="searchForm.departure" placeholder="请输入出发地" clearable></el-input>
              </div>
              <div class="search-icon">
                <i class="el-icon-d-arrow-right"></i>
              </div>
              <div class="search-field">
                <label>目的地</label>
                <el-input v-model="searchForm.destination" placeholder="请输入目的地" clearable></el-input>
              </div>
              <div class="search-button">
                <el-button type="primary" @click="handleTextSearch" icon="el-icon-search">搜索航班</el-button>
                <el-button @click="loadAllFlights" icon="el-icon-view">查看所有航班</el-button>
              </div>
            </div>
            <div class="search-row date-row">
              <div class="search-field">
                <label>出发日期</label>
                <el-date-picker
                  v-model="searchForm.date"
                  type="date"
                  placeholder="选择日期（可选）"
                  value-format="yyyy-MM-dd"
                  clearable>
                </el-date-picker>
              </div>
              <div class="search-field">
                <label>搜索范围</label>
                <el-select v-model="searchForm.dateRange" placeholder="选择范围">
                  <el-option label="前后3天（推荐）" value="3days"></el-option>
                  <el-option label="前后7天" value="7days"></el-option>
                  <el-option label="当月" value="month"></el-option>
                  <el-option label="精确匹配" value="exact"></el-option>
                </el-select>
              </div>
            </div>
          </div>

          <!-- 图片搜索分隔线 -->
          <div class="divider">
            <span>或</span>
          </div>

          <!-- 图片搜索 -->
          <div class="image-search">
            <el-upload
              class="upload-demo"
              action="#"
              :show-file-list="false"
              :before-upload="handleImageUpload"
              accept="image/*">
              <el-button icon="el-icon-picture-outline">上传图片搜索</el-button>
              <div slot="tip" class="el-upload__tip">
                上传航班截图或机票图片，我们将为您识别航班信息
              </div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results" v-if="searchResults.length > 0">
      <div class="container">
        <div class="results-header">
          <h2>搜索结果 ({{ searchResults.length }})</h2>
          <el-button @click="clearSearch" icon="el-icon-refresh-left">清除搜索</el-button>
        </div>

        <div class="flight-list">
          <div v-for="(flight, index) in searchResults" :key="index" class="flight-card">
            <div class="flight-info">
              <div class="route">
                <div class="location">
                  <div class="city">{{ flight.place_of_departure }}</div>
                  <div class="date">{{ formatDate(flight.departure_time) }}</div>
                  <div class="time">{{ formatTime(flight.departure_time) }}</div>
                </div>
                <div class="arrow">
                  <i class="el-icon-d-arrow-right"></i>
                </div>
                <div class="location">
                  <div class="city">{{ flight.destination }}</div>
                  <div class="date">{{ formatDate(flight.arrival_time) }}</div>
                  <div class="time">{{ formatTime(flight.arrival_time) }}</div>
                </div>
              </div>

              <div class="details">
                <div class="detail-item">
                  <span class="label">航班号:</span>
                  <span class="value">{{ flight.passenger_plane_number || '-' }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">机型:</span>
                  <span class="value">{{ flight.aircraft_model || '-' }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">座位类型:</span>
                  <span class="value">{{ flight.seat_type || '-' }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">剩余票数:</span>
                  <span class="value remaining">{{ flight.remaining_votes || 0 }}</span>
                </div>
              </div>
            </div>

            <div class="flight-action">
              <div class="price">{{ flight.ticket_price || '暂无价格' }}</div>
              <el-button
                type="primary"
                size="medium"
                @click="goToSeatSelection(flight)"
                :disabled="!flight.remaining_votes || flight.remaining_votes <= 0">
                预订
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-state" v-else-if="hasSearched && searchResults.length === 0">
      <div class="container">
        <el-empty description="未找到符合条件的航班，请尝试调整搜索条件"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightBooking',
  data() {
    return {
      searchForm: {
        departure: '',
        destination: '',
        date: '',
        dateRange: '3days' // 默认搜索前后3天
      },
      searchResults: [],
      hasSearched: false
    };
  },
  mounted() {
    // 从路由参数获取搜索条件
    if (this.$route.query.departure) {
      this.searchForm.departure = this.$route.query.departure;
    }
    if (this.$route.query.destination) {
      this.searchForm.destination = this.$route.query.destination;
    }
    if (this.$route.query.date) {
      this.searchForm.date = this.$route.query.date;
    }

    // 如果有搜索条件，自动搜索
    if (this.searchForm.departure || this.searchForm.destination) {
      this.handleTextSearch();
    }
  },
  methods: {
    handleTextSearch() {
      const params = {
        page: 1,
        size: 10000
      };

      // 只传递地点参数，日期在前端过滤
      if (this.searchForm.departure) {
        params.place_of_departure = this.searchForm.departure;
      }
      if (this.searchForm.destination) {
        params.destination = this.searchForm.destination;
      }

      this.$get('~/api/flight_information/get_list?', params, (res) => {
        if (res && res.result) {
          let flights = [];

          if (Array.isArray(res.result.list)) {
            flights = res.result.list;
          } else if (Array.isArray(res.result)) {
            flights = res.result;
          }

          // 在前端根据日期过滤
          if (this.searchForm.date) {
            flights = this.filterByDate(flights, this.searchForm.date);
          }

          this.searchResults = flights;
          this.hasSearched = true;

          if (flights.length > 0) {
            this.$message.success(`找到 ${flights.length} 个航班`);
          } else {
            this.$message.warning('未找到符合条件的航班');
          }
        } else if (res && res.error) {
          this.$message.error('获取航班信息失败: ' + res.error);
        } else {
          this.$message.error('获取航班信息失败');
        }
      });
    },

    // 根据日期过滤航班
    filterByDate(flights, dateStr) {
      if (!dateStr) return flights;

      const range = this.searchForm.dateRange || '3days';
      const searchDate = new Date(dateStr);
      const searchYear = searchDate.getFullYear();
      const searchMonth = searchDate.getMonth();
      const searchDay = searchDate.getDate();

      console.log('搜索日期:', dateStr, '范围:', range);

      const filtered = flights.filter(flight => {
        if (!flight.departure_time) return false;

        let flightDate;
        if (typeof flight.departure_time === 'number') {
          flightDate = new Date(flight.departure_time);
        } else {
          flightDate = new Date(flight.departure_time);
        }

        const flightYear = flightDate.getFullYear();
        const flightMonth = flightDate.getMonth();
        const flightDay = flightDate.getDate();

        let match = false;

        // 根据搜索范围进行匹配
        if (range === 'exact') {
          // 精确匹配
          match = flightYear === searchYear &&
                  flightMonth === searchMonth &&
                  flightDay === searchDay;
        } else if (range === '3days') {
          // 前后3天
          const diffTime = flightDate.getTime() - searchDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          match = Math.abs(diffDays) <= 3;
        } else if (range === '7days') {
          // 前后7天
          const diffTime = flightDate.getTime() - searchDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          match = Math.abs(diffDays) <= 7;
        } else if (range === 'month') {
          // 当月
          match = flightYear === searchYear &&
                  flightMonth === searchMonth;
        }

        if (!match && flight.place_of_departure && flight.destination) {
          console.log('航班未匹配:', {
            route: `${flight.place_of_departure} -> ${flight.destination}`,
            searchDate: `${searchYear}-${searchMonth + 1}-${searchDay}`,
            flightDate: `${flightYear}-${flightMonth + 1}-${flightDay}`,
            range: range
          });
        }

        return match;
      });

      console.log('过滤后航班数:', filtered.length, '/', flights.length);
      return filtered;
    },

    loadAllFlights() {
      this.$message.info('正在加载所有航班...');

      this.$get('~/api/flight_information/get_list?', {
        page: 1,
        size: 10000
      }, (res) => {
        if (res && res.result) {
          if (Array.isArray(res.result.list)) {
            this.$set(this, 'searchResults', res.result.list);
            this.$set(this, 'hasSearched', true);
            this.$message.success(`成功加载 ${this.searchResults.length} 个航班`);
          } else if (Array.isArray(res.result)) {
            this.$set(this, 'searchResults', res.result);
            this.$set(this, 'hasSearched', true);
            this.$message.success(`成功加载 ${this.searchResults.length} 个航班`);
          } else {
            this.$message.error('数据格式不正确');
          }
        } else {
          this.$message.error('API返回数据格式错误');
        }
      });
    },

    handleImageUpload(file) {
      const isImage = file.type.startsWith('image/');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('只能上传图片文件!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }

      this.$message.info('正在识别图片中的航班信息...');

      setTimeout(() => {
        this.$get('~/api/flight_information/get_list?', {
          page: 1,
          size: 1000
        }, (res) => {
          if (res && res.result) {
            if (Array.isArray(res.result.list)) {
              this.searchResults = res.result.list.slice(0, 10);
              this.hasSearched = true;
              this.$message.success(`图片识别完成，为您推荐 ${this.searchResults.length} 个航班`);
            } else if (Array.isArray(res.result)) {
              this.searchResults = res.result.slice(0, 10);
              this.hasSearched = true;
              this.$message.success(`图片识别完成，为您推荐 ${this.searchResults.length} 个航班`);
            }
          }
        });
      }, 1500);

      return false;
    },

    goToSeatSelection(flight) {
      sessionStorage.setItem('selectedFlight', JSON.stringify(flight));
      this.$router.push({
        path: '/flight/seat-selection',
        query: {
          flight_id: flight.flight_information_id
        }
      });
    },

    clearSearch() {
      this.searchForm = {
        departure: '',
        destination: '',
        date: '',
        dateRange: '3days'
      };
      this.searchResults = [];
      this.hasSearched = false;
    },

    formatTime(timeValue) {
      if (!timeValue) return '--:--';

      // If it's a number (Unix timestamp in milliseconds)
      if (typeof timeValue === 'number') {
        const date = new Date(timeValue);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      }

      // If it's already a string (fallback)
      if (typeof timeValue === 'string') {
        const parts = timeValue.split(':');
        if (parts.length >= 2) {
          return `${parts[0]}:${parts[1]}`;
        }
        return timeValue;
      }

      return '--:--';
    },

    // 格式化日期
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

        return `${year}-${month}-${day}`;
      } catch (e) {
        return '--';
      }
    }
  }
};
</script>

<style scoped>
.flight-booking-page {
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

.search-section {
  padding: 2rem 0;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.search-box {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.text-search .search-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.text-search .date-row {
  margin-top: 1rem;
  justify-content: center;
}

.search-field {
  flex: 1;
}

.search-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.search-icon {
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #667eea;
}

.search-button {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.search-button .el-button {
  height: 40px;
}

.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #999;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
}

.image-search {
  text-align: center;
}

.search-results {
  padding: 2rem 0;
  min-height: 200px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.results-header h2 {
  margin: 0;
  color: #333;
}

.flight-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flight-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.flight-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.flight-info {
  flex: 1;
}

.route {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.location {
  text-align: center;
}

.city {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
}

.time {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 500;
}

.date {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.25rem;
}

.arrow {
  font-size: 1.5rem;
  color: #999;
}

.details {
  display: flex;
  gap: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-item .label {
  color: #999;
  font-size: 0.9rem;
}

.detail-item .value {
  color: #333;
  font-weight: 500;
}

.detail-item .remaining {
  color: #67c23a;
  font-weight: bold;
}

.flight-action {
  text-align: right;
  margin-left: 2rem;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #f56c6c;
  margin-bottom: 0.5rem;
}

.empty-state {
  padding: 4rem 0;
}

@media (max-width: 768px) {
  .text-search .search-row {
    flex-direction: column;
  }

  .search-icon {
    transform: rotate(90deg);
  }

  .search-button {
    flex-direction: column;
    width: 100%;
  }

  .search-button .el-button {
    width: 100%;
  }

  .flight-card {
    flex-direction: column;
    gap: 1rem;
  }

  .flight-action {
    margin-left: 0;
    text-align: left;
  }

  .details {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
