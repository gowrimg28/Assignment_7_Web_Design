let interval;
let startTime = 0;

const updateTimer = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (allowUpdate){
      startTime++;
      const hours = Math.floor(startTime / 3600);
      const minutes = Math.floor((startTime % 3600) / 60);
      const seconds = startTime % 60;
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      $("#time-display").text(formattedTime);
    }
      resolve();
    }, 1000);
  });
};

const startTimer = async () => {
  if (!interval) {
    allowUpdate = true;
    interval = setInterval(async () => {
      await updateTimer();
    }, 1000);
  }
};

const stopTimer = () => {
  clearInterval(interval);
  interval = null;
  allowUpdate = false;
};

const resetTimer = () => {
  clearInterval(interval);
  interval = null;
  startTime = 0;
  $("#time-display").text("00:00:00");
  allowUpdate = false;
};

$(document).ready(() => {
  $("#date-picker").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  const currentDate = new Date();
  const formattedDate =
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(currentDate.getDate()).padStart(2, "0") +
    "/" +
    currentDate.getFullYear();
  $("#date-picker").val(formattedDate);

  $("#start").click(startTimer);

  $("#stop").click(stopTimer);

  $("#reset").click(resetTimer);
});