<template>
    <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
       <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
    <el-form :inline="true"  :model="formUser" :rules="rules" ref="userForm" :validate-on-rule-change="false">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select  v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, inject, reactive, ref, defineEmits, watch, computed } from 'vue';
import { useOpuserStore } from '../store/useOpuserStore';
import { storeToRefs } from 'pinia';
import { ElMessage} from 'element-plus';

// 从 pinia 拿到数据
const {dialogVisible, action, formUserB} = storeToRefs(useOpuserStore())
const {resetDia} = useOpuserStore()

//拿到当前组件的实例
const { proxy } = getCurrentInstance()

// 拿到 api
const api = inject('api')

// //表单绑定的各种数据
let formUser = ref()

// 监听 pinia 传来的 数据
watch(() => formUserB.value, (data) => {
    formUser.value = {...data}
})

//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项", trigger: "change"}],
  addr:[{ required: true, message: '地址是必填项', trigger: "blur"}]
})

// x 关闭模态框, 并且重置表单数据
const handleClose = () => {
    resetDia()
    // console.log(formUser)
    // 如果 是 编辑用户数据，则 等于 原本pinia 的和数据
    action.value !== 'add' ? formUser.value = {...formUserB.value} : 1

}

//取消关闭模态框，并且重置表单数据
const handleCancel = () => {
    resetDia()
    // 如果 是 编辑用户数据，则 等于 原本pinia 的和数据
    action.value !== 'add' ? formUser.value = {...formUserB.value} : 1
}

//处理用户的事件的 时间数据
const timeFormat = (time) => {
    let timeT = new Date(time)
    let year = timeT.getFullYear()
    let month = timeT.getMonth() +1 
    let day = timeT.getDate()
    // 如果是 10 一下变为 0+月/ 0+日  比如 1 变为 01
    function add(m) {
        return m < 10 ? '0'+m : m
    }
    return year + '-' + add(month) + '-' + add(day)
}

//定义 emits 为 从父组件 拿到的 事件数组
const emits = defineEmits(['event'])

//确定 新增/编辑 用户
const onSubmit = () => {
    proxy.$refs['userForm'].validate(async (vaild) => {
        if(vaild) {        //通过验证
            let res 
            // console.log(formUser.birth)
            formUser.value.birth = timeFormat(formUser.value.birth)
            // console.log(formUser.birth)
            if(action.value === 'add') {
                res = await api.addUser(formUser.value)
            } else {
                res = await api.editUser(formUser.value)
            }
            if(res) {
                // console.log(res)
                resetDia()
                proxy.$refs['userForm'].resetFields()
                // getUserData()
                emits('event')
            }
        } else {
            ElMessage({
                showClose: true,
                message: '太错误了',
                type: 'error'
            })
        }
    })
}
</script>

<style lang="less" scoped>

.select-clearn {
    display: flex;
    // background-color: black;
}
</style>