export default function VisimisiAdmin() {
    return (
        <>
            <div className=" w-full h-full flex justify-center flex-col text-black ">
                <h1 className="text-hijau text-4xl font-bold my-5">Visi Misi</h1>
                <form action="" className=" gap-10 justify-center flex flex-col md:flex-row flex-wrap items-center text full h-full  mt-2 ">
                    <div className="flex  flex-col items-center md:w-[50vh] md:h-[48vh] w-[40vh] h-[42vh]  rounded-md shadow-md inset-shadow-xs group">
                        <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]" htmlFor="">Visi</label>
                        <textarea defaultValue={"sadasdasdasd"} placeholder="Ketik disini" className=" p-2  rounded-md shadow-md inset-shadow-xs  mt-5 w-[90%] md:h-[30vh] h-[25vh] resize-none border-2  focus:border-[#00978F] focus:outline-none" name="" id=""></textarea>
                    </div>
                    <div className="flex flex-col items-center md:w-[50vh] md:h-[48vh] w-[40vh] h-[42vh]  rounded-md shadow-md  inset-shadow-xs group">
                        <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]" htmlFor="">Moto</label>
                        <textarea defaultValue={"sadasdasdasd"} placeholder="Ketik disini" className=" p-2 rounded-md shadow-md inset-shadow-xs  mt-5 w-[90%] md:h-[30vh] h-[25vh] resize-none border-2  focus:border-[#00978F] focus:outline-none" name="" id=""></textarea>
                    </div>
                    <div className="flex flex-col items-center md:w-[50vh] md:h-[48vh] w-[40vh] h-[42vh]  rounded-md shadow-md inset-shadow-xs group">
                        <label className="text-center text-[5vh] font-medium mt-4 group-hover:text-[#00978F]" htmlFor="">Misi</label>
                        <textarea defaultValue={"sadasdasdasd"} placeholder="Ketik disini" className=" p-2 rounded-md shadow-md inset-shadow-xs  mt-5 w-[90%] md:h-[30vh] h-[25vh] resize-none border-2  focus:border-[#00978F] focus:outline-none" name="" id=""></textarea>
                    </div>
                </form>
            </div>
        </>
    )
}