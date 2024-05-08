"use client";
import { memo, useEffect, useRef } from "react";
const InfinteScroll = ({
  next,
  children,
  hasMore,
  Onfinish,
  isLoading,
  onLoading,
  IsNull,
  count = 10000000000000000,
}) => {
  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          next();
        }
      },
      { threshold: 0.1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore]);
  return (
    <>
      {children}
      <div
        ref={observerRef}
        style={{
          display: "block",
          height: "10px",
          width: "100%",
          // background: "white",
          transform: "translateY(0px)",
        }}
      />
      {isLoading && onLoading}
      {/* {!hasMore && !!count?.length && Onfinish ? Onfinish : ""}
      {!hasMore && !count.length && IsNull ? IsNull : ""} */}
    </>
  );
};

export default InfinteScroll;
