import React, { forwardRef, useEffect, useRef } from "react";
import "./style.css";

const DrawingBoard = forwardRef(
  ({ color, size, selectedUser, socket }, ref) => {
    const timeoutRef = useRef();

    const ctxRef = useRef(null);

    const selectedUserRef = useRef(null);

    useEffect(() => {
      selectedUserRef.current = selectedUser;

      if (socket) {
        socket.on("canvas-data", function (data) {
          // Check if the sender's user ID matches the selected user
          const root = this;
          const interval = setInterval(function () {
            if (root.isDrawing) return;
            root.isDrawing = true;
            clearInterval(interval);
            const image = new Image();
            const ctx = ctxRef.current;
            image.onload = function () {
              ctx.drawImage(image, 0, 0);
              root.isDrawing = false;
            };
            image.src = data;
          }, 50);
        });
      }
    }, [selectedUser, socket]);

    useEffect(() => {
      drawOnCanvas();
    }, []);

    useEffect(() => {
      if (ctxRef.current) {
        ctxRef.current.strokeStyle = color;
        ctxRef.current.lineWidth = size;
      }
    }, [color, size]);

    const drawOnCanvas = () => {
      const canvas = ref.current;
      ctxRef.current = canvas.getContext("2d");
      const ctx = ctxRef.current;

      const sketch = document.querySelector("#sketch");
      const sketch_style = getComputedStyle(sketch);
      canvas.width = parseInt(sketch_style.getPropertyValue("width"));
      canvas.height = parseInt(sketch_style.getPropertyValue("height"));

      const mouse = { x: 0, y: 0 };
      const last_mouse = { x: 0, y: 0 };

      canvas.addEventListener(
        "mousemove",
        function (e) {
          last_mouse.x = mouse.x;
          last_mouse.y = mouse.y;

          mouse.x = e.pageX - this.offsetLeft;
          mouse.y = e.pageY - this.offsetTop;
        },
        false
      );

      ctx.lineWidth = size;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = color;

      canvas.addEventListener(
        "mousedown",
        function (e) {
          console.log(
            "[MouseDown] selectedUser:",
            selectedUser,
            selectedUserRef.current
          );
          canvas.addEventListener("mousemove", onPaint, false);
        },
        false
      );

      canvas.addEventListener(
        "mouseup",
        function () {
          canvas.removeEventListener("mousemove", onPaint, false);
        },
        false
      );

      const onPaint = () => {
        // Check if the current user is the selected user
        const userSelected = selectedUserRef.current;
        console.log("[onPaint]selected user: ", userSelected);
        console.log("[onPaint]simple selected user: ", selectedUser);
        console.log("[onPaint]simple socket:  ", socket);
        if (userSelected && userSelected.socketId === socket.id) {
          ctx.beginPath();
          ctx.moveTo(last_mouse.x, last_mouse.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.closePath();
          ctx.stroke();

          if (timeoutRef.current !== undefined)
            clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(function () {
            socket.emit("canvas-data", canvas.toDataURL("image/png"));
          }, 100);
        }
      };
    };

    return (
      <div className="sketch" id="sketch">
        <canvas className="board" id="board" ref={ref}></canvas>
      </div>
    );
  }
);

export default DrawingBoard;
