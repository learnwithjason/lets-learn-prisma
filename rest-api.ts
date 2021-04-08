import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany();

  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  res.json(post);
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { posts: true },
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log(`app listening on http://localhost:3000`);
});
