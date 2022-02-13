import {getAuth, signOut} from "firebase/auth";
import {Menu} from '@headlessui/react'
import {BiLogOut, BiUserCircle} from "react-icons/bi";

export default function Usermenu(){

    const auth = getAuth();
    const user = auth.currentUser

    const signOutFirebase = () => {
        signOut(auth).then(() => {
            console.log("Signed out Firebase");
        }).catch((error) => {
            console.log("ERROR::Signed out Firebase");
        });
    }

    const data = [
        // {
        //     title: "Settings",
        //     icon: <FaCog/>,
        //     action: true
        // },
        // {
        //     title: "Help",
        //     icon: <FaExclamation/>,
        //     action: true
        // },
        {
            title: "Sign out",
            icon: <BiLogOut/>,
            action: ()=>signOutFirebase()
        },
    ];

    return(
        <div className={"h-full"}>
            <Menu as="div" className="relative inline-block text-left w-full h-full">
                <Menu.Button className={"text-gray-400 hover:text-white "}>
                    <BiUserCircle className={"h-7 w-7"}/>
                </Menu.Button>
                <Menu.Items className={"z-10 bg-white text-slate-800 dark:bg-slate-700 absolute right-0 w-60 mt-2 origin-top-right rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                    {data.map((item, index) => {
                        return (
                            <div className="py-1" key={index}>
                                <Menu.Item >
                                    {({active}) => (
                                        <div
                                            onClick={item.action}
                                            className={`${
                                                active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                            } group flex items-center w-full px-2 py-2 text-sm cursor-pointer`}>
                                            <span className={"ml-3 mr-4 text-gray-600 dark:text-gray-200"}>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        )
                    })}
                </Menu.Items>
            </Menu>
        </div>
    )

}
