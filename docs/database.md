### Prisma schemas

```
User {
  id String @id @default(uuid()) @db.Uuid
  email    String @unique
  password String
  name     String
  save_url String[] @default([])
  createdAt DateTime @default(now())
}
```

```
Url {
  id String @id @default(uuid()) @db.Uuid
  new_url  String @unique
  email String
  real_url String
  time Int
  once Boolean @default(false)
  viewer Int  @default(0)
  createdAt DateTime @default(now())
}
```

```
Click {
  id String @id @default(uuid()) @db.Uuid
  new_url String
  ip String
  createdAt DateTime @default(now())
  user_agent String
  referer String
  language String
  accept String
  token String @default("")
}
```

```
Token {
  email String
  id String @id @default(uuid()) @db.Uuid
  token String @unique
  use Boolean @default(true)
  createdAt DateTime @default(now())
}
```