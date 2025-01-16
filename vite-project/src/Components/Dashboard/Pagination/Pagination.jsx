//import { useState } from "react";
import ReactPaginate from "react-paginate";

 export default function PaginatedItems({ itemsPerPage , total , setPage}) {

    const pageCount = total / itemsPerPage ;
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected + 1 )}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="list-none flex justify-center items-center w-full"
        pageLinkClassName="w-[30px] h-[30px] inline-block transition-[0.5s] rounded-full text-center sm:overflow-x no-underline "
        activeLinkClassName="text-white bg-blue-600"
      />
    </>
  );
}