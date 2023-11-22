<template>
  <h2>받아온 값</h2>
  <div>{{ locationX }}</div>

  <h2>실제 출력값</h2>
  <div>{{ addrName }}</div>
  <div>{{ locationX.rowNameValue }}</div>
  <br />
  <!-- <div>{{ addrName[daySelect] }}</div>
  <br />
  <div>{{ daySelect }}</div> -->
  <br />

  <div class="left-space-10">
    <button
      v-for="(item, index) in rowCount"
      :key="index"
      @click="selectDay(index)"
      class="day-btn suite-bold"
      :id="'day-btn-' + index"
    >
      {{ index + 1 }}일차
    </button>
  </div>

  <div class="row suite-regular map-result m-1">
    <table>
      <tr v-for="(item, idx) in addrName[daySelect]" :key="idx">
        <td
          class="text-center suite-bold p-2"
          style="background-color: #e9fdd6; width: 20%; border-radius: 8px"
        >
          💠 장소 {{ idx + 1 }}
        </td>
        <td class="p-2">{{ item }}</td>
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

import { ref, reactive, watch } from 'vue'
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

// 앱키
import { useKeyStore } from '@/store/appkey.js'

// 서버에서 지도 좌표값 가져와버리기
let boardNum = ref(0)
// let addrX = reactive([[1], [1], [1], [1]]) // 특정일의 좌표값X
// let addrY = reactive([[1], [1], [1], [1]]) // 특정일의 좌표값Y
// let addrName = reactive([[1], [1], [1], [1]]) // 특정일의 장소 이름값
// let daySelect = ref(0) // 일자 지정
// let location = reactive([1])
let rowCount = ref(1)

export default {
  props: {
    locationX: Object,
    locationY: Object
  },
  computed: {
    // props로 받은 배열을 computed 속성을 이용하여 사용
    getLocationX() {
      return this.locationX
    },
    getLocationY() {
      return this.locationY
    }
  },
  setup() {
    stopoverAddres.length = 0
  },
  // updated() {
  //   console.log('나는 받아온 데이터')
  //   console.log(this.locationX)
  //   this.daySelect = 0
  //   // location.length = 0
  //   // addrX.length = 0
  //   // addrY.length = 0
  //   // addrName.length = 0

  //   this.location = this.locationX
  //   this.addrX = this.locationX.rowPositionXValue
  //   this.addrY = this.locationX.rowPositionYValue
  //   this.addrName = this.locationX.rowNameValue

  //   this.addrX.splice(0, 1)
  //   this.addrY.splice(0, 1)
  //   this.addrName.splice(0, 1)
  //   this.rowCount = this.addrName.length

  //   console.log('여기가 그 억까의 현장입니다!')
  //   console.log(this.addrName)
  // },

  created() {
    console.log('나는 받아온 데이터')
    console.log(this.locationX)
    this.daySelect = 0
    // location.length = 0
    // addrX.length = 0
    // addrY.length = 0
    // addrName.length = 0

    this.location = this.locationX
    this.addrX = this.locationX.rowPositionXValue
    this.addrY = this.locationX.rowPositionYValue
    this.addrName = this.locationX.rowNameValue

    this.addrX.splice(0, 1)
    this.addrY.splice(0, 1)
    this.addrName.splice(0, 1)
    this.rowCount = this.addrName.length

    console.log('여기가 그 억까의 현장입니다!')
    console.log(this.addrName)
  },
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

      map,
      resultMarkerArr: [],
      resultInfoArr: [],
      drawInfoArr: [],

      location: {},
      addrX: {},
      addrY: {},
      addrName: {},
      daySelect: 0,
      rowCount: 0
    }
  },
  mounted() {
    boardNum.value = this.$route.params.boardNum
    // console.log('게시글 ID:', boardNum.value)

    setTimeout(this.initTmap, 0)
  },
  methods: {
    initTmap() {
      var mapDiv = document.getElementById('map_div')
      // div의 내용을 모두 지우기
      mapDiv.innerHTML = ''
      map.value = null

      resultMarkerArr = []

      // console.log(location)
      // 1. 지도 띄우기
      map.value = new Tmapv2.Map('map_div', {
        center: new Tmapv2.LatLng(this.addrX[this.daySelect][0], this.addrY[this.daySelect][0]),
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
        position: new Tmapv2.LatLng(this.addrX[this.daySelect][0], this.addrY[this.daySelect][0]),
        icon: 'https://static-00.iconduck.com/assets.00/location-pin-icon-385x512-fdmj5z3x.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map.value
      })
      resultMarkerArr.push(marker_s)

      // console.log('경유지 개수', addrX[daySelect].length - 1)
      for (let i = 1; i < this.addrX[this.daySelect].length - 1; i++) {
        // 3. 경유지 심볼 찍기
        let marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(this.addrX[this.daySelect][i], this.addrY[this.daySelect][i]),
          icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png',
          iconSize: new Tmapv2.Size(24, 38),
          map: map.value
        })
        resultMarkerArr.push(marker)

        let viaPoint = {
          viaPointId: `test${i}`,
          viaPointName: `name${i}`,
          viaX: this.addrY[this.daySelect][i].toString(), // X 좌표를 문자열로 변환
          viaY: this.addrX[this.daySelect][i].toString() // Y 좌표를 문자열로 변환
        }

        // 경유지 정보를 배열에 추가
        viaPoints.push(viaPoint)
      }
      // console.log('삐약포인트')
      // console.log(viaPoints)

      // 도착
      marker_e = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(
          this.addrX[this.daySelect][this.addrX[this.daySelect].length - 1],
          this.addrY[this.daySelect][this.addrY[this.daySelect].length - 1]
        ),
        icon: 'https://cdn-icons-png.flaticon.com/512/7310/7310018.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map.value
      })
      resultMarkerArr.push(marker_e)

      // console.log(resultMarkerArr)

      // 4. 경로탐색 API 사용요청
      var routeLayer
      $('#btn_select').click(function () {
        resettingMap()
        var searchOption = $('#selectLevel').val()

        var headers = {}
        const { appkey } = useKeyStore()
        headers['appKey'] = appkey
        headers['Content-Type'] = 'application/json'

        var param
        if (viaPoints.length != 0) {
          param = JSON.stringify({
            startName: '출발지',
            startX: this.addrY[this.daySelect][0].toString(),
            startY: this.addrX[this.daySelect][0].toString(),
            startTime: '201708081103',
            endName: '도착지',
            endX: this.addrY[this.daySelect][this.addrY[this.daySelect].length - 1].toString(),
            endY: this.addrX[this.daySelect][this.addrX[this.daySelect].length - 1].toString(),
            viaPoints: viaPoints,
            reqCoordType: 'WGS84GEO',
            resCoordType: 'EPSG3857',
            searchOption: searchOption
          })
        } else {
          param = JSON.stringify({
            startName: '출발지',
            startX: this.addrY[this.daySelect][0].toString(),
            startY: this.addrX[this.daySelect][0].toString(),
            startTime: '201708081103',
            endName: '도착지',
            endX: this.addrY[this.daySelect][this.addrY[this.daySelect].length - 1].toString(),
            endY: this.addrX[this.daySelect][this.addrX[this.daySelect].length - 1].toString(),
            viaPoints: [
              {
                viaPointId: `test0`,
                viaPointName: `name0`,
                viaX: this.addrY[this.daySelect][0].toString(), // X 좌표를 문자열로 변환
                viaY: this.addrX[this.daySelect][0].toString() // Y 좌표를 문자열로 변환
              }
            ],
            reqCoordType: 'WGS84GEO',
            resCoordType: 'EPSG3857',
            searchOption: searchOption
          })
        }

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
            // console.log(
            //   'code:' +
            //     request.status +
            //     '\n' +
            //     'message:' +
            //     request.responseText +
            //     '\n' +
            //     'error:' +
            //     error
            // )
          }
        })
      })
    },
    addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g
      return num.toString().replace(regexp, ',')
    },
    // 일자 선택
    selectDay(num) {
      this.daySelect = num
      this.changeBackground(num)
      this.initTmap()
    },
    changeBackground(num) {
      var button = document.getElementById('day-btn-' + num)
      if (button) button.style.backgroundColor = '#54ff448f' // 원하는 배경색으로 변경
      for (let i = 0; i < 100; i++) {
        var btn = document.getElementById('day-btn-' + i)
        if (num == i) continue
        if (btn) {
          btn.style.backgroundColor = 'white'
        } else {
          break
        }
      }
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

.day-btn {
  border: 1px solid #353014;
  border-radius: 10px 10px 0px 0px;
  padding: 4px 9px;
  background-color: #ffffff;
  color: #353014;
}
.day-btn:hover {
  background-color: #54ff448f;
}
</style>
