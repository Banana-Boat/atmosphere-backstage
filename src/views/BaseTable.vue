<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.type" placeholder="污染类型" class="handle-select mr10">
                    <el-option key="1" label="工业生产" value="工业生产"></el-option>
                    <el-option key="2" label="交通运输" value="交通运输"></el-option>
                    <el-option key="3" label="农业活动" value="农业活动"></el-option>
                    <el-option key="4" label="居民生活" value="居民生活"></el-option>
                    <el-option key="5" label="其他" value="其他"></el-option>
                    <el-option key="6" label="显示全部" value="显示全部"></el-option>
                </el-select>
                <el-input placeholder="请输入投诉信息关键字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" v-loading="isLoading">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="type" label="投诉类型"></el-table-column>
                <el-table-column label="投诉人">
                    <template #default="scope">{{ scope.row.complainter }}</template>
                </el-table-column>
                <el-table-column prop="address" label="位置"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template #default="scope">
                        <el-tag :type="
                                scope.row.state === '整改完成'
                                    ? 'success'
                                    : scope.row.state === '处理中'
                                    ? 'danger'
                                    : scope.row.state === '已受理'
                                    ? 'warning'
                                    : ''
                            ">{{ scope.row.state }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="投诉时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" class="red" @click="handleEdit(scope.$index, scope.row)">编辑状态
                        </el-button>
                        <el-button type="text" icon="el-icon-delete"
                            @click="handleShowDetail(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :current-page="query.pageIndex"
                    :page-size="10" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="投诉类型">
                    <el-select v-model="query.state" placeholder="请选择投诉状态">
                        <el-option key="1" label="已提交" value="已提交"></el-option>
                        <el-option key="2" label="已受理" value="已受理"></el-option>
                        <el-option key="3" label="处理中" value="处理中"></el-option>
                        <el-option key="4" label="整改完成" value="整改完成"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投诉反馈">
                    <el-input type="textarea" v-model="query.feedback"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 查看详情弹出框 -->
        <el-dialog title="查看详情" v-model="detailVisible" width="50%">
            <div style="padding: 0 50px;"> 
                <el-form label-width="100px">
                <el-form-item label="投诉类型">
                    <el-input v-model="detail.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="detail.address" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="投诉人">
                    <el-input v-model="detail.complainter" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="detail.state" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="投诉时间">
                    <el-input v-model="detail.date" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="detail.des" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反馈意见">
                    <el-input type="textarea" v-model="detail.feedback" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchComplaintData } from "../api/index";

export default {
    name: "basetable",
    setup() {
        const query = reactive({
            address: "",
            type: "",
            state: "",
            pageIndex: 1,
        });
        const detail = reactive({
            address: "",
            type: "",
            state: "",
            complainter: "",
            des: "",
            date: "",
            feedback: ""
        })
        const tableData = ref([]);
        const _tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const isLoading = ref(false)

        const getData = () => {
            isLoading.value = true
            setTimeout(() => {
                fetchComplaintData(query).then((res) => {
                    tableData.value = res.list;
                    _tableData.value = res.list;
                    pageTotal.value = res.pageTotal;
                });
                isLoading.value = false
            }, 800)
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            if (query.type == '显示全部') {
                tableData.value = _tableData.value
            } else {    
                tableData.value = _tableData.value.filter(item => {
                    if (item.type == query.type) 
                        return true
                    else 
                        return false
                })
            }
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        // 查看详情操作
        const detailVisible = ref(false);
        const handleShowDetail = (index) => {
            Object.keys(tableData.value[index]).forEach(item => {
                detail[item] = tableData.value[index][item]
            })
            detailVisible.value = true;
        };
        const close = () => {
            detailVisible.value = false
        }

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            type: "",
            address: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改成功`);
            tableData.value[idx].state = query.state;
        };

        return {
            isLoading,
            query,
            detail,
            tableData,
            pageTotal,
            editVisible,
            detailVisible,
            form,
            handleSearch,
            handlePageChange,
            handleShowDetail,
            handleEdit,
            saveEdit,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
</style>
