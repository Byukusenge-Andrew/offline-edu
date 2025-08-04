import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Quizzes endpoint' });
});

export default router;
