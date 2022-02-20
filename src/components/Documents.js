import {useEffect} from "react";
import {useSelector} from "react-redux";
import {FaFolder, FaRegFile} from "react-icons/fa";

export default function Documents() {

    const tree = useSelector(state => state.tree)

    useEffect(() => {
        console.log(tree)
    })

    return (
        <>
            {tree.map((item, index) => {
                return (
                    <>
                        <div className={"flex items-center"}>
                            <div><FaFolder/></div>
                            <div>{item.name}</div>
                        </div>
                        {item.documents.map((doc, index) => {
                            return (
                                <>
                                    <div className={"flex items-center"}>
                                    <div><FaRegFile/></div>
                                    <div>{doc.name}</div>
                                    </div>
                                </>
                            )
                        })}
                    </>
                )
            })}
        </>
    )
}
