"use client"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link"


export default function ProgramAdmin() {
    function EditExtra(item: string) {
        return (
            console.log(`${item}`)
        )
    }
    function DeleteExtra(item: string) {
        return (
            console.log(`${item}`)
        )
    }
    function EditProgram(item: string) {
        return (
            console.log(`${item}`)
        )
    }
    function DeleteProgram(item: string) {
        return (
            console.log(`${item}`)
        )
    }
    return (
        <>
            <div className="flex flex-col gap-10 w-11/12 mx-auto mt-10 ">
                <h1 className="text-hijau text-4xl font-bold">Program sekolah dan Extrakuliler</h1>
                <span className="w-full flex flex-row flex-wrap justify-around items-center gap-y-7">
                    <div className="inline-block xl:w-[43%] w-full mx-auto min-h-40 py-4 bg-second rounded-md">
                        <span className="w-11/12 flex flex-col mx-auto gap-4 mt-4">
                            <h1 className="font-bold text-2xl">Extrakuliner</h1>
                            <span className="flex">
                                <input type="text" className="border-none outline-none w-2/3 min-h-8 px-2 rounded-md" placeholder="tambah program" />
                                <button className="px-4 flex items-center  py-3 w-[100px] ml-5 h-10 bg-blue-600 text-white rounded">Tambah</button>
                            </span>
                            <table border={1} className="w-full">
                                <thead>
                                    <tr>
                                        <th>no</th>
                                        <th className="text-start pl-6">nama Extrakuliler</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {["anjai", "test", "cah", "cok", "ytta", "tessss"].map((item, loop) => (
                                        <tr key={item}>
                                            <td className="text-center">{loop + 1}</td>
                                            <td className="pl-6 "><input id={`name 1 ${item}`} className="w-full bg-transparent px-2" type="text" defaultValue={item} /></td>
                                            <td className="flex gap-4 justify-center">
                                                <label onClick={() => EditExtra(item)} htmlFor={`name 1 ${item}`}>Edit</label>
                                                <button onClick={() => DeleteExtra(item)}>delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </span>
                    </div>
                    <div className="inline-block xl:w-[43%] w-full mx-auto min-h-40 py-4 bg-second rounded-md">
                        <span className="w-11/12 flex flex-col mx-auto gap-4 mt-4">
                            <h1 className="font-bold text-2xl">Program</h1>
                            <span className="flex">
                                <input type="text" className="border-none outline-none w-2/3 min-h-8 px-2 rounded-md" placeholder="tambah program" />
                                <button className="px-4 flex items-center  py-3 w-[100px] ml-5 h-10 bg-blue-600 text-white rounded">Tambah</button>
                            </span>
                            <table border={1} className="w-full">
                                <thead>
                                    <tr>
                                        <th>no</th>
                                        <th className="text-start pl-6">nama program</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {["anjai", "test", "cah", "cok", "ytta", "tessss"].map((item, loop) => (
                                        <tr key={item}>
                                            <td className="text-center">{loop + 1}</td>
                                            <td className="pl-6 "><input id={`name 2 ${item}`} className="w-full bg-transparent px-2" type="text" defaultValue={item} /></td>
                                            <td className="flex gap-4 justify-center">
                                                <label onClick={() => EditProgram(item)} htmlFor={`name 2 ${item}`}>Edit</label>
                                                <button onClick={() => DeleteProgram(item)}>delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </span>
                    </div>
                </span>
            </div>
        </>
    )
}