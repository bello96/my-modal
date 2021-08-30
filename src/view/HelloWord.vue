<template>
  <h2>ant-design-vue</h2>
  <a-table :dataSource="dataSource" :columns="columns" :pagination="false" />
  <br />
  <h2>element-plus</h2>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="220"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="220"> </el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>
<script>
export default {
  setup() {
    return {
      dataSource: [
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          address: "西湖区湖底公园1号",
        },
        {
          key: "2",
          name: "刘德华",
          age: 42,
          address: "台湾省新泰市五原路44号",
        },
        {
          key: "3",
          name: "王俊凯",
          age: 22,
          address: "四川省成都市幸福大街99弄",
        },
        {
          key: "4",
          name: "陈小春",
          age: 32,
          address: "留心路888号新界家园",
        },
      ],
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "住址",
          dataIndex: "address",
          key: "address",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>
