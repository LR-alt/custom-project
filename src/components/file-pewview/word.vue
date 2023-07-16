<template>
    <div class="custom-vue">
        <el-button @click="goPreview">点击预览word文件</el-button>
        <div class="docWrap">
            <!-- 预览文件的地方（用于渲染） -->
            <div ref="file"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
let docx = require('docx-preview');
export default {
    name: 'custom-vue',
    data() {
        return {
            fileLink: '/api/getDoc',
        };
    },
    created() {},
    methods: {
        // 预览
        goPreview() {
            axios({
                method: 'get',
                responseType: 'blob', // 因为是流文件，所以要指定blob类型
                url: this.fileLink, // 一个word下载文件的接口
            }).then(({ data }) => {
                console.log(data); // 后端返回的是流文件
                /**
                 * 第一个参数： data为文件流，Blob | ArrayBuffer | Uint8Array 格式
                 * 第二个参数： 渲染到页面的dom元素
                 * 第三个参数： 渲染word文档的样式的元素，如果为null，则设置到第二个参数的DOM上
                 * 第四个参数： 配置对象
                 */
                docx.renderAsync(data, this.$refs.file, null, {
                    className: 'text-docx', //class name/prefix for default and document style classes
                    inWrapper: true, //enables rendering of wrapper around document content
                    ignoreWidth: false, //disables rendering width of page
                    ignoreHeight: false, //disables rendering height of page
                    ignoreFonts: false, //disables fonts rendering
                    breakPages: true, //enables page breaking on page breaks
                    ignoreLastRenderedPageBreak: true, //disables page breaking on lastRenderedPageBreak elements
                    experimental: true, //enables experimental features (tab stops calculation)
                    trimXmlDeclaration: true, //if true, xml declaration will be removed from xml documents before parsing
                    useBase64URL: false, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
                    useMathMLPolyfill: true, //includes MathML polyfills for chrome, edge, etc.
                    debug: false, //enables additional logging
                }); // 渲染到页面
            });
        },
    },
};
</script>
<style lang="less" scoped>
.custom-vue {
    height: 100%;
    overflow: auto;
    .docWrap {
        // 指定样式宽度
        width: 900px;
        overflow: auto;
    }
}
</style>
