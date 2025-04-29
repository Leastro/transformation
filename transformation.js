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

    drawTicks(); // 눈금 그리기 호출

    defaultSetting(); // 기본 형태 호출
    
    // 눈금 그리기
    function drawTicks() {
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
        ctx.closePath(); // 경로 닫기
      }
    }

    function defaultSetting() { // 기본 형태
        // 기본 사각형 그리기
        ctx.beginPath(); // 경로 시작
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX, originY - 100); // y좌표 축은 위쪽으로 가려면 -
        ctx.lineTo(originX + 100, originY - 100); // x좌표 축은 오른쪽으로 가려면 +
        ctx.lineTo(originX + 100, originY);
        ctx.lineTo(originX, originY);
        ctx.strokeStyle = "black";
        ctx.stroke(); // 선을 그림
        ctx.fillStyle = "gray";
        ctx.fill(); // 색을 채움
        ctx.closePath(); // 경로 닫기

        //원점 표시
        ctx.beginPath(); // 경로 시작
        ctx.arc(originX, originY, 5, 0, Math.PI * 5);  // 중심 0,0 / 반지름 5px
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath(); // 경로 닫기

        //정의 좌표에 좌표 입력하기
        var strhtml = "";

        console.log(originX)
        console.log(originY)
        strhtml += "<span> 1. left-top : 0 / 100</span>";
        strhtml += "<span> 2. right-top : 100 / 100</span>";
        strhtml += "<span> 3. right-bottom : 100 / 0</span>";
        strhtml += "<span> 4. left-bottom : 0 / 0</span>";

        $('#show_xy').append(strhtml);
    }

    
});