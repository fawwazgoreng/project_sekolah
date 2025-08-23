import Sejarah from "../../sejarah/page"
import VisiMisi from "../visimisi/page"
import Komite from "../komite/page"
import Prestasi from "../prestasi/page"

export default function Profil () {
    return (
        <>
            <Sejarah/>
            <div className="w-full h-52 bg-transparent"></div>
            <VisiMisi/>
            <div className="w-full h-52 bg-transparent"></div>
            <Komite/>
            <div className="w-full h-52 bg-transparent"></div>
            <Prestasi/>
        </>
    )
}