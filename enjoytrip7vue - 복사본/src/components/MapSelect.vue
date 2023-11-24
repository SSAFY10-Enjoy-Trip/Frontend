<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
      <div class="m-2 p-4" style="border: #eee 1px solid; background-color: #fafafa">
        <div>
          <body :on-load="initTmap" class="mb-3" style="background-color: #fafafa">
            <div class="text-center">
              <h2 class="jalnan-gothic"># 나만의 코스 알리기</h2>
              <h4 class="suite-regular">
                핀을 움직이고, <span style="background-color: #b2e98f">장소추가</span>를 통해 코스에
                등록하세요!
              </h4>
            </div>

            <hr />
            <!-- 맵 생성 실행 -->
            <div class="d-flex justify-content-center">
              <div id="map_div"></div>
            </div>
          </body>
          <img src="../assets/boardNoti.png" alt="" class="width-100" />
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
      <div class="p-3 schedule-container">
        <h3 class="suite-bold text-center p-1" style="background-color: #fff">일정등록</h3>
        <hr />
        <button
          v-for="(item, index) in rowCount"
          :key="index"
          @click="selectDay(item)"
          class="day-btn suite-bold"
          :id="'day-btn-' + index"
        >
          {{ item }}일차
        </button>
        <button class="day-plus-btn suite-bold left-space-6" @click="countUp">+</button>
        <button class="day-minus-btn suite-bold left-space-3" @click="countDown">-</button>
        <table class="mb-3 width-100 right-space-10">
          <tr
            class="text-center suite-bold"
            style="
              background-color: #fdf7d6;
              width: 20%;
              border-radius: 0px 0px 0px 0px;
              border: 1px #000 solid;
            "
          >
            <!-- <td class="p-2">방문순서</td>
            <td>주소</td>
            <td>삭제</td> -->
          </tr>
          <tr v-for="(item, idx) in rowData.rowNameValue[selectRow]" :key="{ idx }">
            <td
              class="text-center suite-bold p-2"
              style="background-color: #e9fde6; width: 20%; border-radius: 0px 0px 0px 0px"
            >
              💠 장소 {{ idx + 1 }}
            </td>
            <td class="p-2">{{ item }}</td>
            <td class="p-1">
              <button @click="removePlace(idx)" class="btn suite-bold" id="delete-place">X</button>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <button @click="addPlace" class="btn suite-bold" id="add-place-btn">
                📌 장소추가
              </button>
            </td>
          </tr>
        </table>

        <div id="boardDetailContent" class="mt-2">
          <h3 class="suite-bold">🏄‍♂️ 코스 이름</h3>
          <input
            v-model="tripBoardTitle"
            class="board-content mt-2 mb-4 p-2"
            placeholder="개성있는 코스 이름을 지어주세요!"
          />

          <h3 class="suite-bold">💖 매력 포인트</h3>
          <textarea
            v-model="tripBoardContent"
            class="board-content mt-2 mb-4 p-2"
            placeholder="코스에 대해 설명해주세요"
          />

          <hr />

          <button @click="insertTripBoard" v-show="true" class="btn btn-success m-1">
            작성완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var map
// 페이지가 로딩이 된 후 호출하는 함수입니다.

// import Vue from 'vue'

import { ref, reactive } from 'vue'
const stopoverAddres = reactive([])
// 경유지 좌표값
var corseY = ref('')
var corseX = ref('')
const addPlace = () => {
  loadGetLonLatFromAddress()
}
const removePlace = (idx) => {
  rowData.rowNameValue[selectRow.value].splice(idx, 1)
  rowData.rowPositionXValue[selectRow.value].splice(idx, 1)
  rowData.rowPositionYValue[selectRow.value].splice(idx, 1)
  markerList.mark[selectRow.value][idx].setMap(null)
  markerList.mark[selectRow.value].splice(idx, 1)

  // 마커 제어
  allMakerCount.value--
  let cnt = 1
  // 전체 마커를 돌면서 라벨 재 지정
  for (let i = 0; i < markerList.mark.length; i++) {
    for (let j = 0; j < markerList.mark[i].length; j++) {
      const label =
        "<span class='suite-regular' style='padding: 1px 5px; border-radius: 3px; background-color: #46414E;color:white'>" +
        '장소 ' +
        cnt +
        '</span>'
      // 라벨 설정
      markerList.mark[i][j].setLabel(label)
      cnt++
    }
  }
}

function loadGetLonLatFromAddress() {
  // TData 객체 생성
  var tData = new Tmapv2.extension.TData()

  var optionObj = {
    coordType: 'WGS84GEO', //응답좌표 타입 옵션 설정 입니다.
    addressType: 'A04' //주소타입 옵션 설정 입니다.
  }

  // 해당 일자에 배열이 없다면 생성
  if (rowData.rowNameValue[selectRow.value] == undefined) {
    rowData.rowNameValue[selectRow.value] = new Array()
    rowData.rowPositionXValue[selectRow.value] = new Array()
    rowData.rowPositionYValue[selectRow.value] = new Array()
    markerList.mark[selectRow.value] = new Array()
  }

  rowData.rowPositionXValue[selectRow.value].push(corseX.value)
  rowData.rowPositionYValue[selectRow.value].push(corseY.value)

  var params = {
    onComplete: onComplete //데이터 로드가 성공적으로 완료 되었을때 실행하는 함수 입니다.
  }

  tData.getAddressFromGeoJson(corseX.value, corseY.value, optionObj, params)
}
//리버스 지오코딩
function onComplete() {
  // console.log(this._responseData)
  var result = this._responseData.addressInfo.fullAddress
  stopoverAddres.push(result)

  rowData.rowNameValue[selectRow.value].push(result)
  // rowData.rowNameValue[selectRow] = stopoverAddres
  // console.log(rowData.rowNameValue[selectRow.value])
  console.log(rowData)

  allMakerCount.value++
  //선택 장소 Marker 객체 생성.
  const label =
    "<span class='suite-regular' style='padding: 1px 5px; border-radius: 3px; background-color: #46414E;color:white'>" +
    '장소 ' +
    allMakerCount.value +
    '</span>'
  // 해당 페이지의 마커 생성
  markerList.mark[selectRow.value].push(
    new Tmapv2.Marker({
      position: new Tmapv2.LatLng(corseX.value, corseY.value), //Marker의 중심좌표 설정.
      icon: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcwbTcX%2FbtsAryak2dp%2Fbrt08hPx7XB2T4XouzR9w0%2Fimg.png',
      map: map, //Marker가 표시될 Map 설정..
      title: result, //Marker 타이틀.
      animation: Tmapv2.MarkerOptions.ANIMATE_BALLOON, //Marker 애니메이션.
      animationLength: 100, //애니메이션 길이.
      label: label
    })
  )
  console.log(markerList.mark)
}

// 각 일차 별 일정 추가
let rowCount = ref(1)
let allMakerCount = ref(0)
const rowData = reactive({
  rowCount: rowCount,
  rowNameValue: [[]], // 주소지 이름
  rowPositionYValue: [[]], // 주소지 좌표(Y)
  rowPositionXValue: [[]] // 주소지 좌표(Y)
})
const markerList = reactive({
  mark: [[]]
})
let selectRow = ref(1)
const countUp = () => {
  rowCount.value += 1
  selectRow.value = rowCount.value
  // console.log(selectRow.value + '으로 전환')
}
const countDown = () => {
  // console.log(rowCount.value - 1 + '으로 전환')
  if (rowCount.value - 1 >= 1) {
    rowData.rowNameValue[rowCount.value] = new Array()
    rowCount.value -= 1
  }
  selectRow.value = rowCount.value
}
const selectDay = (num) => {
  selectRow.value = num
  changeBackground(num - 1)
}

const changeBackground = (num) => {
  var button = document.getElementById('day-btn-' + num)
  if (button) button.style.backgroundColor = '#94d59d' // 원하는 배경색으로 변경
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

import { useRouter } from 'vue-router'
import http from '@/common/axios.js'

const router = useRouter()
let tripBoardTitle = ref('')
let tripBoardContent = ref('')

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
      stopoverAddres,
      countUp,
      countDown,
      selectDay,
      rowCount,
      rowData,
      selectRow,
      changeBackground,
      tripBoardTitle,
      tripBoardContent,
      router
    }
  },
  mounted() {
    this.initTmap()

    rowData.rowCount = 1
    rowData.rowNameValue = [[]]
    rowData.rowPositionYValue = [[]]
    rowData.rowPositionXValue = [[]]
    rowCount.value = 1
    allMakerCount.value = 0
    selectRow.value = 1
  },
  methods: {
    initTmap() {
      // map 생성
      // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
      map = new Tmapv2.Map('map_div', {
        // "map_div" : 지도가 표시될 div의 id
        center: new Tmapv2.LatLng(37.5652045, 126.98702028),
        width: '95%', // 지도의 넓이
        height: '60vh', // 지도의 높이
        zoom: 17
      })

      //EPSG:3857 좌표계를 생성합니다.
      var epsg3857 = new Tmapv2.Point(14136131, 4518172)
      // WGS84 좌표계로 변환합니다
      var wgs84 = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(epsg3857)

      // 마커를 생성합니다.
      var marker1 = new Tmapv2.Marker({
        position: wgs84,
        icon: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrJde1%2FbtsAvuxQXbZ%2FqKPfq62RsKe6PAZ0GWkKh1%2Fimg.png',
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
    },
    async insertTripBoard() {
      let boardObj = {
        title: tripBoardTitle.value,
        content: tripBoardContent.value,
        location: JSON.stringify(rowData)
      }
      try {
        let { data } = await http.post('/tripBoard', boardObj)
        console.log(data)

        if (data.Board == 'SUCCESS') {
          this.$router.push({ path: '/bordAll' })
        } else if (data.board == 'FAIL') {
          alert('게시판 등록 실패')
        }
      } catch (error) {
        console.log(error)
      }
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
  background-color: #880c0c;
  color: white;
}

table {
  /* border: 1px solid #afafaf;
  border-radius: 6px;*/
  font-family: 'SUITE-Regular';
}

table tr {
  border: 1px solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
}

#add-place-btn {
  background: linear-gradient(to bottom left, #b2e98f 12%, #b2e98f 100%);
  border-radius: 4px;
  border: 1px solid #0aa59e;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-size: 18px;
  width: 100%;
  text-decoration: none;
  text-shadow: 0px 0px 0px #092580;
}
#add-place-btn:hover {
  background: linear-gradient(to bottom left, #a3dc96 12%, #22b37e 100%);
  border: 1px solid #03928b;
}
#add-place-btn:active {
  position: relative;
  top: 1px;
}

.board-content {
  border: #888 1px solid;
  border-radius: 4px;
  width: 100%;
}
textarea {
  height: 300px;
}
.day-btn {
  border: 1px solid #353014;
  border-radius: 10px 10px 0px 0px;
  padding: 4px 9px;
  background-color: #ffffff;
  color: #353014;
}
.day-btn:hover {
  background-color: #099f2828;
}

.day-plus-btn {
  border: 1px solid #353014;
  border-radius: 100%;
  padding: 2px 8px;
  background-color: #fff;
  color: #353014;
}
.day-plus-btn:hover {
  background-color: #538662;
}
.day-minus-btn {
  border: 1px solid #353014;
  border-radius: 100%;
  padding: 2px 8px;
  background-color: #fff;
  color: #353014;
}
.day-minus-btn:hover {
  background-color: #d86767;
}

.schedule-container {
  border-radius: 10px;
  border: 1px #ccc solid;
}
</style>
