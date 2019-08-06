import React, { Component } from 'react';
import { Table } from 'antd';
import './index.scss';

class RNPluginDetails extends Component<any> {

  // defaultProps = {
  //   data: [{
  //     description: 'description',
  //     name: 'name',
  //     url: 'url',
  //     detail: 'detail',
  //   }]
  // }

  defaultrecord = {
    description: 'description',
    name: 'name',
    url: 'url',
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isShowDetail: false,
      record: this.defaultrecord
    }
  }
  columns = [
    {
      title: '简述',
      dataIndex: 'description',
      key: 'description',
      width: 400,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (text: any, record: any) => {
        const url = record.url ? record.url : `https://www.npmjs.com/package/${record.name}`;
        return(
          <a href={url} target="_blank" rel="noopener noreferrer">GO</a>
        )
      }
    },
  ];

  render() {
    return (
      <div className="RNPluginDetails">
        <Table columns={this.columns} dataSource={this.props.data} rowKey={'name'} />
      </div>
    )
  }
}

export default RNPluginDetails;
