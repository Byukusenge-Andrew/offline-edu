import { Router } from 'express';
const router = Router();

router.post('/', (req, res) => {
  res.json({ message: 'Upload endpoint' });
});

export default router;
