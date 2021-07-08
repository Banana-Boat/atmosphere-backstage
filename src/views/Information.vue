<template>
    <div>
        <div style="margin:0 10px;">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-card shadow="hover">
                        <template #header>
                            <div class="clearfix">
                                <span>已发布资讯</span>
                            </div>
                        </template>
                        <el-collapse v-model="activeName" accordion>
                                <el-collapse-item v-for="(news, index) in newsList" v-bind:key="news.title"  :title="news.title" :name="index">
                                    <div>{{news.content}}</div>
                                    <el-button @click="handleDelete(index)" type="danger" icon="el-icon-delete" circle size="mini" style="float:right;margin-right:10px;margin-bottom:10px;"></el-button>
                                </el-collapse-item>
                        </el-collapse>
                    </el-card>
                </el-col>
                <el-col :span="14">
                    <el-card shadow="hover">
                        <template #header>
                            <div class="clearfix">
                                <span>新增资讯</span>
                            </div>
                        </template>
                            <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                                <el-form-item label="标题" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入资讯标题"></el-input>
                                </el-form-item>
                                <el-form-item label="内容">
                                    <div ref='editor'></div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">发布</el-button>
                                </el-form-item>
                            </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </div>            
    </div>
</template>

<script>
import WangEditor from "wangEditor";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
    name: "information",
    setup() {
        /* 富文本 */
        const editor = ref(null);
        const content = reactive({
            html: "",
            text: "",
        });
        let instance;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            instance.config.zIndex = 1;
            instance.create();
        });
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });
        const syncHTML = () => {
            content.html = instance.txt.html();
            console.log(content.html);
        };


        
        
        const activeName = ref(0)
        const newsList = ref([
            {
                title: '9日至10日强降雨来袭',
                content: '7月4日以来，我国主雨带位于四川盆地至沿淮地区，四川、重庆、湖北、河南、江苏、安徽等地持续出现较强降雨，目前淮河流域降雨已减弱。预计9日至10日，将有新一轮降雨过程开始发展，四川、甘肃、陕西、青海等地将有强降雨，这次的降雨具有一定极端性，部分地区发生山洪、地质灾害的气象风险高，需加强灾害防御工作。11日至12日，强降雨区会东移北抬。'
            },
            {
                title: '二十四节气之小暑：伏日来临 暑热袭人',
                content: '小暑，二十四节气的第十一个节气，太阳到达黄经105°时为小暑。《月令七十二候集解》中记载：“六月节……暑，热也，就热之中分为大小，月初为小，月中为大，今则热气犹小也。”暑，是炎热的意思，小暑为小热，此时天气开始炎热，却没有达到极致。小暑的标志是出梅，入伏，到7月22日或23日结束。此时正值初伏前后。小暑期间，全国大部分地区进入盛夏。'
            },
            {
                title: '中国气象局部署盛夏期间气象防灾减灾工作',
                content: '7月8日，在全国天气会商后，中国气象局召开视频会议，结合当前汛期形势和盛夏气候预测情况，对气象服务工作进行再部署、再强化、再落实。今年以来，天气气候特征异常，预测显示盛夏期间旱涝灾害较重，防灾减灾形势日趋严峻。会前，中国气象局党组书记、局长庄国泰，党组成员、副局长余勇对盛夏期间气象服务工作进行了部署、提出明确要求，总工程师黎健在会上作工作安排。'            }
        ])

        const rules = {
            name: [
                { required: true, message: "请输入表单名称", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: ""
        });
        // 删除
        const handleDelete = (index) => {
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    newsList.value.splice(index, 1)
                })
        }
        // 提交
        const onSubmit = () => {
            // 表单校验
            content.text = instance.txt.text();

            formRef.value.validate((valid) => {
                if (valid) {
                    newsList.value.push({
                        title: form.name,
                        content: content.text
                    })
                    form.name = ''
                    instance.txt.clear()
                    ElMessage.success("发布成功！");
                } else {
                    return false;
                }
            });
        };
        return {
            handleDelete,
            newsList,
            activeName,
            syncHTML,
            editor,
            content,
            rules,
            formRef,
            form,
            onSubmit
        };
    },
};
</script>

<style scope>
.el-collapse-item__header{
    font-weight: bold;
    font-size: 14px;
}
</style>