const LEFT = "left";
const RIGHT = "right";
const UP = "up";
const DOWN = "down";
const TAP = "tap";

export default [
  "swipe",
  {
    mounted(
      el,
      binding
      //, vnode
    ) {
      const callback = binding.value;
      let startX = 0,
        startY = 0,
        endX = 0,
        endY = 0,
        time = 0;
        
      el.addEventListener(
        "touchstart",
        function(event) {
          startX = event.changedTouches[0].screenX;
          startY = event.changedTouches[0].screenY;
          time = new Date().getTime();
        },
        false
      );

      el.addEventListener(
        "touchend",
        function(event) {
          endX = event.changedTouches[0].screenX;
          endY = event.changedTouches[0].screenY;
          // in one second.
          if (new Date().getTime() - time < 1000) {
            handleGesure(event);
          } else {
            time = 0;
          }
        },
        false
      );

      function handleGesure(event) {
        let directions = [];

        if (endY === startY) {
          directions.push(TAP);
        }

        if (endY >= startY) {
          directions.push(DOWN);
        }

        if (endY <= startY) {
          directions.push(UP);
        }

        if (endX <= startX) {
          directions.push(LEFT);
        }

        if (endX >= startX) {
          directions.push(RIGHT);
        }

        if (
          Object.keys(binding.modifiers).every((modifier) =>
            directions.includes(modifier)
          )
        ) {
          callback(event);
        }
      }
    },
  },
];
