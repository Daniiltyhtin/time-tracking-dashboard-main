document.addEventListener('DOMContentLoaded', () => {

  const dailyBtn = document.getElementById('daily-btn');
  const weeklyBtn = document.getElementById('weekly-btn');
  const monthlyBtn = document.getElementById('monthly-btn');


  function updateActivities(timeframe) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data.forEach((activity, index) => {
          const activityElement = document.getElementById(`activity-${index + 1}`)
          const currentTime = activity.timeframes[timeframe].current;
          const previousTime = activity.timeframes[timeframe].previous;

          activityElement.innerHTML =
            `
          <p class="this-time show">${currentTime}hrs</p>
          <p class="last-time show">Last ${activity.title} - ${previousTime}hrs</p>
          `;

          setTimeout(() => {
            const thisTime = activityElement.querySelector('.this-time');
            const lastTime = activityElement.querySelector('.last-time');
            thisTime.classList.remove('show');
            lastTime.classList.remove('show');
          }, 300);
        });
      });
  }



  dailyBtn.addEventListener('click', () => updateActivities('daily'));
  weeklyBtn.addEventListener('click', () => updateActivities('weekly'));
  monthlyBtn.addEventListener('click', () => updateActivities('monthly'));


  updateActivities('daily');
});