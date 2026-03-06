"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender
} from "@tanstack/react-table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import ActiveUsersChart from "../charts/ActiveUsersChart";
import UsersRoleChart from "../charts/UsersRoleChart";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users from API
  useEffect(() => {
    axios.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("role", { header: "Role" }),
    columnHelper.accessor("active", { header: "Active" }),
  ], []);

  // Filter users by search
  const filteredData = useMemo(() => {
    if (!search) return users;
    return users.filter(user =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } }, // ← هنا عدد المستخدمين لكل صفحة
  });

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Users Report", 14, 16);

    const activeCount = users.filter(u => u.active).length;
    const inactiveCount = users.length - activeCount;

    // Summary
    doc.text(`Total Users: ${users.length}`, 14, 24);
    doc.text(`Active Users: ${activeCount}`, 14, 30);
    doc.text(`Inactive Users: ${inactiveCount}`, 14, 36);
    doc.text(`Percentage of Active Users: ${((activeCount / users.length) * 100).toFixed(1)}%`, 14, 42);

    // Users Table
    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: filteredData.map(u => [u.id, u.name, u.email, u.role, u.active]),
      startY: 50,
    });

    doc.save("users_report.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    const activeCount = users.filter(u => u.active).length;
    const inactiveCount = users.length - activeCount;

    const summaryData = [
      ["Metric", "Value"],
      ["Total Users", users.length],
      ["Active Users", activeCount],
      ["Inactive Users", inactiveCount],
      ["Percentage of Active Users", ((activeCount / users.length) * 100).toFixed(1) + "%"],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

    const roleCounts = Object.values(
      users.reduce((acc, user) => {
        acc[user.role] = acc[user.role] ? acc[user.role] + 1 : 1;
        return acc;
      }, {})
    );
    const roles = Object.keys(
      users.reduce((acc, user) => {
        acc[user.role] = acc[user.role] ? acc[user.role] + 1 : 1;
        return acc;
      }, {})
    );
    const roleData = [["Role", "Count"]];
    roles.forEach((role, i) => roleData.push([role, roleCounts[i]]));
    const wsRoles = XLSX.utils.aoa_to_sheet(roleData);
    XLSX.utils.book_append_sheet(wb, wsRoles, "Users per Role");

    const wsUsers = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, wsUsers, "Users Table");

    XLSX.writeFile(wb, "users_report.xlsx");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard / Reports</h2>

      {/* Search + Export */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3 min-w-[200px]"
        />
        <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-1 rounded">
          Export PDF
        </button>
        <button onClick={exportExcel} className="bg-green-500 text-white px-4 py-1 rounded">
          Export Excel
        </button>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap gap-8 mb-6">
        <div>
          <h3 className="font-bold mb-2">Active vs Inactive Users</h3>
          <ActiveUsersChart users={users} />
        </div>
        <div>
          <h3 className="font-bold mb-2">Users per Role</h3>
          <UsersRoleChart users={users} />
        </div>
      </div>

      {/* Users Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="p-2 border cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {{
                      asc: " 🔼",
                      desc: " 🔽"
                    }[header.column.getIsSorted()] ?? ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}