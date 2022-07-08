import { Router } from 'express';
import CalendarService from '../services/calenderService.js';
const calendarRouter = Router();

calendarRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(true);
  } else {
    res.send(false);
  }
});

calendarRouter.get('/:year/:month', async (req, res) => {
  if (req.isAuthenticated()) {
    const user_id = req.user.id;
    const year = req.params.year;
    const month = req.params.month;
    const result = await CalendarService.getMonthly({ year, month, user_id });
    res.send(result);
  } else {
    res.send('Login first');
  }
});
export { calendarRouter };
