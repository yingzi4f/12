<template>
  <div class="page_user_order" id="user_order">
    <div class="warp">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-12 col-md-3">
            <div class="card_menu">
              <!-- 左侧边栏 -->
              <list_menu_user :list_info="list_info"></list_menu_user>
            </div>
          </div>
          <div class="col-12 col-md-9">
            <div class="card_order">
              <div class="warp">
                <div class="container">
                  <h2 class="order_title">我的订单</h2>

                  <!-- 订单列表 -->
                  <div v-if="orderList.length > 0" class="order_list">
                    <div v-for="(order, index) in orderList" :key="index" class="order_item">
                      <div class="order_header">
                        <div class="flight_info">
                          <div class="route">
                            <div class="location">
                              <div class="city">{{ order.place_of_departure }}</div>
                              <div class="time">{{ formatTime(order.departure_time) }}</div>
                            </div>
                            <div class="arrow">
                              <i class="el-icon-d-arrow-right"></i>
                            </div>
                            <div class="location">
                              <div class="city">{{ order.destination }}</div>
                              <div class="time">{{ formatTime(order.arrival_time) }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="order_status" :class="getStatusClass(order.order_status)">
                          {{ order.order_status }}
                        </div>
                      </div>

                      <div class="order_body">
                        <div class="info_grid">
                          <div class="info_item">
                            <span class="label">航班号:</span>
                            <span class="value">{{ order.passenger_plane_number || '-' }}</span>
                          </div>
                          <div class="info_item">
                            <span class="label">机型:</span>
                            <span class="value">{{ order.aircraft_model || '-' }}</span>
                          </div>
                          <div class="info_item">
                            <span class="label">座位类型:</span>
                            <span class="value">{{ order.seat_type || '-' }}</span>
                          </div>
                          <div class="info_item">
                            <span class="label">购买张数:</span>
                            <span class="value">{{ order.number_of_purchased_sheets }} 张</span>
                          </div>
                          <div class="info_item">
                            <span class="label">总金额:</span>
                            <span class="value price">¥{{ order.total_amount }}</span>
                          </div>
                          <div class="info_item">
                            <span class="label">订单时间:</span>
                            <span class="value">{{ formatCreateTime(order.create_time) }}</span>
                          </div>
                          <div class="info_item" v-if="order.seat">
                            <span class="label">已选座位:</span>
                            <span class="value seat">{{ formatSeatDisplay(order.seat) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 空状态 -->
                  <div v-else class="empty_state">
                    <el-empty description="暂无订单，快去预订吧"></el-empty>
                    <el-button type="primary" @click="$router.push('/flight/booking')" style="margin-top: 1rem;">
                      去预订航班
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
import list_menu_user from "@/components/diy/list_menu_user.vue";

export default {
  mixins: [mixin],
  components: {
    list_menu_user,
  },
  data() {
    return {
      list_info: [
        {
          title: "个人资料",
          url: "/user/info",
          icon: "house-fill",
          selected: false,
        },
        {
          title: "我的订单",
          url: "/user/order",
          icon: "cart-fill",
          selected: true,
        },
        {
          title: "密码修改",
          url: "/user/password",
          icon: "person-fill",
          selected: false,
        },
      ],
      orderList: [],
      loading: false
    };
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    // 加载订单列表
    loadOrders() {
      this.loading = true;

      // 获取当前用户ID
      const userId = this.$store.state.user.user_id;

      if (!userId) {
        this.$message.error('请先登录');
        this.$router.push('/account/login');
        return;
      }

      // 获取用户订单
      this.$get('~/api/order_center/get_list?', {
        page: 1,
        size: 100,
        user_account: userId
      }, (res) => {
        this.loading = false;

        if (res && res.result) {
          if (Array.isArray(res.result.list)) {
            this.orderList = res.result.list;
          } else if (Array.isArray(res.result)) {
            this.orderList = res.result;
          }
        }
      });
    },

    // 格式化时间
    formatTime(timeValue) {
      if (!timeValue) return '--:--';

      // 如果是数字（Unix时间戳）
      if (typeof timeValue === 'number') {
        const date = new Date(timeValue);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      }

      // 如果是字符串
      if (typeof timeValue === 'string') {
        if (timeValue.includes('T')) {
          const date = new Date(timeValue);
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${hours}:${minutes}`;
        }
        if (timeValue.includes(':')) {
          const parts = timeValue.split(':');
          if (parts.length >= 2) {
            return `${parts[0]}:${parts[1]}`;
          }
        }
      }

      return '--:--';
    },

    // 格式化创建时间
    formatCreateTime(timeValue) {
      if (!timeValue) return '-';

      if (typeof timeValue === 'number') {
        const date = new Date(timeValue);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }

      if (typeof timeValue === 'string') {
        return timeValue.substring(0, 16).replace('T', ' ');
      }

      return timeValue;
    },

    // 获取订单状态样式
    getStatusClass(status) {
      if (status === '未出行') return 'status_pending';
      if (status === '已结束') return 'status_completed';
      return 'status_default';
    },

    // 格式化座位显示
    formatSeatDisplay(seatStr) {
      if (!seatStr) return '-';

      try {
        const seatIndices = seatStr.split(',');
        const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
        const seatNames = [];

        seatIndices.forEach(index => {
          const num = parseInt(index.trim());
          if (!isNaN(num)) {
            const row = Math.floor(num / 6) + 1;
            const col = num % 6;
            const seatName = `${row}${columns[col]}`;
            seatNames.push(seatName);
          }
        });

        return seatNames.length > 0 ? seatNames.join(', ') : seatStr;
      } catch (e) {
        console.error('座位格式化错误:', e);
        return seatStr;
      }
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 800px;
}

.order_title {
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.8rem;
}

.order_list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order_item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.order_item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.order_header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.route {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.location {
  text-align: center;
}

.city {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.time {
  font-size: 1rem;
  opacity: 0.9;
}

.arrow {
  font-size: 1.5rem;
}

.order_status {
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
}

.status_pending {
  background: #67c23a;
}

.status_completed {
  background: #909399;
}

.order_body {
  padding: 1.5rem;
}

.info_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info_item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info_item .label {
  color: #999;
  font-size: 0.9rem;
}

.info_item .value {
  color: #333;
  font-weight: 500;
}

.info_item .value.price {
  color: #f56c6c;
  font-size: 1.1rem;
  font-weight: bold;
}

.info_item .value.seat {
  color: #409eff;
  font-weight: 500;
}

.empty_state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .route {
    flex-direction: column;
    gap: 0.5rem;
  }

  .arrow {
    transform: rotate(90deg);
  }

  .info_grid {
    grid-template-columns: 1fr;
  }
}
</style>
