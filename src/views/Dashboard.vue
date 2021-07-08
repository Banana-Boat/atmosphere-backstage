<template>
    <div style="display:flex;justify-content: space-around; margin-top:10px;">
        <div style="display:flex;flex-direction:column;justify-content: space-between;;width: 34%">
            <el-card shadow="hover" style="height: 45%;">
                <div class="user-info">
                    <img src="../assets/img/user.jpg" class="user-avator" alt />
                    <div class="user-info-cont">
                        <div class="user-info-name">{{ name }}</div>
                        <div style="margin-top:10px;">超级管理员</div>
                    </div>
                </div>
                <div class="user-info-list">
                    上次登录时间：
                    <span>2021/7/8</span>
                </div>
                <div class="user-info-list">
                    上次登录地点：
                    <span>杭州市 江干区</span>
                </div>
            </el-card>
            <el-card shadow="hover" style="height: 50%;">
                <template #header>
                    <div style="display:flex;justify-content:space-between;align-items: center;">
                        <el-badge :value="16" class="item" type="danger">
                            <span>新增投诉申请</span>
                        </el-badge>
                        <el-button type="text" @click="handleNev">处理</el-button>
                    </div>
                </template>

                <el-table :show-header="false" :data="todoList" style="width:100%;">
                    <el-table-column width="40">
                        <template #default="scope">
                            <el-checkbox v-model="scope.row.status"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template #default="scope">
                            <div class="todo-item" :class="{
                                    'todo-item-del': scope.row.status,
                                }">{{ scope.row.title }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="60">
                        <template>
                            <i class="el-icon-edit"></i>
                            <i class="el-icon-delete"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div style="width: 62%;">
            <el-card shadow="hover">
                <schart ref="line" style="height:500px;width:100%;" canvasId="line" :options="options"></schart>
            </el-card>
        </div>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
    name: "dashboard",
    components: { Schart },
    setup() {
        const router = useRouter();
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "超级管理员" : "普通用户";

        
        const options = {
            type: "line",
            title: {
                text: "最近6个月各品类投诉统计图",
            },
            labels: ["2月", "3月", "4月", "5月", "6月", "7月"],
            datasets: [
                {
                    label: "工业生产",
                    data: [20, 22, 10, 14, 8, 5],
                },
                {
                    label: "交通运输",
                    data: [23, 14, 9, 10, 29, 11],
                },
                {
                    label: "居民生活",
                    data: [13, 2, 9, 2, 19, 21],
                },
            ],
        };
        const todoList = reactive([
            {
                title: "柴油车乱排放尾气",
                status: false,
            },
            {
                title: "小区饭店随意排放油烟",
                status: false,
            },
            {
                title: "居民违规燃放烟花爆竹",
                status: false,
            }
        ]);
        const handleNev = () => {
            router.push("/table")
        };

        return {
            handleNev,
            name,
            options,
            todoList,
            role,
        };
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

</style>
