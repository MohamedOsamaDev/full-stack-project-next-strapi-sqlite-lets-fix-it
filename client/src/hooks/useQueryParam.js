"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
export const useQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const multiple = useCallback(
    ({ target }) => {
      let { name, value } = target;
      let query = searchParams.get(name) || "";
      query = query.split(",").filter((i) => i);
      if (query.includes(value)) {
        query = query.filter((i) => i !== value);
      } else {
        query = [...query, value];
      }
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (current.has(name)) {
        if (!query.length) {
          current.delete(name);
        } else {
          current.set(name, query);
        }
      } else {
        current.append(name, value);
      }
      router.replace(pathname + "?" + current.toString());
    },
    [searchParams]
  );
  const singleValue = useCallback(
    ({ target }) => {
      let { name, value } = target;
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (current.has(name)) {
        if (searchParams.get(name) !== value) {
          current.set(name, value);
        } else {
          current.delete(name);
        }
      } else {
        current.append(name, value);
      }
      router.push(pathname + "?" + current.toString());
    },
    [searchParams, pathname]
  );
  const clearOne = useCallback(
    ({ target }) => {
      const { name } = target;
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete(name);
      router.push(pathname + "?" + current.toString());
    },
    [pathname, searchParams]
  );
  const clearQuery = useCallback(() => {
    router.push(pathname);
  }, [pathname, searchParams]);

  return { multiple, clearQuery, singleValue, clearOne, searchParams };
};
