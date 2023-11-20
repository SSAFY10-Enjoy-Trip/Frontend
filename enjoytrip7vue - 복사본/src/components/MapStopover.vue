<template>
  <div class="row suite-regular map-result m-1">
    <table>
      <tr>
        <td
          class="text-center suite-bold p-2"
          style="background-color: #e9fdd6; width: 20%; border-radius: 8px 0px 0px 0px"
        >
          🚩 출발
        </td>
        <td class="p-2">여기는 출발 주소가 나와야해요 {{ startAddres }}</td>
      </tr>
      <tr v-for="(item, idx) in stopoverAddres" :key="idx">
        <td
          class="text-center suite-bold p-2"
          style="background-color: #e9fdd6; width: 20%; border-radius: 0px 0px 0px 0px"
        >
          💠 경유 {{ idx + 1 }}
        </td>
        <td class="p-2">{{ item }}</td>
      </tr>
      <tr>
        <td
          class="text-center suite-bold p-2"
          style="background-color: #e9fdd6; width: 20%; border-radius: 0px 0px 0px 8px"
        >
          🏁 도착
        </td>
        <td class="p-2">여기는 도착 주소가 나와야해요 {{ endAddres }}</td>
      </tr>
    </table>
  </div>
  <span class="suite-regular">🌏 총 거리 : </span>
  <span class="suite-bold">{{ distance }}</span>
  <span class="suite-regular left-space-6">🚘 총 시간 : </span>
  <span class="suite-bold">{{ spandtime }}</span>
  <span class="suite-regular left-space-6">💰 총 요금 : </span>
  <span class="suite-bold">{{ pay }}</span>
  <p>{{ resultText }}</p>
  <!-- <p id="result"></p> -->

  <div class="row mb-3">
    <div class="col-12 col-sm-12 col-md-9 col-lg-10 mb-2">
      <select class="form-select" id="selectLevel">
        <option value="0" selected="selected">교통최적+추천</option>
        <option value="1">교통최적+무료우선</option>
        <option value="2">교통최적+최소시간</option>
        <option value="3">교통최적+초보</option>
      </select>
    </div>
    <div class="col-12 col-sm-12 col-md-3 col-lg-2 pb-2">
      <button id="btn_select" class="search-road-btn">적용하기</button>
    </div>
  </div>

  <div id="map_wrap" class="map_wrap">
    <div ref="mapDiv" id="map_div"></div>
  </div>
</template>

<script>
const mapDiv = ref(null)
var map = ref('')

var marker_s, marker_e, waypoint
var resultMarkerArr = []
//경로그림정보
var drawInfoArr = reactive([])
var resultInfoArr = reactive([])

import { ref, reactive } from 'vue'
const distance = ref('')
const spandtime = ref('')
const pay = ref('')

// 각 도로주소 이름
const startAddres = ref('')
const stopoverAddres = reactive([])
const endAddres = ref('')
let resultAddress = ref('')

function resettingMap() {
  //기존마커는 삭제
  marker_s.setMap(null)
  marker_e.setMap(null)

  if (resultMarkerArr.length > 0) {
    for (var i = 0; i < resultMarkerArr.length; i++) {
      resultMarkerArr[i].setMap(null)
    }
  }

  drawInfoArr = []
  resultMarkerArr = []
  marker_s.setMap(null)
  marker_e.setMap(null)

  drawInfoArr = []
  resultMarkerArr = []
}

let selectNum = -1
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
  // 경유지 임시 값
  let tmepAddY = [
    37.402688, 37.399569, 37.402748, 37.397153, 37.410135, 37.3994, 37.406327, 37.413227, 37.414382
  ]
  tmepAddY = location.rowPositionXValue[1]
  let tmepAddX = [
    127.103259, 127.10379, 127.108913, 127.113403, 127.12121, 127.123296, 127.130933, 127.127337,
    127.142571
  ]
  tmepAddX = location.rowPositionYValue[1]

  var step
  for (step = 0; step < tmepAddY.length; step++) {
    selectNum = step
    // TData 객체의 리버스지오코딩 함수
    tData.getAddressFromGeoJson(tmepAddY[step], tmepAddX[step], optionObj, params)
  }
}
//리버스 지오코딩
function onComplete() {
  resultAddress.value = this._responseData.addressInfo.fullAddress //출력될 결과 주소 정보 입니다.
  var result = '현재 지도의 중심 좌표주소 : ' + resultAddress.value + ' : ' + selectNum
  stopoverAddres.push(resultAddress.value)
  // console.log(stopoverAddres)
}

// 앱키
import { useKeyStore } from '@/store/appkey.js'

// 서버에서 지도 좌표값 가져와버리기
let boardNum = ref(0)
let addrX = reactive([[]]) // 특정일의 좌표값X
let addrY = reactive([[]]) // 특정일의 좌표값Y
let daySelect = ref(1) // 일자 지정
import http from '@/common/axios.js'
let location = reactive([])
const insertTripBoard = async () => {
  try {
    let { data } = await http.get('/tripBoard/' + boardNum.value)
    location = JSON.parse(data.location)
    for (let i = 1; i <= location.rowCount; i++) {
      addrX.push(location.rowPositionXValue[i])
      addrY.push(location.rowPositionYValue[i])
    }

    console.log(location)
    console.log(addrY)
  } catch (error) {
    console.log(error)
  }
}

export default {
  setup() {
    stopoverAddres.length = 0
    map.value = null
  },
  created() {},
  data() {
    return {
      selectedOption: '0',
      mapDiv,
      resultText: '',
      distance,
      spandtime,
      pay,
      startAddres,
      stopoverAddres,
      endAddres,

      map: ref(''),
      resultMarkerArr: [],
      resultInfoArr: [],
      drawInfoArr: [],

      location,
      insertTripBoard,
      addrX,
      addrY,
      daySelect
    }
  },
  mounted() {
    boardNum.value = this.$route.params.boardNum
    console.log('게시글 ID:', boardNum.value)
    insertTripBoard().then(() => {
      // insertTripBoard가 완료되면 initTmap 호출
      this.initTmap()
    })
    // this.initTmap()
  },
  methods: {
    initTmap() {
      if (mapDiv.value) {
        mapDiv.value.innerHTML = '' // Clearing the content
      }

      loadGetLonLatFromAddress()
      resultMarkerArr = []

      // 1. 지도 띄우기
      map.value = new Tmapv2.Map('map_div', {
        center: new Tmapv2.LatLng(37.405278291509404, 127.12074279785197),
        width: '100%',
        height: '400px',
        zoom: 14,
        zoomControl: true,
        scrollwheel: true
      })

      // 경유지 정보를 담을 배열
      let viaPoints = []
      // 2. 시작, 도착 심볼찍기
      // 시작
      marker_s = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(addrX[daySelect.value][0], addrY[daySelect.value][0]),
        icon: 'https://static-00.iconduck.com/assets.00/location-pin-icon-385x512-fdmj5z3x.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map.value
      })
      resultMarkerArr.push(marker_s)

      console.log('경유지 개수', addrX[daySelect.value].length - 1)
      for (let i = 1; i < addrX[daySelect.value].length - 1; i++) {
        // 3. 경유지 심볼 찍기
        let marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(addrX[daySelect.value][i], addrY[daySelect.value][i]),
          icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png',
          iconSize: new Tmapv2.Size(24, 38),
          map: map.value
        })
        resultMarkerArr.push(marker)

        let viaPoint = {
          viaPointId: `test${i}`,
          viaPointName: `name${i}`,
          viaX: addrY[daySelect.value][i].toString(), // X 좌표를 문자열로 변환
          viaY: addrX[daySelect.value][i].toString() // Y 좌표를 문자열로 변환
        }

        // 경유지 정보를 배열에 추가
        viaPoints.push(viaPoint)
      }
      console.log('삐약포인트')
      console.log(viaPoints)

      // 도착
      marker_e = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(
          addrX[daySelect.value][addrX.length - 1],
          addrY[daySelect.value][addrY.length - 1]
        ),
        icon: 'https://cdn-icons-png.flaticon.com/512/7310/7310018.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map.value
      })
      resultMarkerArr.push(marker_e)

      console.log(resultMarkerArr)

      // 4. 경로탐색 API 사용요청
      var routeLayer
      $('#btn_select').click(function () {
        resettingMap()
        var searchOption = $('#selectLevel').val()

        var headers = {}
        const { appkey } = useKeyStore()
        headers['appKey'] = appkey
        headers['Content-Type'] = 'application/json'

        var param = JSON.stringify({
          startName: '출발지',
          startX: addrY[daySelect.value][0].toString(),
          startY: addrX[daySelect.value][0].toString(),
          startTime: '201708081103',
          endName: '도착지',
          endX: addrY[daySelect.value][addrY.length - 1].toString(),
          endY: addrX[daySelect.value][addrX.length - 1].toString(),
          viaPoints: viaPoints,
          reqCoordType: 'WGS84GEO',
          resCoordType: 'EPSG3857',
          searchOption: searchOption
        })

        $.ajax({
          method: 'POST',
          url: 'https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json', //
          headers: headers,
          async: false,
          data: param,
          success: function (response) {
            var resultData = response.properties
            var resultFeatures = response.features
            // console.log(resultFeatures)

            // 결과 출력
            var tDistance = '총 거리 : ' + (resultData.totalDistance / 1000).toFixed(1) + 'km,  '
            distance.value = (resultData.totalDistance / 1000).toFixed(1) + 'km'
            var tTime = '총 시간 : ' + (resultData.totalTime / 60).toFixed(0) + '분,  '
            spandtime.value = (resultData.totalTime / 60).toFixed(0) + '분'
            var tFare = '총 요금 : ' + resultData.totalFare + '원'
            pay.value = resultData.totalFare + '원'

            $('#result').text(tDistance + tTime + tFare)

            //기존  라인 초기화

            if (resultInfoArr.length > 0) {
              for (var i in resultInfoArr) {
                resultInfoArr[i].setMap(null)
              }
              resultInfoArr.length = 0
            }

            for (var i in resultFeatures) {
              var geometry = resultFeatures[i].geometry
              var properties = resultFeatures[i].properties
              var polyline_

              drawInfoArr.length = 0

              if (geometry.type == 'LineString') {
                for (var j in geometry.coordinates) {
                  // 경로들의 결과값(구간)들을 포인트 객체로 변환
                  var latlng = new Tmapv2.Point(
                    geometry.coordinates[j][0],
                    geometry.coordinates[j][1]
                  )
                  // 포인트 객체를 받아 좌표값으로 변환
                  var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng)
                  // 포인트객체의 정보로 좌표값 변환 객체로 저장
                  var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng)

                  drawInfoArr.push(convertChange)
                }

                polyline_ = new Tmapv2.Polyline({
                  path: drawInfoArr,
                  strokeColor: '#FF0000',
                  strokeWeight: 6,
                  map: map.value
                })
                resultInfoArr.push(polyline_)
              } else {
                var markerImg = ''
                var size = '' //아이콘 크기 설정합니다.

                if (properties.pointType == 'S') {
                  //출발지 마커
                  markerImg = 'https://cdn-icons-png.flaticon.com/512/1409/1409083.png'
                  size = new Tmapv2.Size(24, 38)
                } else if (properties.pointType == 'E') {
                  //도착지 마커
                  markerImg = 'https://cdn-icons-png.flaticon.com/512/1247/1247940.png'
                  size = new Tmapv2.Size(24, 38)
                } else {
                  //각 포인트 마커
                  markerImg = 'http://topopen.tmap.co.kr/imgs/point.png'
                  size = new Tmapv2.Size(8, 8)
                }

                // 경로들의 결과값들을 포인트 객체로 변환
                var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1])
                // 포인트 객체를 받아 좌표값으로 다시 변환
                var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon)

                let marker_p = new Tmapv2.Marker({
                  position: new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng),
                  icon: markerImg,
                  iconSize: size,
                  map: map.value
                })

                resultMarkerArr.push(marker_p)
              }
            }
          },
          error: function (request, status, error) {
            console.log(
              'code:' +
                request.status +
                '\n' +
                'message:' +
                request.responseText +
                '\n' +
                'error:' +
                error
            )
          }
        })
      })
    },
    addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g
      return num.toString().replace(regexp, ',')
    }
  }
}
</script>

<style scoped>
.map-result {
  border-radius: 8px;
  border: 1px solid #888;
}
.search-road-btn {
  border: 0px;
  width: 100%;
  color: #fff;
  border-radius: 8px;
  height: 100%;
  background-color: #198754;
}
</style>
