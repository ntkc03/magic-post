import React, { useEffect, useState } from "react";
import { Shimmer } from "react-shimmer";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

function StatisticsPointShimmer() {

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  const shimmerHeight = (2 / 3) * pageHeight;
  useEffect(() => {
    // Update page width when the window is resized
    const handleResizeW = () => setPageWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeW);
    const handleResizeH = () => setPageHeight(window.innerHeight);
    window.addEventListener('resize', handleResizeH);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResizeW);
      window.removeEventListener('resize', handleResizeH);
    };
  }, []);

  return (

    <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
      <div className='pl-1'>
        <text className='text-2xl'>Các điểm tập kết: </text>
      </div>
      <div className="items-center justify-center bg-background text-center text-textColor">
        <TableContainer component={Paper}>
          <Shimmer height={shimmerHeight} width={pageWidth} />
        </TableContainer>
      </div>
    </div>
  );
}

export default StatisticsPointShimmer;
