var setX = 0;
var setY = 0;
var strhtml = "";

$(function() {
    const canvas = document.getElementById("xyPlane");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 클리어
    ctx.clearRect(0, 0, width, height);

    // 중심 좌표 설정 (캔버스 중앙)
    const originX = width / 2;
    const originY = height / 2;
    setX = originX;
    setY = originY;
    
    drawTicks(originX, originY, width, height, ctx); // 축, 눈금 그리기 호출

    defaultSetting(originX, originY, ctx); // 기본 형태 호출
});

// 축, 눈금 그리기
function drawTicks(originX, originY, width, height, ctx) {
    // X축 그리기
    ctx.beginPath(); // 경로 시작
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath(); // 경로 닫기
    
    // Y축 그리기
    ctx.beginPath(); // 경로 시작
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath(); // 경로 닫기
    
    const spacing = 50; // 눈금 간격
  
    // X축 눈금
    for (let x = originX; x < width; x += spacing) { // 양수 부분
        ctx.beginPath(); // 경로 시작
        /* 눈금 선 그리기 start*/
        ctx.moveTo(x, originY - 5);
        ctx.lineTo(x, originY + 5);
        /* 눈금 선 그리기 end*/
        ctx.stroke(); // 선을 그림
        if (x !== originX) {
            ctx.fillText(x - originX, x + 2, originY + 15); // 눈금 숫자 적기
        }
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath(); // 경로 닫기
    }
    for (let x = originX; x > 0; x -= spacing) { // 음수 부분
        ctx.beginPath(); // 경로 시작
        ctx.moveTo(x, originY - 5);
        ctx.lineTo(x, originY + 5);
        ctx.stroke(); // 선을 그림
        ctx.fillText(x - originX, x + 2, originY + 15); // 눈금 숫자 적기
        ctx.closePath(); // 경로 닫기
    }
  
    // Y축 눈금
    for (let y = originY; y < height; y += spacing) {
        ctx.beginPath(); // 경로 시작
        ctx.moveTo(originX - 5, y);
        ctx.lineTo(originX + 5, y);
        ctx.stroke(); // 선을 그림
        if (y !== originY) {
            ctx.fillText(originY - y, originX + 8, y + 4); // 눈금 숫자 적기
        }
        ctx.closePath(); // 경로 닫기
    }
    for (let y = originY; y > 0; y -= spacing) {
        ctx.beginPath(); // 경로 시작
        ctx.moveTo(originX - 5, y);
        ctx.lineTo(originX + 5, y);
        ctx.stroke(); // 선을 그림
        ctx.fillText(originY - y, originX + 8, y + 4); // 눈금 숫자 적기
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath(); // 경로 닫기
    }
}

// 기본 형태
function defaultSetting(originX, originY, ctx) {
    drawQuadrangle(originX, originY, 0, 0, 0, ctx); // 사각형 새로 그리기 호출

    // 원점 표시
    ctx.beginPath(); // 경로 시작
    ctx.arc(originX, originY, 5, 0, Math.PI * 5);  // 중심 x, y / 반지름 5px
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath(); // 경로 닫기

    // 정의 좌표에 좌표 입력하기
    strhtml += "<span> 1. left-top : 0 / 100</span>";
    strhtml += "<span> 2. right-top : 100 / 100</span>";
    strhtml += "<span> 3. right-bottom : 100 / 0</span>";
    strhtml += "<span> 4. left-bottom : 0 / 0</span>";

    $('#show_xy').append(strhtml);
}

// x,y값 변환
function changeXY(type, valueXY) {
    const canvas = document.getElementById("xyPlane");
    const ctx = canvas.getContext("2d");
    
    ctx.setTransform(1, 0, 0, 1, 0, 0); // 회전 위치 초기화
    
    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 전체 클리어
    ctx.clearRect(0, 0, width, height);

    drawTicks(setX, setY, width, height, ctx); // 축, 눈금 그리기 호출
    
    var default_x = parseFloat($('#default_x').val());
    var default_y = parseFloat($('#default_y').val());

    if(type == "x"){
        var changeX = parseFloat(valueXY);
        var changeY = parseFloat($('#move_y').val());
        var valueAngle = parseFloat($('#angle').val());

        // 정의 좌표에 좌표 입력하기
        strhtml = ""; // 초기화
        strhtml += "<span> 1. left-top : " + floatUnder2(default_x + Number(valueXY)) + " / " + floatUnder2(default_y + 100 + Number(changeY)) +"</span>";
        strhtml += "<span> 2. right-top : " + floatUnder2(100 + default_x + Number(valueXY)) + " / " + floatUnder2(default_y + 100 + Number(changeY)) +"</span>";
        strhtml += "<span> 3. right-bottom : " + floatUnder2(100 + default_x + Number(valueXY)) + " / " + floatUnder2(default_y + Number(changeY)) +"</span>";
        strhtml += "<span> 4. left-bottom : " + floatUnder2(default_x + Number(valueXY)) + " / " + floatUnder2(default_y + Number(changeY)) +" </span>";

    }else if(type == "y"){
        var changeX = parseFloat($('#move_x').val());
        var changeY = parseFloat(valueXY);
        var valueAngle = parseFloat($('#angle').val());

        // 정의 좌표에 좌표 입력하기
        strhtml = ""; // 초기화
        strhtml += "<span> 1. left-top : " + floatUnder2(default_x + Number(changeX)) + " / " + floatUnder2(default_y + 100 + Number(valueXY)) +"</span>";
        strhtml += "<span> 2. right-top : " + floatUnder2(100 + default_x + Number(changeX)) + " / " + floatUnder2(default_y + 100 + Number(valueXY)) +"</span>";
        strhtml += "<span> 3. right-bottom : " + floatUnder2(100 + default_x + Number(changeX)) + " / " + floatUnder2(default_y + Number(valueXY)) +"</span>";
        strhtml += "<span> 4. left-bottom : " + floatUnder2(default_x + Number(changeX)) + " / " + floatUnder2(default_y + Number(valueXY)) +" </span>";

    }

    $('#show_xy').empty();
    $('#show_xy').append(strhtml);

    drawQuadrangle(setX, setY, default_x + Number(changeX), default_y + Number(changeY), valueAngle, ctx); // 사각형 새로 그리기 호출

    //원점 표시
    ctx.beginPath(); // 경로 시작
    ctx.arc(setX + default_x + Number(changeX), setY - (default_y + Number(changeY)), 5, 0, Math.PI * 2); // 중심x, y / 반지름 5px
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath(); // 경로 닫기
}

//정의좌표 계산 - 소숫점 2자리
function floatUnder2(value){
    return parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
}

//회전
function turnQuadrangle(value) {
    const canvas = document.getElementById("xyPlane");
    const ctx = canvas.getContext("2d");
    
    ctx.setTransform(1, 0, 0, 1, 0, 0); // 회전 위치 초기화
    
    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 전체 클리어
    ctx.clearRect(0, 0, width, height);

    drawTicks(setX, setY, width, height, ctx); // 축, 눈금 그리기 호출

    var default_x = parseFloat($('#default_x').val());
    var default_y = parseFloat($('#default_y').val());
    var valueX = parseFloat($('#move_x').val());
    var valueY = parseFloat($('#move_y').val());
    var changeAngle = parseFloat(value);

    drawQuadrangle(setX, setY, valueX + default_x, valueY + default_y, changeAngle, ctx);

    // 원점 표시
    ctx.beginPath(); // 경로 시작
    ctx.arc(setX + valueX + default_x, setY - (valueY + default_y), 5, 0, Math.PI * 2); // 중심 x, y / 반지름 5px
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath(); // 경로 닫기
}

//사각형 그리기
function drawQuadrangle(setX, setY, changeX, changeY, changeAngle, ctx) {
    // 각도 라디안 기준으로 변환
    let radians = changeAngle * Math.PI / 180;

    ctx.translate(setX , setY);  // 캔버스 중앙으로 이동
    ctx.rotate(radians); // 캔버스 전체 회전
    ctx.translate(-setX , -setY);  // 다시 기준점 맞추기

    // 기본 사각형 그리기
    // 내부 색이 채워져 있는 사각형 그리기
    ctx.fillStyle = "gray";
    ctx.fillRect(setX + changeX, setY - changeY, 100, -100);
    // 순서 > (시작X좌표, 시작Y좌표, 가로 크기, 세로 크기)

    //사각형에 따로 선 그리기
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5; // 선 두께 
    // 사각형 테두리 그리기
    ctx.strokeRect(setX + changeX, setY - changeY, 100 , -100);
    // 순서 > (시작X좌표, 시작Y좌표, 가로 크기, 세로 크기)
}

//원점 변경
function defaultSetXY(type, valueXY) {
    const canvas = document.getElementById("xyPlane");
    const ctx = canvas.getContext("2d");

    ctx.setTransform(1, 0, 0, 1, 0, 0); // 회전 위치 초기화

    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 전체 클리어
    ctx.clearRect(0, 0, width, height);

    drawTicks(setX, setY, width, height, ctx); // 축, 눈금 그리기 호출
    
    var default_x = parseFloat($('#default_x').val());
    var default_y = parseFloat($('#default_y').val());
    var valueX = parseFloat($('#move_x').val());
    var valueY = parseFloat($('#move_y').val());
    var valueAngle = parseFloat($('#angle').val());

    if(type == "x") {
        default_x = parseFloat(valueXY);
    }else if(type == "y") {
        default_y = parseFloat(valueXY);
    }
    
    drawQuadrangle(setX + default_x, setY - default_y, valueX, valueY, valueAngle, ctx);

    // 원점 표시
    ctx.beginPath(); // 경로 시작
    ctx.arc(setX + default_x + valueX , setY - (default_y + valueY), 5, 0, Math.PI * 2); // 중심 x, y / 반지름 5px
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath(); // 경로 닫기
}