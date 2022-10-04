'use strict';

let detail = {
    length: 0,
    width: 0,
    lt: { radius: 0 },
    lb: { radius: 0 },
    rt: { radius: 50 },
    rb: { radius: 0 }
};

{
    const heightInput = document.getElementById("heightInput");
    const widthInput = document.getElementById("widthInput");
    const rightAngleInput = document.getElementById("rightAngleInput");
    const rotateZ = document.getElementById("rotateZ");
    const drawButton = document.getElementById("draw-element");
    const clearButton = document.getElementById("clear-btn");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');

    rightAngleInput.addEventListener('keyup', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        detail.rt.radius = +rightAngleInput.value;
        drawDetail();
    });

    drawButton.addEventListener("click", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        detail.lb.radius = 0;
        detail.rb.radius = 0;
        detail.lt.radius = 0;
        if (widthInput.value > canvas.clientHeight - 100 || heightInput.value > canvas.clientHeight - 100) {
            alert('Слишком большие размеры фигуры! Максимальный размер 700 х 700');
            return;
        } else {
            detail.width = +widthInput.value;
            detail.length = +heightInput.value;
        }
        detail.rt.radius = +rightAngleInput.value;
        drawDetail(detail);
    });

    rotateZ.addEventListener("click", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        //rotateDetail() - вармант 1;
        rotateObject(); // - вариант 2;
        drawDetail();
    });

    clearButton.addEventListener("click", () => {
        widthInput.value = '';
        heightInput.value = '';
        rightAngleInput.value = '';
    });

    function drawDetail() {
        context.beginPath();
        context.roundRect(
            canvas.clientWidth / 2 - detail.length / 2,
            canvas.clientHeight / 2 - detail.width / 2,
            detail.length,
            detail.width,
            [detail.lt.radius, detail.rt.radius, detail.rb.radius, detail.lb.radius]);
        context.closePath();
        context.stroke();
    }

    //**Вариант с изменением объекта detail */

    function rotateObject() {
        [detail.length, detail.width] = [detail.width, detail.length];
        if (detail.rt.radius !== 0) {
            detail.rb.radius = detail.rt.radius;
            detail.rt.radius = 0;
        } else if (detail.rb.radius !== 0) {
            detail.lb.radius = detail.rb.radius;
            detail.rb.radius = 0;
        } else if (detail.lb.radius !== 0) {
            detail.lt.radius = detail.lb.radius;
            detail.lb.radius = 0;
        } else if (detail.lt.radius !== 0) {
            detail.rt.radius = detail.lt.radius;
            detail.lt.radius = 0;
        } else alert('Что-то пошло не так!');
    }

    //** Вариант без изменения объекта detail **//

    // function rotateDetail(object) {
    //     context.beginPath();
    //     context.translate((canvas.clientWidth / 2 - object.length / 2) + object.length / 2, (canvas.clientHeight / 2 - object.width / 2) + object.width / 2);
    //     context.rotate(Math.PI / 2);
    //     context.translate(-((canvas.clientWidth / 2 - object.length / 2) + object.length / 2), -((canvas.clientHeight / 2 - object.width / 2) + object.width / 2));
    //     context.roundRect(canvas.clientWidth / 2 - object.length / 2, canvas.clientHeight / 2 - object.width / 2, object.length, object.width, [0, object.rt.radius, 0, 0]);
    //     context.closePath();
    //     context.stroke();
    //     console.log(detail);
    // }
}
