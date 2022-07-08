import { app } from "./src/app.js";
import "./src/config/env.js";
import daySchedule from "./src/utils/schedule.js";

const PORT = process.env.PORT || 3000;

daySchedule.initDiary();

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
