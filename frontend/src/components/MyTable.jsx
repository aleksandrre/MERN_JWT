import React from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const MyTable = ({ data }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            className="w-20 h-10 bg-blue-500 hover:bg-blue-600"
            onClick={() => navigate(`/getOne/${record._id}`)}
          >
            Show
          </Button>
          <Button
            type="primary"
            className="w-20 h-10 bg-green-500 hover:bg-green-600"
            onClick={() => navigate("/create")}
          >
            Create
          </Button>
          <Button
            type="primary"
            className="w-20 h-10 bg-red-500 hover:bg-red-600"
            onClick={() => navigate(`/delete/${record._id}`)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="w-20 h-10 bg-yellow-500 hover:bg-yellow-600"
            onClick={() => navigate(`/update/${record._id}`)}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  const dataWithIndex = data?.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  return (
    <div className="flex justify-center  h-screen">
      <Table dataSource={dataWithIndex} columns={columns} />
    </div>
  );
};

export default MyTable;
