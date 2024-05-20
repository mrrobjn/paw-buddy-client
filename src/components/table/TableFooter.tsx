import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

type Props = {
  dataLength: number;
  count: number;
  onPageChange: any;
};

const TableFooter: React.FC<Props> = ({ dataLength, count, onPageChange }) => {
  return (
    <div className="flex justify-between my-5">
      <div className="text-90">
        Showing {dataLength > 1 ? "1-" + dataLength : dataLength} of {count}
      </div>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaChevronRight />}
          onPageChange={onPageChange}
          pageRangeDisplayed={4}
          pageCount={Math.ceil(count / 10)}
          previousLabel={<FaChevronLeft />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default TableFooter;
