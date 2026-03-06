"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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
    columnHelper.accessor("active", {
      header: "Status",
      cell: info =>
        info.getValue() ? (
          <span className="text-green-600 font-semibold">Active</span>
        ) : (
          <span className="text-red-500 font-semibold">Inactive</span>
        ),
    }),
  ], []);

  const filteredData = useMemo(() => {
    if (!search) return users;
    return users.filter(user =>
      Object.values(user).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Users Report", 14, 16);
    autoTable(doc, {
      head: [["ID", "Name", "Email", "Role", "Status"]],
      body: filteredData.map(u => [u.id, u.name, u.email, u.role, u.active ? "Active" : "Inactive"]),
      startY: 20,
    });
    doc.save("users-report.pdf");
  };

  const exportExcel = () => {
    const data = filteredData.map(u => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Status: u.active ? "Active" : "Inactive",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users-report.xlsx");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Users Table</h2>

      {/* Search + Export */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 md:w-1/3"
        />
        <button onClick={exportPDF} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Export PDF
        </button>
        <button onClick={exportExcel} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Export Excel
        </button>
      </div>

      {/* Table Wrapper: Scrollable on small screens */}
      <div className="overflow-x-auto border rounded ">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-3 border text-left cursor-pointer whitespace-nowrap"
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
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border p-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}