<template>
  <div>
    <table class="mb-3" style="width: 100%">
      <tr
        class="text-center suite-bold"
        style="
          background-color: #fdf7d6;
          width: 20%;
          border-radius: 0px 0px 0px 0px;
          border: 1px #000 solid;
        "
      >
        <td class="p-2">방문순서</td>
        <td>주소</td>
        <td>삭제</td>
      </tr>
      <tr v-for="(item, idx) in stopoverAddres" :key="{ idx }">
        <td
          class="text-center suite-bold p-2"
          style="background-color: #fdf7d6; width: 20%; border-radius: 0px 0px 0px 0px"
        >
          💠 장소 {{ idx + 1 }}
        </td>
        <td class="p-2">{{ item }}</td>
        <td>
          <button @click="removePlace(idx)" class="btn suite-bold" id="delete-place">삭제</button>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button @click="addPlace" class="btn suite-bold" id="add-place-btn">➕ 장소추가</button>
        </td>
      </tr>
    </table>
    <body onload="initTmap()">
      <!-- 맵 생성 실행 -->
      <div id="map_div"></div>
    </body>
  </div>
</template>

<script>
var map
// 페이지가 로딩이 된 후 호출하는 함수입니다.

import { ref, reactive } from 'vue'
const stopoverAddres = reactive([])
// 경유지 좌표값
var corseY = ref('')
var corseX = ref('')
const addPlace = () => {
  loadGetLonLatFromAddress()
}
const removePlace = (idx) => {
  stopoverAddres.splice(idx, 1)
}

function loadGetLonLatFromAddress() {
  // TData 객체 생성
  var tData = new Tmapv2.extension.TData()

  var optionObj = {
    coordType: 'WGS84GEO', //응답좌표 타입 옵션 설정 입니다.
    addressType: 'A04' //주소타입 옵션 설정 입니다.
  }

  var params = {
    onComplete: onComplete //데이터 로드가 성공적으로 완료 되었을때 실행하는 함수 입니다.
  }

  tData.getAddressFromGeoJson(corseX.value, corseY.value, optionObj, params)
}
//리버스 지오코딩
function onComplete() {
  console.log('여길봐라')
  console.log(this._responseData)
  var result = this._responseData.addressInfo.fullAddress
  stopoverAddres.push(result)
  // console.log(result)
}

export default {
  setup() {
    stopoverAddres.length = 0
  },
  data() {
    return {
      addPlace,
      removePlace,
      corseX,
      corseY,
      stopoverAddres
    }
  },
  mounted() {
    this.initTmap()
  },
  methods: {
    initTmap() {
      // map 생성
      // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
      map = new Tmapv2.Map('map_div', {
        // "map_div" : 지도가 표시될 div의 id
        center: new Tmapv2.LatLng(37.5652045, 126.98702028),
        width: '100%', // 지도의 넓이
        height: '400px', // 지도의 높이
        zoom: 17
      })

      //EPSG:3857 좌표계를 생성합니다.
      var epsg3857 = new Tmapv2.Point(14136131, 4518172)
      // WGS84 좌표계로 변환합니다
      var wgs84 = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(epsg3857)

      // 마커를 생성합니다.
      var marker1 = new Tmapv2.Marker({
        position: wgs84,
        icon: 'https://static-00.iconduck.com/assets.00/location-pin-icon-385x512-fdmj5z3x.png',
        draggable: true,
        map: map
      })

      // 지도를 이동시킵니다.
      map.setCenter(wgs84)

      //Marker draggable: true일때, 마커의 움직임이 끝날때 이벤트 등록
      marker1.addListener('dragend', function (evt) {
        // console.log('dragend=' + marker1.getPosition())
        corseY.value = marker1.getPosition()._lng
        corseX.value = marker1.getPosition()._lat

        console.log(corseY.value + ' ' + corseX.value)

        marker1.getPosition()
      })
    }
  }
}
</script>

<style scoped>
#add-place {
  width: 100%;
  background-color: #eeeeee;
  border: #000000 2px solid;
}
#delete-place {
  width: 100%;
  background-color: #880c0c;
  color: white;
}

table {
  border: 1px solid #000;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
}

#add-place-btn {
  background: linear-gradient(to bottom, #fff679 12%, #ffdd44 100%);
  border-radius: 4px;
  border: 1px solid #ebff34;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-size: 18px;
  width: 100%;
  text-decoration: none;
  text-shadow: 0px 0px 0px #092580;
}
#add-place-btn:hover {
  background: linear-gradient(to bottom, #f7ee72 12%, #f1d13e 100%);
  background-color: #77a809;
}
#add-place-btn:active {
  position: relative;
  top: 1px;
}
</style>
