type Props = {
    title: string
}

export const CardProgram = (Props: Props) => {
    return (
        <>
            <div className="sm:left-[10%] bg-white rounded-md shadow-lg w-full sm:w-4/5 flex sm:absolute z-20 sm:top-[540px] top-80 md:top-[590px] lg:top-[750px] py-10">
                <span className="w-11/12 flex mx-auto flex-nowrap items-center justify-between">
                    <h3 className=" text-center text-[13px] sm:tetx-[16px] lg:text-[20px] text-hijau font-light">
                        {Props.title}
                    </h3>
                </span>
            </div>
        </>
    )
};