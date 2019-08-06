import React from 'react';
import { PickerView, Modal, } from 'antd-mobile';
import './index.scss';
// import { ProvinceData, CityData, RegionData } from '../../utils/index';
/**
 * antd-mobile
 * 省市区选择 antd-mobile
 * isShowCityPicker：是否显示Modal
 * ProvinceCityData：省市区数据 必须是value label children格式
 *  [
      {
        "value": "330000",
        "label": "浙江省",
        "children": [
          {
            "value": "330100",
            "label": "杭州市",
            "children": [
              {
                "value": "330102",
                "label": "上城区"
              },
              ...
            ]
          },
          {
            "value": "330200",
            "label": "宁波市",
            "children": [
              {
                "value": "330203",
                "label": "海曙区"
              },
              ...
            ]
          },
          ...
        ]
      },
      ...
    ]
 * onCloseCityPicker：关闭Modal
 * onConfirmCityPicker：已选择并确认省市区
 */
class CityPicker extends React.Component {

  state = {
    ProvinceCityData: ''
  }

  componentDidMount() {
    // this.getRegins();
  }

  onCloseModal() {
    this.props.onCloseCityPicker(!this.props.isShowCityPicker);
  }

  onConfirmCityPicker() {
    const { isShowCityPicker } = this.props;
    const { ProvinceCityData } = this.state;
    const nums = this.districtNumber;
    const citysArr = [];
    const prov = ProvinceCityData.find(item => item.value === nums[0]);
    citysArr.push(prov);
    const city = prov.children.find(item => item.value === nums[1]);
    citysArr.push(city);
    const area = city.children.find(item => item.value === nums[2]);
    citysArr.push(area);
    this.props.onConfirmCityPicker(citysArr, !isShowCityPicker);
    const con = document.getElementsByClassName('am-list-content');
    con[1].style.color = '#262A33';
    this.districtNumber = ['110000000000', '110000000000', '110101000000'];
  }

  onChangePickerView(e) {
    this.districtNumber = e;
  }

  getRegins() {
    const Regins = [];
    ProvinceData((prov) => {
      prov.forEach((provItem) => {
        const provinceId = provItem.provinceId;
        const provinceName = provItem.name;
        const provinceDemo = {
          value: provinceId,
          label: provinceName,
          children: []
        };
        Regins.push(provinceDemo);
        CityData(provinceId, (city) => {
          city.forEach((cityItem) => {
            const cityId = cityItem.cityId;
            const cityName = cityItem.name;
            const cityDemo = {
              value: cityId,
              label: cityName,
              children: []
            };
            provinceDemo.children.push(cityDemo);
            RegionData(cityId, (regin) => {
              regin.forEach((reginItem) => {
                const regionId = reginItem.regionId;
                const regionName = reginItem.name;
                const ReginsDemo = {
                  value: regionId,
                  label: regionName,
                  children: []
                };
                cityDemo.children.push(ReginsDemo);
              });
            });
          });
        });
      });
    });
    this.setState({ ProvinceCityData: Regins });
  }

  districtNumber = ['110000000000', '110000000000', '110101000000'];

  render() {
    const { isShowCityPicker } = this.props;
    const { ProvinceCityData } = this.state;
    return (
      <Modal
        popup
        animationType="slide-up"
        visible={isShowCityPicker}
        className="pickerModal"
        onClose={() => { this.onCloseModal(); }}
      >
        <div className="btn">
          <p onClick={() => { this.onCloseModal(); }}>取消</p>
          <p onClick={() => { this.onConfirmCityPicker(); }}>确认</p>
        </div>
        <div className="province-city">
          <p>省</p>
          <p>市</p>
          <p>区</p>
        </div>
        <PickerView
          data={ProvinceCityData}
          cols={'3'}
          value={['110000', '110000', '110101']}
          onChange={(e) => { this.onChangePickerView(e); }}
          className="pickerView"
        />
      </Modal>
    );
  }
}

export default CityPicker;
