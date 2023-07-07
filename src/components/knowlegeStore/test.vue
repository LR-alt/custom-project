<template>
    <div class="browse-home">
        <div class="browse-home__head">
            头部搜素栏
        </div>
        <div class="browse-home__main">
            <el-row class="top" :gutter="12">
                <el-col :span="12">
                    上左
                </el-col>
                <el-col :span="12">
                    上右
                </el-col>
            </el-row>
             <el-row class="bottom" :gutter="12">
                <el-col :span="12">
                    下左
                </el-col>
                <el-col :span="12">
                    下右
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

export default {
    name: 'browse-home',
    components: {
        
    },
    data() {
      return {
        
      }  
    },
    created() {},
    methods: {

    }
};
</script>
<style lang="less" scoped>
.browse-home {
    display: flex;
    padding: 10px;
    height: 100%;
    flex-direction: column;

    &__head {
        display: flex;
        height: 80px;
        align-items: center;
        justify-content: center;
    }
    &__main {
        flex: 1;
        .el-row {
            height: 48%;
            .el-col {
                height: 100%;
            }
        }
    }
}
</style>