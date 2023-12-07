import React from 'react';

export default function AdminSecondRow({
    pieChartComponent,
    title,
    firstRow,
    firstRowNumber,
    secondRow,
    secondRowNumber,
    thirdRow,
    thirdRowNumber,
}) {
    return (
        <>
            <span className="font-bold text-xl">{title}</span>
            <div className="flex justify-center items-center">
                <div className="w-3/5 flex pl-10">
                    {pieChartComponent} {/* Render the PieChartComponent here */}
                </div>
                <div className="w-2/5 h-full flex flex-col gap-4 mb-6">
                    <div>
                        <span className="text-[#697077]">{firstRow}</span>
                        <div className="flex items-center">
                            <img src="/admin/green-circle.svg" alt="bullet" />
                            <span className="font-semibold text-2xl pl-2">{firstRowNumber}</span>
                        </div>
                    </div>

                    <div>
                        <span className="text-[#697077]">{secondRow}</span>
                        <div className="flex items-center">
                            <img src="/admin/orange-circle.svg" alt="bullet" />
                            <span className="font-semibold text-2xl pl-2">{secondRowNumber}</span>
                        </div>
                    </div>

                    <div>
                        <span className="text-[#697077]">{thirdRow}</span>
                        <div className="flex items-center">
                            <img src="/admin/red-circle.svg" alt="bullet" />
                            <span className="font-semibold text-2xl pl-2">{thirdRowNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
