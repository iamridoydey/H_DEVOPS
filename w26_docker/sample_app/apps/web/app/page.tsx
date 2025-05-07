import { prismaClient } from "db/client";

export default async function Home() {
  const users = await prismaClient.user.findMany();
  return (
    <div>
      <h1>Users</h1>
      <p>List of users from the database:</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user?.username}</li>
        ))}
      </ul>
      <h2>Raw JSON</h2>
    </div>
  );
}


export const dynamic = "force-dynamic";
