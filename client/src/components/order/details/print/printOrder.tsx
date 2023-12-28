import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas';

//************************************
// Description: Nút In đơn và những hành động được xử lý để in đơn đó.
//************************************

interface PrintButtonProps {
  elementId: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ elementId }) => {
  // Khi nhấn vào nút in đơn, tự động chuyển hướng sang cửa sổ của hành động in của trình duyệt.
    const handlePrint = () => {
        const section = document.getElementById(elementId);
        if (section) {
          html2canvas(section).then((canvas) => {
            const url = canvas.toDataURL();
            const printWindow = window.open();
            if (printWindow) {
                // Create an image element
                const img = new Image();
                img.onload = () => {
                    printWindow?.document.write('<img style="width: 100%; height: auto;" src="' + url + '" />');
                    printWindow?.document.close();
                    if(printWindow) printWindow.print();
                };

                // Set the image source to the captured URL
                img.src = url;
              }
          });
        }
      };

  return (
    <button onClick={handlePrint} type="button" className="inline-flex items-center bg-blue-400 hover:bg-blue-800 text-white py-2 px-8 shadow-md rounded">
    <FontAwesomeIcon icon={faPrint} className="mr-2" />
        In đơn
    </button>
  );
};

export default PrintButton;