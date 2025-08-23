type Props = {
    title: string
}

export const CardTop = (Props: Props) => {
    return (
        <>
            <div className="sm:left-[10%] bg-white rounded-md shadow-lg w-full sm:w-4/5 h-24 lg:h-32 flex absolute z-20 sm:top-[450px] top-80 md:top-[490px] lg:top-[650px]">
                <span className="w-11/12 flex mx-auto flex-nowrap items-center justify-between">
                    <h3 className=" text-center text-[13px] sm:tetx-[16px] lg:text-[20px] text-hijau font-light">
                        {Props.title}
                    </h3>
                </span>
            </div>
        </>
    )
}