"use client"
export default function LoginAdmin() {
    return (
        <>
            <div className="w-full h-full  flex justify-center">
                <div className=" w-[60vh] h-full flex flex-col mt-32    ">
                    <div className="w-full shrink-0 ">
                        <div className="w-full h-full px-[10px]  rounded-md  shadow-lg inset-shadow-xs mt-5 ">
                            <p className="font-bold text-[35px] text-blue-500 text-center ">Sign in</p>
                            <form className="flex flex-col gap-10 mt-[5vh] " action="">
                                <div className="relative z-0">
                                    <input type="text" id="#" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer perr" placeholder=" " />
                                    <label htmlFor="#" className=" absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
                                </div>
                                <div className="relative z-0">
                                    <input type="password" id="#" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="#" className="absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
                                </div>
                                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50  dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-5">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}