"use client";
import { useState } from "react";
import { Pagination } from "@/components";

export function PaginationBasicDemo() {
  const [page, setPage] = useState(1);
  return <Pagination total={120} pageSize={10} currentPage={page} onPageChange={setPage} />;
}

export function PaginationGreenDemo() {
  const [page, setPage] = useState(1);
  return <Pagination total={80} pageSize={10} currentPage={page} onPageChange={setPage} color="green" />;
}

export function PaginationCyanDemo() {
  const [page, setPage] = useState(1);
  return <Pagination total={50} pageSize={10} currentPage={page} onPageChange={setPage} color="cyan" />;
}
