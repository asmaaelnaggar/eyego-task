"use client";

export default function RecentUsers({ users }) {
  const recent = users.slice(-5);
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Users</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>

        <tbody>
          {recent.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}