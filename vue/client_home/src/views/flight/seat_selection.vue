<template>
  <div class="seat-selection-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1>选择座位</h1>
        <el-button @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <!-- 航班信息 -->
    <div class="flight-info-section">
      <div class="container">
        <div class="flight-info-card">
          <div class="info-row">
            <div class="info-item">
              <span class="label">航班号:</span>
              <span class="value">{{ flight.passenger_plane_number || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">机型:</span>
              <span class="value">{{ flight.aircraft_model || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">出发地:</span>
              <span class="value">{{ flight.place_of_departure }}</span>
            </div>
            <div class="info-item">
              <span class="label">目的地:</span>
              <span class="value">{{ flight.destination }}</span>
            </div>
            <div class="info-item">
              <span class="label">出发时间:</span>
              <span class="value">{{ formatTime(flight.departure_time) }}</span>
            </div>
            <div class="info-item">
              <span class="label">票价:</span>
              <span class="value price">{{ flight.ticket_price || '暂无价格' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选座区域 -->
    <div class="seat-selection-section">
      <div class="container">
        <div class="selection-container">
          <!-- 图例 -->
          <div class="legend">
            <div class="legend-item">
              <div class="seat available"></div>
              <span>可选</span>
            </div>
            <div class="legend-item">
              <div class="seat selected"></div>
              <span>已选</span>
            </div>
            <div class="legend-item">
              <div class="seat occupied"></div>
              <span>已售</span>
            </div>
          </div>

          <!-- 机头指示 -->
          <div class="plane-header">
            <i class="el-icon-s-promotion"></i>
            <span>机头</span>
          </div>

          <!-- 座位图 -->
          <div class="seat-map">
            <div class="cabin" v-for="(cabin, cabinIndex) in seatLayout" :key="cabinIndex">
              <div class="cabin-label">{{ cabin.name }}</div>
              <div class="seats-grid">
                <div
                  v-for="(seat, seatIndex) in cabin.seats"
                  :key="seatIndex"
                  class="seat"
                  :class="{
                    'available': seat.status === 'available',
                    'selected': seat.status === 'selected',
                    'occupied': seat.status === 'occupied'
                  }"
                  @click="selectSeat(seat, cabinIndex, seatIndex)"
                  :title="`${seat.row}${seat.column} - ${getSeatStatusText(seat.status)}`">
                  {{ seat.row }}{{ seat.column }}
                </div>
              </div>
            </div>
          </div>

          <!-- 选择的座位信息 -->
          <div class="selected-seats-info">
            <h3>已选座位</h3>
            <div class="selected-list" v-if="selectedSeats.length > 0">
              <el-tag
                v-for="(seat, index) in selectedSeats"
                :key="index"
                closable
                @close="removeSeat(index)"
                type="success">
                {{ seat.row }}{{ seat.column }} - {{ seat.cabin }}
              </el-tag>
            </div>
            <div class="no-selection" v-else>
              请点击座位图选择座位
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 乘客信息和确认 -->
    <div class="passenger-section">
      <div class="container">
        <div class="passenger-form">
          <h2>乘客信息</h2>
          <el-form :model="passengerForm" :rules="rules" ref="passengerForm" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="passengerForm.name" placeholder="请输入乘机人姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="passengerForm.idCard" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="passengerForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-form>

          <div class="price-summary">
            <div class="price-item">
              <span class="label">票价:</span>
              <span class="value">{{ ticketPrice }}</span>
            </div>
            <div class="price-item">
              <span class="label">座位数:</span>
              <span class="value">{{ selectedSeats.length }}</span>
            </div>
            <div class="price-item total">
              <span class="label">总计:</span>
              <span class="value totalPrice">{{ totalPrice }}</span>
            </div>
          </div>

          <div class="action-buttons">
            <el-button @click="goBack" size="large">返回</el-button>
            <el-button
              type="primary"
              @click="submitBooking"
              size="large"
              :disabled="selectedSeats.length === 0">
              确认预订
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeatSelection',
  data() {
    return {
      flight: {},
      seatLayout: [],
      selectedSeats: [],
      passengerForm: {
        name: '',
        idCard: '',
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入乘机人姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ticketPrice() {
      return this.flight.ticket_price || '¥0';
    },
    totalPrice() {
      if (!this.flight.ticket_price) return '¥0';
      const price = parseInt(this.flight.ticket_price.replace(/\D/g, '')) || 0;
      return `¥${price * this.selectedSeats.length}`;
    }
  },
  mounted() {
    this.loadFlightInfo();
    this.initSeatLayout();
  },
  methods: {
    // 加载航班信息
    loadFlightInfo() {
      const flightId = this.$route.query.flight_id;
      if (!flightId) {
        this.$message.error('航班信息丢失，请重新选择航班');
        this.goBack();
        return;
      }

      // 从 sessionStorage 获取航班信息
      const savedFlight = sessionStorage.getItem('selectedFlight');
      if (savedFlight) {
        this.flight = JSON.parse(savedFlight);
      } else {
        // 如果没有，从API获取
        this.$get(`~/api/flight_information/get_obj?flight_information_id=${flightId}`, (res) => {
          if (res.result) {
            this.flight = res.result;
          }
        });
      }
    },

    // 初始化座位布局
    initSeatLayout() {
      // 根据剩余票数生成座位图
      const remainingVotes = parseInt(this.flight.remaining_votes) || 0;

      // 经济舱
      const economySeats = [];
      const rows = 10;
      const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

      for (let row = 1; row <= rows; row++) {
        columns.forEach((col) => {
          const seatNum = (row - 1) * columns.length + columns.indexOf(col) + 1;
          economySeats.push({
            row: row,
            column: col,
            status: seatNum <= remainingVotes ? 'available' : 'occupied'
          });
        });
      }

      // 商务舱
      const businessSeats = [];
      for (let row = 11; row <= 13; row++) {
        columns.slice(0, 4).forEach((col) => {
          const seatNum = 60 + (row - 11) * 4 + columns.indexOf(col) + 1;
          businessSeats.push({
            row: row,
            column: col,
            status: seatNum <= remainingVotes ? 'available' : 'occupied'
          });
        });
      }

      this.seatLayout = [
        {
          name: '商务舱',
          seats: businessSeats
        },
        {
          name: '经济舱',
          seats: economySeats
        }
      ];
    },

    // 选择座位
    selectSeat(seat, cabinIndex, seatIndex) {
      if (seat.status === 'occupied') {
        this.$message.warning('该座位已售出');
        return;
      }

      if (seat.status === 'available') {
        // 最多选择5个座位
        if (this.selectedSeats.length >= 5) {
          this.$message.warning('最多只能选择5个座位');
          return;
        }

        seat.status = 'selected';
        this.selectedSeats.push({
          ...seat,
          cabin: this.seatLayout[cabinIndex].name
        });
      } else if (seat.status === 'selected') {
        seat.status = 'available';
        const index = this.selectedSeats.findIndex(s =>
          s.row === seat.row && s.column === seat.column
        );
        if (index > -1) {
          this.selectedSeats.splice(index, 1);
        }
      }
    },

    // 移除座位
    removeSeat(index) {
      const seat = this.selectedSeats[index];
      seat.status = 'available';

      // 在座位图中更新状态
      this.seatLayout.forEach(cabin => {
        cabin.seats.forEach(s => {
          if (s.row === seat.row && s.column === seat.column) {
            s.status = 'available';
          }
        });
      });

      this.selectedSeats.splice(index, 1);
    },

    // 获取座位状态文本
    getSeatStatusText(status) {
      const statusMap = {
        available: '可选',
        selected: '已选',
        occupied: '已售'
      };
      return statusMap[status] || status;
    },

    // 提交预订
    submitBooking() {
      if (this.selectedSeats.length === 0) {
        this.$message.warning('请至少选择一个座位');
        return;
      }

      this.$refs.passengerForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认预订该航班吗？', '确认预订', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            // 构建座位字符串 (格式: "0,1,2" 表示座位索引)
            const seatIndices = this.selectedSeats.map(seat => {
              const seatIndex = (seat.row - 1) * 6 + ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(seat.column);
              return seatIndex.toString();
            }).join(',');

            // 获取当前用户信息
            const userId = this.$store.state.user.user_id;

            // 计算总价格
            const price = parseInt(this.flight.ticket_price?.replace(/\D/g, '')) || 0;

            // 创建订单数据
            const orderData = {
              place_of_departure: this.flight.place_of_departure,
              destination: this.flight.destination,
              departure_time: this.flight.departure_time,
              arrival_time: this.flight.arrival_time,
              flight_type: this.flight.flight_type || '国内航班',
              seat_type: this.flight.seat_type,
              passenger_plane_number: this.flight.passenger_plane_number,
              aircraft_model: this.flight.aircraft_model,
              ticket_price: this.flight.ticket_price,
              number_of_purchased_sheets: this.selectedSeats.length,
              total_amount: price * this.selectedSeats.length,
              user_account: userId,
              order_status: '未出行',
              seat: seatIndices
            };

            // 提交订单到后端
            this.$post('~/api/order_center/add?', orderData, (res) => {
              if (res.result) {
                this.$message.success('预订成功！即将跳转到我的订单...');
                // 清空 sessionStorage
                sessionStorage.removeItem('selectedFlight');
                sessionStorage.removeItem('bookingData');

                // 跳转到订单列表页面
                setTimeout(() => {
                  this.$router.push('/user/order');
                }, 1500);
              } else if (res.error) {
                this.$message.error('预订失败: ' + (res.error.message || res.error));
              } else {
                this.$message.error('预订失败，请稍后重试');
              }
            });
          }).catch(() => {
            this.$message.info('已取消预订');
          });
        }
      });
    },

    // 返回
    goBack() {
      this.$router.go(-1);
    },

    // 格式化时间
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
    }
  }
};
</script>

<style scoped>
.seat-selection-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
}

.page-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
}

.flight-info-section {
  padding: 2rem 0;
}

.flight-info-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-item .label {
  color: #999;
  font-size: 0.9rem;
}

.info-item .value {
  color: #333;
  font-weight: 500;
}

.info-item .value.price {
  color: #f56c6c;
  font-size: 1.2rem;
  font-weight: bold;
}

.seat-selection-section {
  padding: 2rem 0;
}

.selection-container {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.legend {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.seat {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e0e0e0;
  background-color: white;
}

.seat.available {
  background-color: #67c23a;
  border-color: #67c23a;
  color: white;
}

.seat.available:hover {
  transform: scale(1.1);
}

.seat.selected {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}

.seat.occupied {
  background-color: #909399;
  border-color: #909399;
  color: white;
  cursor: not-allowed;
}

.plane-header {
  text-align: center;
  margin-bottom: 2rem;
  color: #667eea;
  font-size: 1.2rem;
}

.plane-header i {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.seat-map {
  margin-bottom: 2rem;
}

.cabin {
  margin-bottom: 2rem;
}

.cabin-label {
  text-align: center;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.seats-grid .seat {
  margin: 0 auto;
}

.selected-seats-info {
  border-top: 1px solid #e0e0e0;
  padding-top: 1.5rem;
}

.selected-seats-info h3 {
  margin-bottom: 1rem;
  color: #333;
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.no-selection {
  color: #999;
  text-align: center;
  padding: 1rem;
}

.passenger-section {
  padding: 2rem 0;
}

.passenger-form {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.passenger-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.price-summary {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.price-item.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #667eea;
  font-size: 1.2rem;
  font-weight: bold;
}

.price-item .label {
  color: #666;
}

.price-item .value {
  color: #333;
  font-weight: 500;
}

.price-item.total .value {
  color: #f56c6c;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-buttons .el-button {
  min-width: 150px;
}

@media (max-width: 768px) {
  .info-row {
    flex-direction: column;
    gap: 1rem;
  }

  .seats-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .el-button {
    width: 100%;
  }
}
</style>
