import React, { useEffect, useState } from "react";
import Bold from "../Typography/Bold";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const PaginationDefault = ({ index, size, total, onChange }) => {
    const [pageIndex, setPageIndex] = useState(index);
    const [pageSize, setPageSize] = useState(size);

    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (newIndex) => {
        if (newIndex >= 0 && newIndex < totalPages) {
            setPageIndex(newIndex);
            onChange(newIndex, pageSize);
        }
    }

    const handleSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSize(newSize);
        setPageIndex(0); // Reset the index when changing the page size
        onChange(pageIndex, newSize);
    }

    const renderPages = () => {
        const maxVisiblePages = 5; // You can adjust this value
        const pages = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            const leftOffset = Math.floor(maxVisiblePages / 2);
            const rightOffset = totalPages - leftOffset;

            if (pageIndex < leftOffset) {
                for (let i = 0; i < maxVisiblePages - 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages - 1);
            } else if (pageIndex >= leftOffset && pageIndex < rightOffset) {
                pages.push(0);
                pages.push('...');
                for (let i = pageIndex - leftOffset + 1; i <= pageIndex + leftOffset - 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages - 1);
            } else {
                pages.push(0);
                pages.push('...');
                for (let i = totalPages - (maxVisiblePages - 1); i < totalPages; i++) {
                    pages.push(i);
                }
            }
        }

        return pages.map((numberCount, i) => {
            if (numberCount === '...') {
                return (
                    <span key={i} className='text-regularText mx-2'>
                        {numberCount}
                    </span>
                );
            }

            return (
                <div
                    key={i}
                    className={`rounded-md flex items-center justify-center border border-regularText cursor-pointer ${numberCount === pageIndex ? 'bg-[#66be7a] text-white border-[#66be7a]' : ''}`}
                    style={{ width: 25, height: 25 }}
                    onClick={() => {
                        if (numberCount !== pageIndex) {
                            handlePageChange(numberCount);
                        }
                    }}
                >
                    <Bold>{numberCount + 1}</Bold>
                </div>
            );
        });
    }

    useEffect(() => {
        // Update local state when the props change
        setPageIndex(index);
        setPageSize(size);
    }, [index, size]);

    return (
        <div className='flex flex-row w-full items-center mt-4 gap-3'>
            <div className='flex flex-row items-center gap-2'>
                <div
                    className={`rounded-md flex items-center justify-center border border-regularText cursor-pointer ${pageIndex === 0 ? 'pointer-events-none opacity-50' : ''}`}
                    style={{ width: 25, height: 25 }}
                    onClick={() => handlePageChange(pageIndex - 1)}
                >
                    <span style={{ fontWeight: 600, fontSize: 15 }} className='text-regularText'><BsChevronLeft /></span>
                </div>

                {renderPages()}

                <div
                    className={`rounded-md flex items-center justify-center border border-regularText cursor-pointer ${pageIndex === totalPages - 1 ? 'pointer-events-none opacity-50' : ''}`}
                    style={{ width: 25, height: 25 }}
                    onClick={() => handlePageChange(pageIndex + 1)}
                >
                    <span style={{ fontWeight: 600, fontSize: 15 }} className='text-regularText'><BsChevronRight /></span>
                </div>
            </div>

            <select
                className="rounded-md border border-regularText"
                value={pageSize}
                onChange={handleSizeChange}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    )
}

export default PaginationDefault;
